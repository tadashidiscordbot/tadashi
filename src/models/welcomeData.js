const { model, Schema } = require("mongoose");

module.exports = model(
    "welcomeData",
    new Schema({
        Guild: String,
        channelId: String,
        role: String
    })
);