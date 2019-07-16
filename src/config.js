require("dotenv").config();
module.exports = {
  API_KEY: process.env.YOUTUBE_API_KEY,
  API_TOKEN: "secret-token-very-hush-hush",
  API_ENDPOINT: "http://localhost:8000/api",
  API_BASE_URL:
    process.env.REACT_APP_API_BASE_URL ||
    "https://stormy-mesa-41939.herokuapp.com/api/"
};
