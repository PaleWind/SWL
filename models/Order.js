import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    //user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    orderItems: [
      {
        name: { type: String, required: true },
        slug: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      line1: { type: String, required: true },
      line2: { type: String, required: false },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: false },
    },
    paymentResult: { id: String, status: String, email_address: String },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    isDelivered: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
