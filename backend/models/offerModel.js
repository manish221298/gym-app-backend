const mongoose = require("mongoose");

const offerModel = mongoose.Schema(
  {
    discount: { type: String, trim: true },
    basePrice: { type: String },
    ourPrice: { type: String },
    selectPackage: { type: String },
    saveAmount: { type: String },
  },
  { timestamps: true }
);

const Offer = mongoose.model("Offer", offerModel);

module.exports = Offer;
