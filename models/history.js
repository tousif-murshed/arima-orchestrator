const mongoose = require('mongoose');

const dayWiseSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    week: Number,
    date: String,
    itemNumber: String,
    itemName: String,
    channel: String,
    channelName: String,
    unitSold: Number
}, {collection: 'day_wise'});

module.exports = mongoose.model('user', dayWiseSchema);