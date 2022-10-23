const { model, Schema } = require("mongoose");

module.exports = model(
    "poolConfig",
    new Schema({
        Guild: String,
        channelId: String,
        role: String
    })
);