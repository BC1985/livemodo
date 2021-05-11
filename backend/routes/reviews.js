const router = require("express").Router();
const Review = require("../models/review.model");
const auth = require("../services/auth.service");
// const handleErrors = require("../services/error-handler");

// non-paginated response
router.route("/all").get(async (req, res) => {
  const allReviews = Review.find();
  try {
    const data = await allReviews;
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error,
    });
  }
});
// paginated response
router.route("/").get(async (req, res) => {
  try {
    let query = Review.find();
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * pageSize;
    const total = await Review.countDocuments();
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

router.route("/post").post(auth, async (req, res) => {
  const {
    tagline,
    bandName,
    venue,
    showDate,
    content,
    timestamps,
    rating,
  } = req.body;
  try {
    const newReview = new Review({
      tagline,
      bandName,
      venue,
      showDate,
      content,
      rating,
      username: res.locals.user.username,
    });
    await newReview.validate();
    await newReview.save();
    res.json({ message: "New review added", created_at: timestamps });
  } catch (error) {
    // let errors = handleErrors(error);
    res.status(500).json(error);
  }
});

router.route("/:id").delete(async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json("Review successfully deleted.");
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});
router.route("/:id").get(async (req, res) => {
  try {
    const data = await Review.findById(req.params.id);
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json("Error retrieving review");
  }
});

router.route("/update/:id").put(async (req, res) => {
  try {
    const { tagline, bandName, venue, showDate, content, rating } = req.body;
    const filter = { _id: req.params.id };
    const update = {
      tagline: tagline,
      bandName: bandName,
      venue: venue,
      showDate: showDate,
      content: content,
      rating: rating,
    };

    await Review.findByIdAndUpdate(filter, update, err => {
      if (err) {
        // let errors = handleErrors(err);
        json(err);
      } else {
        res.status(200).json({
          message: `Review updated`,
          updated: update,
        });
      }
    });
  } catch (error) {
    
    res.status(500).json(err);
  }
});

router.route("/users/:id").get(auth, async (req, res, next) => {
  let user = res.locals.user.username;
  let id = res.locals.user._id;

  const data = await Review.find({ username: user });
  try {
    if (req.params.id == id) {
      res.status(200).json(data);
    } else {
      res.status(401).json({ Error: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
