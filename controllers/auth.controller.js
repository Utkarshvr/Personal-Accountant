const Seller = require("../models/Seller");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const REFRESH_TOKEN_EXPIRATION_TIME = "1d";
const ACCESS_TOKEN_EXPIRATION_TIME = "30m";
const COOKIE_MAXAGE = 1000 * 60 * 60 * 24; // 1 day === REFRESH_TOKEN_EXPIRATION_TIME

// @desc Signup
// @route POST /auth/signup
// @access Public
const Signup = asyncHandler(async (req, res) => {
  // Add phone no, email, store name
  const { username, password } = req.body;

  // Confirm data
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate username
  const duplicate = await Seller.findOne({ username }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  // Hash password
  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

  const userObject = { username, password: hashedPwd };

  // Create and store new seller
  const seller = await Seller.create(userObject);

  if (seller) {
    //created
    res.status(201).json({ message: `Successfully Signedup`, seller });
  } else {
    res.status(400).json({ message: "Invalid seller data received" });
  }
});

// @desc Login
// @route POST /auth/login
// @access Public
const Login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // Check for duplicate username
  const seller = await Seller.findOne({ username }).lean().exec();

  if (!seller) {
    return res.status(404).json({ message: "No seller found" });
  }

  // Match password
  const isPassMatch = await bcrypt.compare(password, seller?.password);

  if (isPassMatch) {
    // Create Token
    const refresh_token = jwt.sign(seller, process.env.SECRET_KEY, {
      expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
    });
    const access_token = jwt.sign(seller, process.env.SECRET_KEY, {
      expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
    });

    // Create Cookie
    res.cookie("refresh_token", refresh_token, {
      maxAge: COOKIE_MAXAGE,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    //created
    res
      .status(200)
      .json({ message: `Successfully Loggedin`, access_token, seller });
  } else {
    res.status(400).json({ message: "Invalid Credentials" });
  }
});

// @desc Refresh Token
// @route POST /auth/refresh
// @access Public
const RefreshToken = asyncHandler(async (req, res) => {
  const seller = await Seller.findById(req.seller._id).select("-password").lean();

  if (!seller) return res.status(401).json({ message: "Not Authorized!" });

  const access_token = jwt.sign(seller, process.env.SECRET_KEY, {
    expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
  });

  res.status(200).json({ message: `Token Regenerated`, access_token, seller });
});

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const Logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refresh_token) return res.sendStatus(204); //No content
  res.clearCookie("refresh_token", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.json({ message: "Cookie cleared" });
};

module.exports = { Signup, Login, Logout, RefreshToken };
