const mongoose = require('mongoose')

module.exports = mongoose.model(
    'logs', 
    new mongoose.Schema({
        Guild: String,
        MemberRole: Boolean,
        MemberNick: Boolean,
        ChannelTopic: Boolean,
        MemberBoost: Boolean,
        RoleStatus: Boolean,
        EmojiStatus: Boolean,
        MemberBan: Boolean
    })
);