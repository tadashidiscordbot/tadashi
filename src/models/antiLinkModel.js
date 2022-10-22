const {model, Schema} = require('mongoose')

module.exports = model("antilink", new Schema({
    Guild: String,
}))