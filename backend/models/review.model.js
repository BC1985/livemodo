const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    tagline: {
      type: String,
      required: true,
    },
    bandName: { type: String, required: true },
    showDate: { type: Date, required: true },

    content: {
      type: String,
      required: true,
    },
    venue: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
  },

  { timestamps: true }
);
const review = mongoose.model("Review", reviewSchema);
module.exports = review;
