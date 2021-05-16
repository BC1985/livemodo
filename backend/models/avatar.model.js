const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const avatarSchema = new Schema(
  {
    img: { data: Buffer, contentType: String },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Avatar", avatarSchema);
