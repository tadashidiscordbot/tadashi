const { model, Schema } = require('mongoose');

module.exports = model("massPingProtect", new Schema({
    Guild: String,
}))