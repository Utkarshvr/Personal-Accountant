// const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const Accounts = require("../models/Accounts.model");

const getAllAccounts = asyncHandler(async (req, res) => {
  // const clientId = req.client._id;
  const { clientId } = req.params;

  // Get all Messages from MongoDB
  const accounts = await Accounts.find({ client: clientId }).populate("client");

  res.status(200).json(accounts);
});

const createAccount = asyncHandler(async (req, res) => {
  // const clientId = req.client._id;
  const { clientId } = req.params;
  const { accounts } = req.body;

  const accountsToInsert = accounts.map((account) => ({
    client: clientId,
    product_name: account?.product_name,
    qty: account?.qty,
    unit_cost: account?.unit_cost,
  }));

  const createdAccount = await Accounts.insertMany(accountsToInsert);

  res.status(201).json(createdAccount);
});

// const deleteAccount = asyncHandler(async (req, res) => {
//   const { id } = req.body;

//   // Confirm data
//   if (!id) {
//     return res.status(400).json({ message: "Messages ID required" });
//   }

//   // Confirm Messages exists to delete
//   const Messages = await Messages.findById(id).exec();

//   if (!Messages) {
//     return res.status(400).json({ message: "Messages not found" });
//   }

//   const result = await Messages.deleteOne();

//   const reply = `Messages '${result.title}' with ID ${result._id} deleted`;

//   res.json(reply);
// });

module.exports = { getAllAccounts, createAccount };
