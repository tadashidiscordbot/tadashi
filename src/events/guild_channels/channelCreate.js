const DB = require('../../models/LoggerChannel')
const SwitchDB = require('../../models/logsModel')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "channelCreate",
    once: false,
    async execute(client, channel) {
        const { guild, name } = channel

        const data = await DB.findOne({ Guild: guild.id }).catch(err => { })
        const Data = await SwitchDB.findOne({ Guild: guild.id }).catch(err => { })

        if(!Data) return;
        if(Data.ChannelTopic === false) return
        if(!data) return;
        
        if(!data.Channel) return;

        const Channel = await guild.channels.cache.get(data.Channel)
        if(!Channel) return

        return Channel.send({
            embeds: [
                new EmbedBuilder()
                    .setColor(client.color)
                    .setTitle("Nouveau salon")
                    .setDescription("Un nouveau salon vient d'être créer, voici ses informations :\n\n**Salon : <#" + channel + "> (" + name + ")**")
                    .setFooter({
                        text: client.footer,
                        iconURL: client.user.displayAvatarURL({dynamic: true})
                    })
                ]
        })
    }
};