const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    designation: {type: String, required: true},
    tags: {type: Array, required: true},
    age: {type: Number, required: true},
});

const db = mongoose.connection.useDb("employeesdb")

module.exports = db.model('Employee', employeeSchema);