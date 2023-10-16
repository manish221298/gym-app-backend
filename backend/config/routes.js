const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const traineeController = require("../controllers/traineeController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/Images"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.post("/create", upload.single("pic"), traineeController.create);
router.get("/traineelist", traineeController.list);
router.put("/traineedetails/:id", traineeController.renew);
router.get("/trainee/history/:id", traineeController.traineeDetails);

module.exports = router;
