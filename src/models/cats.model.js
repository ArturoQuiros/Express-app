const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    name: {type: String, required: true},
    color: {type: String, required: true},
});

const db = mongoose.connection.useDb("catsdb")

module.exports = db.model('Cat', catSchema);