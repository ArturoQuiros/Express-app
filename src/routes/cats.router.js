//npm i http-status-codes
const express = require("express");
const cats = require("../utils/cats.storage");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");

const router = express.Router();

//get
router.get("/cats", (req, res) => {
  res.status(StatusCodes.OK).json({
    message: ReasonPhrases.OK,
    data: cats,
  });
});

//custom get
router.get("/cats/:name", (req, res) => {
  const nameParam = req.params.name;
  const foundCat = cats.find((cat) => cat.name === nameParam);
  if (foundCat) {
    res.status(StatusCodes.OK).json({
      message: ReasonPhrases.OK,
      data: foundCat,
    });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }
});

//post
router.post("/cats", (req, res) => {
  const newCatName = req.body.name;
  const newCatColor = req.body.color;

  cats.push({
    name: newCatName,
    color: newCatColor,
  });
  res.status(StatusCodes.CREATED).json({ message: ReasonPhrases.CREATED });
});

//put
router.put("/cats/:name", (req, res) => {
  const nameParam = req.params.name;
  const newCatName = req.body.name;

  const foundCatIndex = cats.findIndex((cat) => cat.name === nameParam);

  if (foundCatIndex !== -1) {
    cats[foundCatIndex] = {
      name: newCatName,
      color: cats[foundCatIndex].color,
    };
    res.status(StatusCodes.OK).json({
      message: ReasonPhrases.OK,
      data: cats[foundCatIndex],
    });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }
});

//delete
router.delete("/cats/:name", (req, res) => {
  const nameParam = req.params.name;
  const foundCatIndex = cats.findIndex((cat) => cat.name === nameParam);

  if (foundCatIndex !== -1) {
    const deletedCat = cats.splice(foundCatIndex, 1);
    res.status(StatusCodes.OK).json({
      message: ReasonPhrases.OK,
      data: deletedCat[0],
    });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }
});
module.exports = router;
