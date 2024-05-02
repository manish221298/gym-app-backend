const mongoose = require("mongoose");

const fieldSchema = mongoose.Schema({
  text: { type: String },
  label: { type: String },
  placeholder: { type: String },
  value: { type: String },
});

const formSchema = mongoose.Schema({
  formName: { type: String, require: true },
  fields: [fieldSchema],
});

const formModel = mongoose.model("Form", formSchema);

module.exports = formModel;
