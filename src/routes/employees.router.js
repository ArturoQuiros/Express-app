//npm i http-status-codes
const express = require("express")
const employees = require("../utils/employees.storage")
const { ReasonPhrases, StatusCodes } = require("http-status-codes")

const router = express.Router();

const employeesController = require('../controllers/employees.controller')

router.get("/", employeesController.getEmployees);

router.post("/", employeesController.addEmployee);

router.put("/empTag/:id/:tag", employeesController.addTagToEmployee);

router.get("/empTag/:tag", employeesController.getEmployeesByTag);

router.get("/:id", employeesController.getEmployee);

router.put("/:id", employeesController.updateEmployee);

router.delete("/:id", employeesController.deleteEmployee);

// router.get("/employees", (req, res)=>{
//     res.status(StatusCodes.OK).json({
//         message: ReasonPhrases.OK,
//         data: employees
//     })
// })

// router.post("/employees", (req, res)=>{
//     const newEmpFirstName = req.body.first_name;
//     const newEmpLastName =  req.body.last_name;
//     const newEmpDesignation =  req.body.designation;
//     const newEmpTags = req.body.tags;
//     const newEmpAge = req.body.age;

//     employees.push({first_name: newEmpFirstName, last_name: newEmpLastName, 
//         designation: newEmpDesignation, tags: newEmpTags, age: newEmpAge})
//     res.status(StatusCodes.CREATED).json({
//         message: ReasonPhrases.CREATED
//     })

// })

// router.put("/employeestag/:first_name/:tag", (req, res)=>{
//     const tagParam = req.params.tag;
//     const firstNameParam = req.params.first_name;
//     const empIndex = employees.findIndex((emp)=> emp.first_name === firstNameParam);

//     if (empIndex !== -1){
//         employees[empIndex].tags.push(tagParam)
//         employees[empIndex] = {first_name: employees[empIndex].first_name, last_name: employees[empIndex].last_name,
//             designation: employees[empIndex].designation, tags: employees[empIndex].tags,
//             age: employees[empIndex].age};
        
//         res.status(StatusCodes.OK).json({
//             message: ReasonPhrases.OK,
//             data: employees[empIndex]
//         })
//     }else{
//         res.status(StatusCodes.NOT_FOUND).json({
//             message: ReasonPhrases.NOT_FOUND
//         })
//     }

// })

// router.get("/employeestag/:tag", (req, res)=>{
//     const tagParam = req.params.tag;
//     const foundEmp = employees.filter((employee) => employee.tags.includes(tagParam));

//     if (foundEmp.length>0){
//         res.status(StatusCodes.OK).json({
//             message: ReasonPhrases.OK,
//             data: foundEmp
//         })
//     }else{
//         res.status(StatusCodes.NOT_FOUND).json({
//             message: ReasonPhrases.NOT_FOUND
//         })
//     }

// })

// router.get("/employees/:first_name", (req, res)=>{
//     const firstNameParam = req.params.first_name;
//     const foundEmp = employees.find((employee) => employee.first_name === firstNameParam);

//     if (foundEmp){
//         res.status(StatusCodes.OK).json({
//             message: ReasonPhrases.OK,
//             data: foundEmp
//         })
//     }else{
//         res.status(StatusCodes.NOT_FOUND).json({
//             message: ReasonPhrases.NOT_FOUND
//         })
//     }
// })

// router.put("/employees/:first_name", (req, res)=>{
//     const firstNameParam = req.params.first_name;
//     const newFirstName = req.body.first_name;
//     const empIndex = employees.findIndex((emp)=> emp.first_name === firstNameParam);

//     if (empIndex !== -1){
//         employees[empIndex] = {first_name: newFirstName, last_name: employees[empIndex].last_name,
//             designation: employees[empIndex].designation, tags: employees[empIndex].tags,
//             age: employees[empIndex].age};
        
//         res.status(StatusCodes.OK).json({
//             message: ReasonPhrases.OK,
//             data: employees[empIndex]
//         })
//     }else{
//         res.status(StatusCodes.NOT_FOUND).json({
//             message: ReasonPhrases.NOT_FOUND
//         })
//     }
    
// })

// router.delete("/employees/:first_name", (req, res)=>{
//     const firstNameParam = req.params.first_name;
//     const empIndex = employees.findIndex((emp)=> emp.first_name === firstNameParam);
//     if (empIndex !== -1){
//         deletedEmps = employees.splice(empIndex, 1)
//         res.status(StatusCodes.OK).json({
//             message: ReasonPhrases.OK,
//             data: deletedEmps[0]
//         })
//     }else{
//         res.status(StatusCodes.NOT_FOUND).json({
//             message: ReasonPhrases.NOT_FOUND
//         })
//     }
// })

module.exports = router;