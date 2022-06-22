const mongoose = require("mongoose");
const Cat = require("./models/cats.model");

const URL =
  "mongodb+srv://R2D2:Ifpifp100@cluster0.ueqyt.mongodb.net/catsdb?retryWrites=true&w=majority";

mongoose
  .connect(URL)
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("non connected");
  });

const addCat = async (req, res) => {
  const newCatName = req.body.name;
  const newCatColor = req.body.color;

  const addedCat = new Cat({
    //we are using the schema for accesing the object type
    name: newCatName,
    color: newCatColor,
  });
  const result = await addedCat.save();
  res.json(result);
};

const getCats = async (req, res) => {
  const result = await Cat.find().exec(); //we use all the Schema for the get
  res.json(result);
};

exports.addCat = addCat;
exports.getCats = getCats;
