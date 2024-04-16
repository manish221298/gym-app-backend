const mongoose = require("mongoose");
const User = require("./userModel"); // Assuming you're exporting the User model correctly

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
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Trainee = mongoose.model("Trainee", traineeModel);

module.exports = Trainee;
