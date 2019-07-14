require("dotenv").config();
module.exports = {
  API_KEY: process.env.YOUTUBE_API_KEY,
  API_TOKEN: "secret-token-very-hush-hush",
  API_ENDPOINT: "http://localhost:8000/api"
};
