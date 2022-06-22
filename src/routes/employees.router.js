//npm i http-status-codes
const express = require("express");
const employees = require("../utils/employees.storage");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const mongoosedb = require("../mongoose");

const router = express.Router();

//get
router.get("/employees", mongoosedb.getEmployees);

//custom get per name
router.get("/employees/:first_name", (req, res) => {
  const nameParam = req.params.first_name;
  const foundEmployee = employees.find(
    (employee) => employee.first_name === nameParam
  );
  if (foundEmployee) {
    res.status(StatusCodes.OK).json({
      message: ReasonPhrases.OK,
      data: foundEmployee,
    });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }
});

//custom get per tags
router.get("/employeestag/:tag", (req, res) => {
  const tagParam = req.params.tag;
  const foundEmployees = employees.filter((employee) =>
    employee.tags.includes(tagParam)
  );

  if (foundEmployees.length > 0) {
    res.status(StatusCodes.OK).json({
      message: ReasonPhrases.OK,
      data: foundEmployees,
    });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }
});

//post
router.post("/employees", mongoosedb.addEmployee);

//put
router.put("/employees/:first_name", (req, res) => {
  const nameParam = req.params.first_name;
  const newFirst_Name = req.body.first_name;

  const foundEmployeeIndex = employees.findIndex(
    (employee) => employee.first_name === nameParam
  );

  if (foundEmployeeIndex !== -1) {
    employees[foundEmployeeIndex] = {
      first_name: newFirst_Name,
      last_name: employees[foundEmployeeIndex].last_name,
      designation: employees[foundEmployeeIndex].designation,
      tags: employees[foundEmployeeIndex].tags,
      age: employees[foundEmployeeIndex].age,
    };
    res.status(StatusCodes.OK).json({
      message: ReasonPhrases.OK,
      data: employees[foundEmployeeIndex],
    });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }
});

//custom put
router.post("/employeestag/:first_name/:tag", (req, res) => {
  const tagParam = req.params.tag;
  const firstNameParam = req.params.first_name;
  const empIndex = employees.findIndex(
    (emp) => emp.first_name === firstNameParam
  );

  if (empIndex !== -1) {
    employees[empIndex].tags.push(tagParam);
    employees[empIndex] = {
      first_name: employees[empIndex].first_name,
      last_name: employees[empIndex].last_name,
      designation: employees[empIndex].designation,
      tags: employees[empIndex].tags,
      age: employees[empIndex].age,
    };

    res.status(StatusCodes.OK).json({
      message: ReasonPhrases.OK,
      data: employees[empIndex],
    });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }
});

//delete
router.delete("/employees/:first_name", (req, res) => {
  const nameParam = req.params.first_name;
  const newFirst_Name = req.body.first_name;

  const foundEmployeeIndex = employees.findIndex(
    (employee) => employee.first_name === nameParam
  );

  if (foundEmployeeIndex !== -1) {
    const deletedEmployee = employees.splice(foundEmployeeIndex, 1);
    res.status(StatusCodes.OK).json({
      message: ReasonPhrases.OK,
      data: deletedEmployee[0],
    });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }
});

module.exports = router;
