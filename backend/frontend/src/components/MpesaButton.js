import React from "react";
import Button from "react-bootstrap/Button";

export default function MpesaButton({ showModal }) {
  return (
    <Button variant="success" onClick={showModal}>
      Mpesa Payment
    </Button>
  );
}
