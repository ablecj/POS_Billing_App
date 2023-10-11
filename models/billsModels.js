const mongoose = require("mongoose");

const billSchema = mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    customerNumber:{
      type: Number,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },

    tax: {
      type: Number,
      required: true,
    },
    PaymentMode: {
      type: String,
      required: true,
    },
    cartItems: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Bills = mongoose.model("Bills", billSchema);
module.exports = Bills;
