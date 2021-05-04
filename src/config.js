require("dotenv").config();
module.exports = {
  API_KEY: process.env.YOUTUBE_API_KEY,
  API_ENDPOINT: "http://localhost:8000/api",
  API_BASE_URL:
    // process.env.REACT_APP_API_BASE_URL ||
    "http://localhost:5000"
};
