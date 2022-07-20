const mongoose = require('mongoose');
const HttpError = require('../models/http-error')

const Cat = require("../models/cats.model");
const { ReasonPhrases, StatusCodes } = require("http-status-codes")

const addCat = async (req, res, next) => {//add a cat
    const addedCat = new Cat({
        name: req.body.name, 
        color: req.body.color
    });

    try{
        await addedCat.save();
    }catch(err){
        return next(new HttpError(err, 404))
    }

    res.status(StatusCodes.CREATED).json({
        message: ReasonPhrases.CREATED,
        data: addedCat.toObject({getters: true})
    })
}

const getCats = async (req, res, next) => { //find all cats
    let cats;
    try{
        cats = await Cat.find().exec();
    }catch(err){
        return next(new HttpError(err, 404))
    }
    res.status(StatusCodes.OK).json({
        message: ReasonPhrases.OK,
        data: cats
    })
}

const getCat = async (req, res, next) => { //find a cat by id

    const idParam = req.params.id;
    let cat;

    try{
        cat = await Cat.findById(idParam).exec();
    }catch(err){
        return next(new HttpError(err, 400))
    }

    if(cat){
        res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            data: cat.toObject({getters: true}),
        })
    }else{
        res.status(StatusCodes.NOT_FOUND).json({
            message: ReasonPhrases.NOT_FOUND
        })
    }

}

const updateCat = async (req, res, next) => { //update a cat by id

    const idParam = req.params.id;
    const {name, color} = req.body;

    let cat;
    try{
        cat = await Cat.findById(idParam).exec();
    }catch(err){
        return next(new HttpError(err, 400))
    }

    if (cat){
        cat.name = name;
        cat.color = color;

        try{
            cat = await cat.save();
        }catch(err){
            return next(new HttpError(err, 404))
        }
        
        res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            data: cat.toObject({getters: true}),
        })
    }else{
        res.status(StatusCodes.NOT_FOUND).json({
            message: ReasonPhrases.NOT_FOUND
        })
    }
}

const deleteCat = async (req, res, next) => { //delete a cat by id

    const idParam = req.params.id;

    let cat;
    try{
        cat = await Cat.findById(idParam).exec();
    }catch(err){
        return next(new HttpError(err, 400))
    }

    if (cat){
        await cat.remove();
        res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            data: cat.toObject({getters: true}),
        })
    }else{
        res.status(StatusCodes.NOT_FOUND).json({
            message: ReasonPhrases.NOT_FOUND
        })
    }
}

exports.addCat = addCat;
exports.getCats = getCats;
exports.getCat = getCat;
exports.updateCat = updateCat;
exports.deleteCat = deleteCat;