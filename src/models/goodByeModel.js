const mongoose = require('mongoose');

module.exports = mongoose.model(
    "goodbye-channel",
    new mongoose.Schema({
        Guild: String,
        Channel: String,
    })
)