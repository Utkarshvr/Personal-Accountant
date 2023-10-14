const jwt = require("jsonwebtoken");

async function verifyAccessToken(req, res, next) {
  try {
    const auth_header = req.headers.authorization || req.headers.Authorization;

    if (!auth_header)
      return res.status(401).json({ message: "Not Authorized" });

    const access_token = auth_header.split(" ")[1];
    // console.log({ auth_header, access_token });
    jwt.verify(access_token, process.env.SECRET_KEY, (err, user) => {
      if (err)
        return res
          .status(403)
          .json({ message: "Invalid Token! Not Authorized" });

      req.user = user;

      next();
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
}

async function verifyRefreshToken(req, res, next) {
  try {
    const refresh_token = req.cookies?.refresh_token;
    // console.log({ refresh_token });

    if (!refresh_token)
      return res.status(401).json({ message: "Token expired! Login Again" });

    jwt.verify(refresh_token, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json({ message: "Not Authorized" });

      req.user = user;

      next();
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { verifyAccessToken, verifyRefreshToken };
