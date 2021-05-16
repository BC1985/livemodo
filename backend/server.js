const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./services/authRouter");
const reviewsRouter = require("./routes/reviews")
const usersRouter = require("./routes/users")
const imageRouter = require("./routes/image")
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URL;


mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connected successfully");
});

function close() {
  console.log("Disconnected from db");
  return mongoose.disconnect();
}

app.use("/reviews", reviewsRouter);
app.use("/users", usersRouter);
app.use("/login", authRouter);
app.use("/images", imageRouter);

app.listen(port, () => {
  const dbName = 'livemodo api'
  console.log(`server is runnning on port ${port}`);
  console.log(`Database: ${dbName}`)

});
module.exports = { close };
