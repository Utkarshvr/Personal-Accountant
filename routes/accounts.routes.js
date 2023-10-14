const { Router } = require("express");
const router = Router();

// const { verifyAccessToken } = require("../middleware/verification/verifyToken");

const { createAccount, getAllAccounts } = require("../controllers/accounts.controller");

router
  .route("/:clientId")
  // .all(verifyAccessToken)
  .get(getAllAccounts)
  .post(createAccount);

module.exports = router;
