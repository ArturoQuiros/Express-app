const mongoose = require('mongoose');
const HttpError = require('../models/http-error')

const User = require("../models/users.model");
const { ReasonPhrases, StatusCodes } = require("http-status-codes")

const signUp = async (req, res, next) => { 

    const {name, email, password, cats} = req.body;

    let existingUser;

    try{
        existingUser = await User.findOne({email: email});
    }catch(err){
        return next(new HttpError(err, 500))
    }

    if(existingUser){
        return next(new HttpError("Email already exists", 422))
    }

    const createdUser = new User({
        name,
        email,
        password,
        cats,
    })

    try{
        await createdUser.save();
    }catch(err){
        return next(new HttpError(err, 500))
    }

    res.status(StatusCodes.CREATED).json({
        message: ReasonPhrases.CREATED,
        data: createdUser.toObject({getters: true})
    })

}

const login = async (req, res, next) => { 

    const {email, password} = req.body;
    let existingUser;

    try{
        existingUser = await User.findOne({email: email});
    }catch(err){
        return next(new HttpError("Login Failed", 500))
    }

    if (!existingUser || existingUser.password !== password){
        return next(new HttpError("Invalid credentials", 500))
    }

    res.json({message: "Logged in"});

}

exports.signUp = signUp;
exports.login = login;