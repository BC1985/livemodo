const router = require("express").Router()
const Image = require("../models/Img.model")
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
    var newImage = new Image()
    newImage.img.data = fs.readFileSync(req.file.path)
    newImage.img.contentType = "image/jpeg"
    newImage.save()
    res.json({ message: "New image added to the db!" })
  })
  .get((req, res) => {
    Image.findOne({}, "img createdAt", (err, img)=> {
      if (err) res.send(err)
      res.contentType("json")
      res.send(img)
    }).sort({ createdAt: "desc" })
  })

module.exports = router
