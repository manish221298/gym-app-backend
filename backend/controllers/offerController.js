const Offer = require("../models/offerModel");
const Video = require("../models/videosModel");

const offerController = {};
const videoController = {};

offerController.create = async (req, res) => {
  const { discount, basePrice, selectPackage } = req.body;
  let saveAmount = "";
  let ourPrice = "";

  try {
    if (!discount || !basePrice || !selectPackage) {
      return res.status(400).json("All fields are required");
    }
    const basePrices = basePrice * selectPackage;
    saveAmount = (basePrice * selectPackage * discount) / 100;
    ourPrice = basePrice * selectPackage - saveAmount;

    const offer = {
      selectPackage: selectPackage,
      discount: discount,
      basePrice: basePrices,
      saveAmount: saveAmount,
      ourPrice: ourPrice,
    };

    await Offer.create(offer);

    return res
      .status(200)
      .json({ message: "Offer Created Succssfully", offer });
  } catch (err) {
    console.log(err);
    return res.status(500).json("internal server error ");
  }
};

offerController.list = async (req, res) => {
  try {
    const offer = await Offer.find();

    return res.status(200).json(offer);
  } catch (err) {
    return res.status(500).json("Internal server error");
  }
};

offerController.destroy = async (req, res) => {
  const id = req.params.id;

  console.log("jrgnjdfnh", id);

  try {
    const offer = await Offer.findByIdAndDelete(id);

    if (!offer) {
      return res.status(400).json({ message: "Offer not exist" });
    }

    return res.status(200).json({ message: "Offer deleted successfully" });
  } catch (err) {
    return res.status(500).json("Internal server error");
  }
};

// videoController.create = async (req, res) => {
//   const { title, description } = req.body;
//   console.log("title, desc, vid", title, description, req.file);

//   try {
//     return res.status(200).json({ message: "Offer Created Succssfully" });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json("internal server error ");
//   }
// };

module.exports = offerController;

// module.exports = {
//   offerController,
//   videoController,
// };
