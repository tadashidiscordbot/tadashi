const { model, Schema } = require("mongoose");

module.exports = model(
    "suggestChannel",
    new Schema({
        Guild: String,
        channelId: String,
    })
);