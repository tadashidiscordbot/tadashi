const { model, Schema } = require("mongoose");

module.exports = model(
    "SuggestDB",
    new Schema({
        Guild: String,
        Message: String,
        Details: Array,
    })
);