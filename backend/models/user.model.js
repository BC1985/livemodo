const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
// custom message for unique email validation
mongoose.plugin(require("mongoose-unique-validator"), {
  message: "Email already registered",
});

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Please enter first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter last name"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Must be at least six characters"],
    maxlength: [72, "Password cannot be more that 72 characters long"],
    validate: {
      validator: val => {
        let regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[\S]+/;
        return val == null || val.trim().length < 1 || regex.test(val);
      },
      message:
        "Password must include uppercase, lowecase, numbers and symbols without spaces",
    },
  },
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
});

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ password: password, email: email });
  if (!user) {
    throw new Error({ error: "Invalid login credentials" });
  }
  return user;
};
// hash password before saving to database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(this.password, salt);
  // save password in DB as hashed
  this.password = passwordHash;
  next();
});

userSchema.methods.getSignedToken = function(){
  return jwt.sign({_id: this._id}, process.env.JWT_SECRET,{
        expiresIn: '2m'
      })
}

userSchema.methods.getResetPasswordToken = function(){
  const resetToken = crypto.randomBytes(20).toString("hex")
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000)
  return resetToken
}
const User = mongoose.model("User", userSchema);
module.exports = User;
