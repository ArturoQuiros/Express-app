//npm i http-status-codes
const express = require("express");
const cats = require("../utils/cats.storage");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const mongoosedb = require("../mongoose");

const router = express.Router();

//get
router.get("/cats", mongoosedb.getCats);

//custom get
router.get("/cats/:name", mongoosedb.getCat);

//post
router.post("/cats", mongoosedb.addCat);

//put
router.put("/cats/:name", mongoosedb.putCat);

//delete
router.delete("/cats/:name", mongoosedb.delCat);

module.exports = router;
