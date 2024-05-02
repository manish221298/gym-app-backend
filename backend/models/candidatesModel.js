const mongoose = require("mongoose");

const formFieldSchema = new mongoose.Schema({
  field_id: mongoose.Schema.Types.ObjectId,
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    default: "",
  },
});

const formSchema = new mongoose.Schema({
  form_id: mongoose.Schema.Types.ObjectId,
  formName: {
    type: String,
    required: true,
  },
  fields: [formFieldSchema],
});

// Define the model
const candidateModel = mongoose.model("Candidate", formSchema);

module.exports = candidateModel;
