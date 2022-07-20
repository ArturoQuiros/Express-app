const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 6},
    cats: {type: mongoose.Types.ObjectId, required: true, ref:'Cat'},
});

const db = mongoose.connection.useDb("usersdb")

module.exports = db.model('User', userSchema);
