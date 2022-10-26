const { model, Schema } = require('mongoose');

module.exports = model("linksProtect", new Schema({
    Guild: String,
}))