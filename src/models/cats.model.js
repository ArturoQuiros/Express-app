const mongoose = require("mongoose");

//¿The Object?
const catSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Cat", catSchema);
