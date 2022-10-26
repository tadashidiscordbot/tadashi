const mongoose = require('mongoose')

module.exports = mongoose.model(
    'antiraidconfig', 
    new mongoose.Schema({
        Guild: String,
        AntiBot: Boolean,
        AntiRaid: Boolean,
        AntiLink: Boolean,
    })
);