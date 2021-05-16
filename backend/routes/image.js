const router = require("express").Router()
const Image = require("../models/Img.model")
const Avatar =require("../models/avatar.model")
const fs = require("fs")
const multer = require("multer")

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images")
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})
const upload = multer({
  storage: fileStorageEngine,
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      cb(new Error("Please upload an image."))
    }
    cb(undefined, true)
  },
})

router
  .route("/")
  .post(upload.single("image"), function (req, res) {
    const newImage = new Image()
    newImage.img.data = fs.readFileSync(req.file.path)
    newImage.img.contentType = "image/jpeg"
    newImage.save()
    res.json({ message: "New image added to the db!" })
  })
  .get((req, res) => {
    Image.findOne({}, "img createdAt", (err, img) => {
      if (err) res.send(err)
      res.contentType("json")
      res.send(img)
    }).sort({ createdAt: "desc" })
  })
router
  .route("/avatars")
  .post(upload.single("avatar"), (req, res) => {
    const newAvatar = new Avatar();
    newAvatar.img.data = fs.readFileSync(req.file.path);
    console.log('FILE PATH',req.file.path)
    newAvatar.img.contentType = "image/jpeg";
    newAvatar.save();
    res.json({ message: "New avatar added" });
  })
  .get((req, res) => {    
    Avatar.findOne({}, "img createdAt", (err, img) => {
      console.log('Avatar IS---', img)
      if (err) res.send(err);
      res.contentType("json");
      res.send(img);
    }).sort({ createdAt: "desc" });
  });

module.exports = router
