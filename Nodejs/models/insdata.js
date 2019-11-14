const mongoose = require('mongoose');

const weekSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    week: String,
    date: Date, 
    itemNumber: String,
    channel: String,
    unitSold: Number
});

module.exports = mongoose.model('weekdata', weekSchema);
