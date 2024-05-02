const candidateModel = require("../models/candidatesModel");

const candidateController = {};

candidateController.create = async (req, res) => {
  const { _id, formName, fields } = req.body;

  try {
    if (!_id || !formName) {
      return res.status(404).json({ message: "Form doesn't exist" });
    }

    const candidate = { form_id: _id, formName, fields };

    await candidateModel.create(candidate);
    return res
      .status(200)
      .json({ message: "Candidate registered successfully", data: candidate });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

candidateController.list = async (req, res) => {
  try {
    const candidate = await candidateModel.find();

    if (!candidate) {
      return res.status(404).json({ message: "Candidate doesn't exist" });
    }

    return res.status(200).json(candidate);
  } catch (err) {
    console.log(err);
    return res.status(500).json("internal server error");
  }
};

candidateController.singleFormCandidate = async (req, res) => {
  const formId = req.params.id;

  try {
    const candidate = await candidateModel.find({ form_id: formId });

    if (!candidate) {
      return res.status(404).json({ message: "Candidate doesn't exist" });
    }

    return res.status(200).json(candidate);
  } catch (err) {
    return res.status(500).json("internal server error");
  }
};

module.exports = candidateController;
