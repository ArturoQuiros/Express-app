const mongoose = require("mongoose");

//¿The Object?
const employeesSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("employees", employeesSchema);
