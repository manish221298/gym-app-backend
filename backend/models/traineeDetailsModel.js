const mongoose = require("mongoose");
const Trainee = require("./traineeModel");

const traineeDetailSchema = mongoose.Schema({
  trainee: { type: mongoose.Schema.Types.ObjectId, ref: "Trainee" },
  name: { type: String, trim: true },
  email: { type: String },
  pic: { type: String },
  active: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  selectPackage: { type: Number },
  totalAmount: { type: Number },
});

const TraineeDetails = mongoose.model("TraineeDetails", traineeDetailSchema);

module.exports = TraineeDetails;
