const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const userAuthentication = require("../middlewares/authentication");

const traineeController = require("../controllers/traineeController");
const userController = require("../controllers/userController");
const offerController = require("../controllers/offerController");
// const videoController = require("../controllers/offerController");

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

// authentication api
router.post("/register", userController.register);
router.post("/login", userController.login);

router.post("/create", upload.single("pic"), traineeController.create);
router.get("/traineelist", userAuthentication, traineeController.list);
router.put("/traineedetails/:id", traineeController.renew);
router.get("/trainee/history/:id", traineeController.traineeDetails);

router.post("/setoffer", offerController.create);
router.get("/offerlist", offerController.list);
router.delete("/offerdelete/:id", offerController.destroy);

// router.post("/uploadvideos", upload.single("videos"), videoController.create);

module.exports = router;
