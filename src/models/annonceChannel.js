const { model, Schema } = require("mongoose");

module.exports = model(
    "annonceChannel",
    new Schema({
        Guild: String,
        channelId: String,
        role: String
    })
);