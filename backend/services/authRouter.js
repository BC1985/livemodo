const router = require("express").Router();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.route("/").post( async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user === null) {
      return res.status(400).json({ error: "Can't find user" });
    } else {
      const payload = {
        email: email,
        password: password
      };
      // jwt expires after two days
      const jwtExpiryTime = "2d";
      const accessToken = jwt.sign(payload, process.env.JWT_SECRET,{
        expiresIn: jwtExpiryTime
      });
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        res.json(accessToken);
      } else {
        res.status(400).json({ error: "Invalid password" });
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
