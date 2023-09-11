import React, { useState, useContext, useReducer } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Store } from "../Store";
import { getError } from "../utils";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import mpesaLogo from "../assets/images/mpesa_logo.png";

const reducer = (state, action) => {
  switch (action.type) {
    case "PAYMENT_REQUEST":
      return { ...state, loadingAdd: true };
    case "PAYMENT_SUCCESS":
      return { ...state, loadingAdd: false };
    case "PAYMENT_FAIL":
      return { ...state, loadingAdd: false };
    default:
      return state;
  }
};

export default function MpesaPaymentModal({
  handleShow,
  handleCloseModal,
  amount,
  id
}) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentLoading, setPaymentLoading] = useState("");

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    setPaymentLoading(true);
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    try {
      dispatch({ type: "PAYMENT_REQUEST" });
      await axios.get(`/api/mpesa/simulate/${phoneNumber}/${amount}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }).then(async (response) => {
        if (response.data.errorCode) {
          toast.error(response.data.errorMessage);
          setPaymentLoading(false);
        }
        else if (response.data.ResponseCode) {
          await delay(15000);
          try {
            await axios.get(`/api/mpesa/query/${response.data.CheckoutRequestID}`, {
              headers: { Authorization: `Bearer ${userInfo.token}` },
            }).then(async (response) => {
              if (response.data.ResultCode === "0") {
                const paymentResult = response
                const { data } = await axios.put(`/api/orders/${id}/pay`,
                  paymentResult, {
                  headers: { authorization: `Bearer ${userInfo.token}` },
                });
                dispatch({ type: 'PAY_SUCCESS', payload: data });
                handleCloseModal();
                setPaymentLoading(false);
                setTimeout(() =>
                  window.location.reload()
                  , [800]);
              }
              else {
                toast.error("Payment wasn't processed successfully please try again");
                dispatch({ type: "PAYMENT_FAIL" });
                setPaymentLoading(false);
              }
            })
          } catch (error) {
            toast.error(getError(error));
            dispatch({ type: "PAYMENT_FAIL" });
            setPaymentLoading(false);
          }

        }
      })

    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: "PAYMENT_FAIL" });
      setPaymentLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Modal centered show={handleShow} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              <img src={mpesaLogo} alt="Mpesa Payment" height="100" />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Payment number</Form.Label>
                <Form.Control
                  type="number"
                  value={phoneNumber}
                  placeholder="254722000000"
                  autoFocus
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {paymentLoading ? (
              <LoadingBox />
            ) : (
              <Button disabled={paymentLoading} variant="dark" size="lg" onClick={submitHandler}>
                Pay
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
