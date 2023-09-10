import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema(
  {
    transactionId: { type: String, required: true, unique: true },
    amount: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
  { timestamps: true }
);

const MpesaPayments = mongoose.model('MpesaPayments',  PaymentSchema);
export default  MpesaPayments;

