const Trainee = require("../models/traineeModel");
const TraineeDetails = require("../models/traineeDetailsModel");
const User = require("../models/userModel");

const traineeController = {};

traineeController.create = async (req, res) => {
  const { name, email, creatorEmail, selectPackage, startDate, discount } =
    req.body;

  try {
    // Check if required fields are present
    if (!name || !email || !selectPackage) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email: creatorEmail });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const baseAmount = 1000; // per month (Rs. 1000)
    const packageDays = [
      30, 60, 90, 120, 151, 182, 212, 242, 273, 303, 334, 365,
    ];
    const packageIndex = parseInt(selectPackage) - 1;

    if (packageIndex < 0 || packageIndex >= packageDays.length) {
      return res.status(400).json({ error: "Invalid package selection" });
    }

    const totalAmount =
      baseAmount * selectPackage -
      (baseAmount * selectPackage * discount) / 100;
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + packageDays[packageIndex]);

    const trainee = {
      name,
      email,
      pic: req.file.filename,
      selectPackage,
      totalAmount,
      startDate,
      endDate,
      active: "Active",
      userId: user._id,
    };

    await Trainee.create(trainee);

    return res.status(200).json({ message: "Trainee added successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

traineeController.list = async (req, res) => {
  try {
    const trainee = await Trainee.find().populate("userId", "role email");

    return res.status(200).json(trainee);
  } catch (err) {
    return res.status(500).json("Internal server error");
  }
};

traineeController.renew = async (req, res) => {
  const id = req.params.id;
  const { selectPackage, startDate, discount } = req.body;

  try {
    const baseAmount = 1000; // per month (Rs. 1000)
    const currentDate = new Date(startDate);
    const packageDays = [
      30, 60, 90, 120, 151, 182, 212, 242, 273, 303, 334, 365,
    ];
    const packageIndex = parseInt(selectPackage) - 1;

    if (packageIndex < 0 || packageIndex >= packageDays.length) {
      return res.status(400).json({ error: "Invalid package selection" });
    }

    const totalAmount =
      baseAmount * selectPackage -
      (baseAmount * selectPackage * discount) / 100;
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + packageDays[packageIndex]);

    const trainee = await Trainee.findOne({ _id: id }).populate("userId");
    if (!trainee) {
      return res.status(404).json({ error: "Trainee not found" });
    }

    const updatedTraineeDetails = {
      trainee: trainee._id,
      name: trainee.name,
      email: trainee.email,
      pic: trainee.pic,
      selectPackage: trainee.selectPackage,
      startDate: trainee.startDate,
      endDate: trainee.endDate,
      totalAmount: trainee.totalAmount,
      userId: trainee.userId,
      active: "InActive",
    };
    const newTraineeDetails = new TraineeDetails(updatedTraineeDetails);
    await newTraineeDetails.save();

    const updatedTrainee = {
      name: trainee.name,
      email: trainee.email,
      pic: trainee.pic,
      selectPackage,
      startDate,
      endDate,
      totalAmount,
      active: trainee.active,
    };
    const updatedTraineeResult = await Trainee.findByIdAndUpdate(
      id,
      updatedTrainee,
      { new: true }
    );

    return res.status(200).json(updatedTraineeResult);
  } catch (err) {
    console.log("Error caught:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

traineeController.traineeDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const traineeDetails = await TraineeDetails.find({ trainee: id }).populate(
      "userId",
      "role email"
    );
    return res.status(200).json(traineeDetails);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal server error");
  }
};

module.exports = traineeController;
