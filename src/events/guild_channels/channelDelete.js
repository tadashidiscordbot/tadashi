const DB = require('../../models/LoggerChannel')
const SwitchDB = require('../../models/logsModel')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "channelDelete",
    once: false,
    async execute(client, channel) {
        const { guild, name } = channel

        const data = await DB.findOne({ Guild: guild.id }).catch(err => { })
        const Data = await DB.findOne({ Guild: guild.id }).catch(err => { })

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
                    .setTitle("Salon supprimer")
                    .setDescription("Un nouveau salon vient d'être supprimer, voici ses informations :\n\n**Nom du salon : " + name + "**")
                    .setFooter({
                        text: client.footer,
                        iconURL: client.user.displayAvatarURL({dynamic: true})
                    })
                ]
        })
    }
};