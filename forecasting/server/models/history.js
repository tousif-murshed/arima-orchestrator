const mongoose = require('mongoose');

const dayWiseSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String
}, {collection: 'day_wise'});

module.exports = mongoose.model('user', dayWiseSchema);
