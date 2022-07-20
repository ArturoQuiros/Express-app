//npm i http-status-codes
const express = require("express")
const cats = require("../utils/cats.storage")
const { ReasonPhrases, StatusCodes } = require("http-status-codes")

const router = express.Router();

const catsController = require('../controllers/cats.controller')

router.get("/", catsController.getCats);

router.post("/", catsController.addCat);

router.get("/:id", catsController.getCat);

router.put("/:id", catsController.updateCat);

router.delete("/:id", catsController.deleteCat);

// router.get("/cats", (req, res)=>{
//     res.status(StatusCodes.OK).json({
//         message: ReasonPhrases.OK,
//         data: cats
//     })
// })

// router.post("/cats", (req, res)=>{
//     const newCatName = req.body.name;
//     const newCatColor =  req.body.color;
//     //console.log(newCatName)

//     cats.push({name: newCatName, color: newCatColor})
//     res.status(StatusCodes.CREATED).json({
//         message: ReasonPhrases.CREATED
//     })

// })

// router.get("/cats/:name", (req, res)=>{
//     const nameParam = req.params.name;
//     const foundCat = cats.find((cat) => cat.name === nameParam);

//     if (foundCat){
//         res.status(StatusCodes.OK).json({
//             message: ReasonPhrases.OK,
//             data: foundCat
//         })
//     }else{
//         res.status(StatusCodes.NOT_FOUND).json({
//             message: ReasonPhrases.NOT_FOUND
//         })
//     }
// })

// router.put("/cats/:name", (req, res)=>{
//     const nameParam = req.params.name;
//     const newName = req.body.name;
//     const catIndex = cats.findIndex((cat)=> cat.name === nameParam);

//     if (catIndex !== -1){
//         cats[catIndex] = {name: newName, color: cats[catIndex].color};
        
//         res.status(StatusCodes.OK).json({
//             message: ReasonPhrases.OK,
//             data: cats[catIndex]
//         })
//     }else{
//         res.status(StatusCodes.NOT_FOUND).json({
//             message: ReasonPhrases.NOT_FOUND
//         })
//     }
    
// })

// router.delete("/cats/:name", (req, res)=>{
//     const nameParam = req.params.name;
//     const catIndex = cats.findIndex((cat)=> cat.name === nameParam);
//     if (catIndex !== -1){
//         deletedCats = cats.splice(catIndex, 1)
//         res.status(StatusCodes.OK).json({
//             message: ReasonPhrases.OK,
//             data: deletedCats[0]
//         })
//     }else{
//         res.status(StatusCodes.NOT_FOUND).json({
//             message: ReasonPhrases.NOT_FOUND
//         })
//     }
// })

module.exports = router;