const { Router } = require("express");
const router = Router();
const {
  getClient,
  createClient,
  getAllClients,
} = require("../controllers/clients.controller");

const { verifyAccessToken } = require("../middleware/verification/verifyToken");

router
  .route("/")
  // .all(verifyAccessToken)
  // .get(getAllCustomers)
  .post(createClient);

router
  .route("/:clientId")
  // .all(verifyAccessToken)
  .get(getClient)

router
  .route("/all/:sellerId")
  .get(getAllClients)

module.exports = router;
