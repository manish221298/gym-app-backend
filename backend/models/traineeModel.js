const mongoose = require("mongoose");

const traineeModel = mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String },
    pic: { type: String },
    active: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    selectPackage: { type: Number },
    totalAmount: { type: Number },
  },
  { timestamps: true }
);

const Trainee = mongoose.model("Trainee", traineeModel);

module.exports = Trainee;
