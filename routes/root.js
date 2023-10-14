const express = require("express");
const router = express.Router();

router.use("/clients", require("./clients.routes.js"));
router.use("/accounts", require("./accounts.routes.js"));
router.use("/auth", require("./auth.routes.js"));

module.exports = router;
