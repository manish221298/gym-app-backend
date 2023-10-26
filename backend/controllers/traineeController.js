const Trainee = require("../models/traineeModel");
const TraineeDetails = require("../models/traineeDetailsModel");

const traineeController = {};

traineeController.create = async (req, res) => {
  const { name, email, selectPackage, startDate, discount } = req.body;
  let totalAmount = 0;
  let endDate = startDate;
  const baseAmount = 1000; // per months (Rs. 1000)

  const currentDate = new Date(startDate);

  console.log("start date", startDate);

  if (selectPackage === "1") {
    totalAmount =
      baseAmount * selectPackage -
      (baseAmount * selectPackage * discount) / 100;
    endDate = currentDate.setDate(currentDate.getDate() + 30);
  } else if (selectPackage === "2") {
    totalAmount =
      baseAmount * selectPackage -
      (baseAmount * selectPackage * discount) / 100;
    endDate = currentDate.setDate(currentDate.getDate() + 60);
  } else if (selectPackage === "3") {
    totalAmount =
      baseAmount * selectPackage -
      (baseAmount * selectPackage * discount) / 100;
    endDate = currentDate.setDate(currentDate.getDate() + 90);
  } else if (selectPackage === "4") {
    totalAmount =
      baseAmount * selectPackage -
      (baseAmount * selectPackage * discount) / 100;
    endDate = currentDate.setDate(currentDate.getDate() + 120);
  } else if (selectPackage === "5") {
    totalAmount =
      baseAmount * selectPackage -
      (baseAmount * selectPackage * discount) / 100;
    endDate = currentDate.setDate(currentDate.getDate() + 151);
  } else if (selectPackage === "6") {
    totalAmount =
      baseAmount * selectPackage -
      (baseAmount * selectPackage * discount) / 100;
    endDate = currentDate.setDate(currentDate.getDate() + 182);
  } else if (selectPackage === "7") {
    totalAmount =
      baseAmount * selectPackage -
      (baseAmount * selectPackage * discount) / 100;
    endDate = currentDate.setDate(currentDate.getDate() + 212);
  } else if (selectPackage === "8") {
    totalAmount =
      baseAmount * selectPackage -
      (baseAmount * selectPackage * discount) / 100;
    endDate = currentDate.setDate(currentDate.getDate() + 242);
  } else if (selectPackage === "9") {
    totalAmount =
      baseAmount * selectPackage -
      (baseAmount * selectPackage * discount) / 100;
    endDate = currentDate.setDate(currentDate.getDate() + 273);
  } else if (selectPackage === "10") {
    totalAmount =
      baseAmount * selectPackage -
      (baseAmount * selectPackage * discount) / 100;
    endDate = currentDate.setDate(currentDate.getDate() + 303);
  } else if (selectPackage === "11") {
    totalAmount =
      baseAmount * selectPackage -
      (baseAmount * selectPackage * discount) / 100;
    endDate = currentDate.setDate(currentDate.getDate() + 334);
  } else if (selectPackage === "12") {
    totalAmount =
      baseAmount * selectPackage -
      (baseAmount * selectPackage * discount) / 100;
    endDate = currentDate.setDate(currentDate.getDate() + 365);
  }

  try {
    if (!name || !email || !selectPackage) {
      return res.status(400).json("All fields are required");
    }

    const trainee = {
      name: name,
      email: email,
      pic: req.file.filename,
      selectPackage: selectPackage,
      totalAmount: totalAmount,
      startDate: startDate,
      endDate: endDate,
      active: "Active",
    };

    await Trainee.create(trainee);

    return res.status(200).json({ message: "Trainee added successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json("internal server error ");
  }
};

traineeController.list = async (req, res) => {
  try {
    const trainee = await Trainee.find();

    return res.status(200).json(trainee);
  } catch (err) {
    return res.status(500).json("Internal server error");
  }
};

traineeController.renew = async (req, res) => {
  const id = req.params.id;
  const { selectPackage, startDate, discount } = req.body;
  let totalAmount = 0;
  let endDate = startDate;
  const baseAmount = 1000; // per months (Rs. 1000)
  const currentDate = new Date(startDate);

  if (selectPackage === "1") {
    totalAmount =
      baseAmount * selectPackage -
      (baseAmount * selectPackage * discount) / 100;
    endDate = currentDate.setDate(currentDate.getDate() + 30);
  } else if (selectPackage === "2") {
    totalAmount =
      baseAmount * selectPackage -
      (baseAmount * selectPackage * discount) / 100;
    endDate = currentDate.setDate(currentDate.getDate() + 60);
  } else if (selectPackage === "3") {
    totalAmount =
      baseAmount * selectPackage -
      (baseAmount * selectPackage * discount) / 100;
    endDate = currentDate.setDate(currentDate.getDate() + 90);
  } else if (selectPackage === "4") {
    totalAmount =
      baseAmount * selectPackage -
      (baseAmount * selectPackage * discount) / 100;
    endDate = currentDate.setDate(currentDate.getDate() + 120);
  } else if (selectPackage === "5") {
    totalAmount =
      baseAmount * selectPackage -
      (baseAmount * selectPackage * discount) / 100;
    endDate = currentDate.setDate(currentDate.getDate() + 151);
  } else if (selectPackage === "6") {
    totalAmount =
      baseAmount * selectPackage -
      (baseAmount * selectPackage * discount) / 100;
    endDate = currentDate.setDate(currentDate.getDate() + 182);
  } else if (selectPackage === "7") {
    totalAmount =
      baseAmount * selectPackage -
      (baseAmount * selectPackage * discount) / 100;
    endDate = currentDate.setDate(currentDate.getDate() + 212);
  } else if (selectPackage === "8") {
    totalAmount =
      baseAmount * selectPackage -
      (baseAmount * selectPackage * discount) / 100;
    endDate = currentDate.setDate(currentDate.getDate() + 242);
  } else if (selectPackage === "9") {
    totalAmount =
      baseAmount * selectPackage -
      (baseAmount * selectPackage * discount) / 100;
    endDate = currentDate.setDate(currentDate.getDate() + 273);
  } else if (selectPackage === "10") {
    totalAmount =
      baseAmount * selectPackage -
      (baseAmount * selectPackage * discount) / 100;
    endDate = currentDate.setDate(currentDate.getDate() + 303);
  } else if (selectPackage === "11") {
    totalAmount =
      baseAmount * selectPackage -
      (baseAmount * selectPackage * discount) / 100;
    endDate = currentDate.setDate(currentDate.getDate() + 334);
  } else if (selectPackage === "12") {
    totalAmount =
      baseAmount * selectPackage -
      (baseAmount * selectPackage * discount) / 100;
    endDate = currentDate.setDate(currentDate.getDate() + 365);
  }

  try {
    const trainee = await Trainee.findOne({ _id: id });
    // if()

    const traineeDetails = new TraineeDetails({
      trainee: trainee._id,
      name: trainee.name,
      email: trainee.email,
      pic: trainee.pic,
      selectPackage: trainee.selectPackage,
      startDate: trainee.startDate,
      endDate: trainee.endDate,
      totalAmount: trainee.totalAmount,
      active: "InActive",
    });
    await traineeDetails.save();

    await Trainee.findByIdAndUpdate(
      id,
      {
        name: trainee.name,
        email: trainee.emal,
        pic: trainee.pic,
        selectPackage: selectPackage,
        startDate: startDate,
        endDate: endDate,
        totalAmount: totalAmount,
        active: trainee.active,
      },
      { new: true }
    );

    return res.status(200).json(trainee);
  } catch (err) {
    console.log(" error catch", err);
    return res.status(500).json("Internal server error in find");
  }
};

traineeController.traineeDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const traineeDetails = await TraineeDetails.find({ trainee: id });
    return res.status(200).json(traineeDetails);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal server error");
  }
};

module.exports = traineeController;
