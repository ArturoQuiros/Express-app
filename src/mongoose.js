const mongoose = require("mongoose");
const Cat = require("./models/cats.model");
const Employee = require("./models/employees.model");

const employees = require("./utils/employees.storage");

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

//EMPLOYEES-----------------------------------------------------
const addEmployee = async (req, res) => {
  const newFirst_Name = req.body.first_name;
  const newLast_Name = req.body.last_name;
  const newDesignation = req.body.designation;
  const newTags = req.body.tags;
  const newAge = req.body.age;

  const addedEmployee = new Employee({
    //we are using the schema for accesing the object type
    first_name: newFirst_Name,
    last_name: newLast_Name,
    designation: newDesignation,
    tags: newTags,
    age: newAge,
  });
  const result = await addedEmployee.save();
  res.json(result);
};

const getEmployees = async (req, res) => {
  const result = await Employee.find().exec(); //we use all the Schema for the get
  res.json(result);
};

//CATS-----------------------------------------------------
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

const getCat = async (req, res) => {
  const newCatName = req.params.name;

  const result = await Cat.find({ name: newCatName }).exec(); //we use all the Schema for the get
  res.json(result);
};

const delCat = async (req, res) => {
  const newCatName = req.params.name;

  const result = await Cat.deleteOne({ name: newCatName }).exec(); //we use all the Schema for the get
  res.json(result);
};

const putCat = async (req, res) => {
  const oldCatName = req.params.name;
  const newCatName = req.body.name;

  const result = await Cat.updateOne(
    { name: oldCatName },
    { $set: { name: newCatName } }
  ).exec(); //we use all the Schema for the get
  res.json(result);
};

//EMPLOYEES----------------------
exports.addEmployee = addEmployee;
exports.getEmployees = getEmployees;
//CATS-----------
exports.addCat = addCat;
exports.getCats = getCats;
exports.getCat = getCat;
exports.delCat = delCat;
exports.putCat = putCat;
