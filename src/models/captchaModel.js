const { model, Schema } = require("mongoose");

module.exports = model(
    "captchaModel",
    new Schema({
        Guild: String,
        channelId: String,
        role: String,
    })
);