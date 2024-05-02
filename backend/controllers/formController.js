const formModel = require("../models/formBuilderModel");

const formController = {};

formController.create = async (req, res) => {
  const { fields, formName } = req.body;
  try {
    const form = {
      fields,
      formName,
    };

    await formModel.create(form);

    return res
      .status(201)
      .json({ message: "Form created successfully", data: form });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
};

formController.list = async (req, res) => {
  try {
    const forms = await formModel.find();

    return res.status(200).json(forms);
  } catch (err) {
    console.log(err);
  }
};

formController.singleForm = async (req, res) => {
  const formId = req.params.id;

  try {
    const form = await formModel.findById(formId);

    if (!form) {
      return res.status(404).json({ message: "Form not exist" });
    }

    return res.status(200).json(form);
  } catch (err) {
    return res.status(500).json({ message: "internal server error" });
  }
};

module.exports = formController;
