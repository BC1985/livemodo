const router = require("express").Router();
const User = require("../models/user.model");
const auth = require("../services/auth.service");
const jwt = require("jsonwebtoken");
const handleErrors = require("../services/error-handler");

router.route("/").get(async (req, res) => {
  try {
    let query = User.find().select("email password username");
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await User.countDocuments();
    const pages = Math.ceil(total / pageSize);
    query = query.skip(skip).limit(pageSize);

    if (page > pages) {
      return res.status(404).json({
        status: "fail",
        message: "No page found",
      });
    }

    const result = await query;
    res.status(200).json({
      count: result.length,
      page,
      pages,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "server error",
    });
  }
});
router.route("/current-user").get(auth, (req, res, next) => {
  res.json(res.locals.user);
});

router.route("/add").post(async (req, res) => {
  // handle errors
  const handleErrors = err => {
    console.log(err.message, err.code);

    let errors = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      username: "",
    };
    // validation errors
    if (err.message.includes("User validation failed")) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }
    return errors;
  };
  try {
    const { first_name, last_name, email, password, username } = req.body;
    const newUser = await User({
      first_name,
      last_name,
      email,
      password,
      username,
    });
    await newUser.validate();
    newUser.save(err => {
      console.log(err);
    });
    const payload = { email: email, password: password };
    const token = await jwt.sign(payload, process.env.JWT_SECRET);
    res.json({
      message: `User with email '${newUser.email}' added`,
      token: token,
    });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(500).json({ errors });
  }
});
router.route("/:id").get(auth, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
});
router.route("/:id").delete(async (req, res) => {
  try {
    const email = req.body.email;

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json(`User with email '${email}' deleted`);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});
router.route("/update/:id").put(async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    const update = {
      email: req.body.email,
      username: req.body.username,
    };
    await User.findByIdAndUpdate(filter, update, err => {
      if (err) {
        let errors = handleErrors(err);
        res.status(500).json(errors);
      } else {
        res.status(200).json({
          updatedUser: update,
          message: `User with email ${req.body.email} updated successfully`,
        });
        console.log(res);
      }
    });
  } catch (error) {
    let errors = handleErrors(error);
    res.status(500).json({ errors });
  }
});
// update password
router.route("/password/:id").put(async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    const user = await User.findByIdAndUpdate(
      filter,
      req.body.password,
      err => {
        if (err) {
          res.status(500).res(err);
        } else {
          res.status(200).json({ messaga: "updated successfully" });
        }
      }
    );
    user.password = req.body.password;
    user.save({ validateBeforeSave: true });
  } catch (error) {
    let errors = handleErrors(error);
    res.status(500).json({ errors });
  }
});

module.exports = router;
