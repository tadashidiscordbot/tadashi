const mongoose = require('mongoose');

module.exports = mongoose.model(
    "welcome-channel",
    new mongoose.Schema({
        Guild: String,
        Channel: String,
        Role: String
    })
)