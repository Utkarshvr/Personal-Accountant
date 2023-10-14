const { Router } = require("express");
const router = Router();
const {
  Signup,
  Login,
  RefreshToken,
  Logout,
} = require("../controllers/auth.controller.js");
const {
  verifyRefreshToken,
} = require("../middleware/verification/verifyToken.js");

router.route("/signup").post(Signup);

router.route("/login").post(Login);

router.route("/refresh").all(verifyRefreshToken).get(RefreshToken);

router.route("/logout").post(Logout);

module.exports = router;
