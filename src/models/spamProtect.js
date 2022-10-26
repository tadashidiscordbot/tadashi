const { model, Schema } = require('mongoose');

module.exports = model("spamProtect", new Schema({
    Guild: String,
    channelId: String
}))