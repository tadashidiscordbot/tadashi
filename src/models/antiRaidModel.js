const {model, Schema} = require('mongoose')

module.exports = model("antiraid", new Schema({
    Guild: String,
}))