const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  // find token in headers
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send("Access was denied");
  } else {
    // validate token
    const tokenBody = token && token.split(" ")[1];

    jwt.verify(tokenBody, process.env.JWT_SECRET, async (err, decoded) => {
      // return error if token is invalid
      if (err) {
        console.log(`JWT error: ${err}`);
        return res.status(401).json({ Error: err.message });
      } else {
        let user = await User.findOne({ email: decoded.email });
        res.locals.user = user;
        next();
        return user
      }
    });
  }
  
};

module.exports = auth;
