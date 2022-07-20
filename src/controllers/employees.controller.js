
const Employee = require("../models/employees.model");

const addEmployee = async (req, res) => {//add an employee
    const addedEmployee = new Employee({
        first_name: req.body.first_name, 
        last_name: req.body.last_name,
        designation: req.body.designation, 
        tags: req.body.tags,
        age: req.body.age, 
    });
    const result = await addedEmployee.save();
    res.json(result);
}

const getEmployees = async (req, res) => { //find all employees
    const employees = await Employee.find().exec();
    res.json(employees);
}

const addTagToEmployee = async (req, res) => { //add a tag to an employee
    const tagParam = req.params.tag;
    const idParam = req.params.id;

    const result = await Employee.updateOne({ _id: idParam}, { $push: { tags: tagParam } }).exec();
    res.json(result);
}

const getEmployeesByTag = async (req, res) => { //find employees by tag

    const tagParam = req.params.tag;

    const employees = await Employee.find({ tags: tagParam }).exec();
    res.json(employees);
}

const getEmployee = async (req, res) => { //find an employee by id

    const idParam = req.params.id;

    const result = await Employee.findById(idParam).exec();
    res.json(result);
}

const updateEmployee = async (req, res) => { //update an employee first_name by id

    const idParam = req.params.id;
    const newName = req.body.first_name;

    const result = await Employee.updateOne({ _id: idParam}, { $set: { first_name: newName } }).exec();
    res.json(result);
}

const deleteEmployee = async (req, res) => { //delete an employee by id

    const idParam = req.params.id;

    const result = await Employee.deleteOne({ _id: idParam }).exec();
    res.json(result);
}

exports.addEmployee = addEmployee;
exports.getEmployees = getEmployees;
exports.getEmployee = getEmployee;
exports.updateEmployee = updateEmployee;
exports.deleteEmployee = deleteEmployee;
exports.addTagToEmployee = addTagToEmployee;
exports.getEmployeesByTag = getEmployeesByTag;