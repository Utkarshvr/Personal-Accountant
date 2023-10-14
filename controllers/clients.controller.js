// const User = require("../models/User");
// const Note = require("../models/Messages");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Clients = require("../models/Clients.model");

// @desc Get all clients
// @route GET / clients
// @access Private

const getAllClients = asyncHandler(async (req, res) => {
  const clients = await Clients.find({ seller: req.params.sellerId })
    .sort({ createdAt: -1 })
    .select("-password")
    .lean();

  res.status(200).json(clients);
});

const createClient = asyncHandler(async (req, res) => {
  // const storeOwnerID = req.params.id || req.storeOwner.id
  const { client_name, address, phone, email, seller } = req.body;

  const createdAccount = await Clients.create({
    seller,
    client_name,
    address,
    phone,
    email,
  });

  res.status(201).json(createdAccount);
});

const getClient = asyncHandler(async (req, res) => {
  // Get all clients from MongoDB
  const client = await Clients.findById(req.params.clientId).populate("seller");
  // .select("-password")
  // .lean();
  //   the .lean() method is invoked on the query object to indicate that the query should return plain JavaScript objects rather than Mongoose documents. By calling .lean(), Mongoose bypasses the object mapping and schema processing overhead, resulting in improved query performance. This can be useful when you only need the raw data and don't require Mongoose-specific functionality.
  if (!client) {
    return res.status(404).json({ message: "Client not found" });
  }
  return res.json(client);
});

// @desc Update a user
// @route PATCH /clients
// @access Private
// const updateUser = asyncHandler(async (req, res) => {
//   const { id, username, roles, active, password } = req.body;

//   // Confirm data
//   if (
//     !id ||
//     !username ||
//     !Array.isArray(roles) ||
//     !roles.length ||
//     typeof active !== "boolean"
//   ) {
//     return res
//       .status(400)
//       .json({ message: "All fields except password are required" });
//   }

//   // Does the user exist to update?
//   const user = await User.findById(id).exec();

//   if (!user) {
//     return res.status(400).json({ message: "User not found" });
//   }

//   // Check for duplicate
//   const duplicate = await User.findOne({ username }).lean().exec();

//   // Allow updates to the original user
//   if (duplicate && duplicate?._id.toString() !== id) {
//     return res.status(409).json({ message: "Duplicate username" });
//   }

//   user.username = username;
//   user.roles = roles;
//   user.active = active;

//   if (password) {
//     // Hash password
//     user.password = await bcrypt.hash(password, 10); // salt rounds
//   }

//   const updatedUser = await user.save();

//   res.json({ message: `${updatedUser.username} updated` });
// });

// // @desc Delete a user
// // @route DELETE /clients
// // @access Private
// const deleteUser = asyncHandler(async (req, res) => {
//   const { id } = req.body;

//   // Confirm data
//   if (!id) {
//     return res.status(400).json({ message: "User ID Required" });
//   }

//   // Does the user still have assigned notes?
//   const note = await Note.findOne({ user: id }).lean().exec();
//   if (note) {
//     return res.status(400).json({ message: "User has assigned notes" });
//   }

//   // Does the user exist to delete?
//   const user = await User.findById(id).exec();

//   if (!user) {
//     return res.status(400).json({ message: "User not found" });
//   }

//   const result = await user.deleteOne();

//   const reply = `Username ${result.username} with ID ${result._id} deleted`;

//   res.json(reply);
// });

module.exports = {
  // updateUser,
  // deleteUser,
  createClient,
  getAllClients,
  getClient,
};
