const mongoose = require("mongoose");

const AccountsSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Client",
    },
    product_name: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    unit_cost: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    payment_method: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Accounts = mongoose.model("Account", AccountsSchema);

module.exports = Accounts;
