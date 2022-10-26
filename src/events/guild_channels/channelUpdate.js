const DB = require('../../models/LoggerChannel')
const SwitchDB = require('../../models/logsModel')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "channelUpdate",
    once: false,
    async execute(client, oldChannel, newChannel) {
        const { guild } = newChannel

        const data = await DB.findOne({ Guild: guild.id }).catch(err => { })
        const Data = await DB.findOne({ Guild: guild.id }).catch(err => { })

        if(!Data) return;
        if(Data.ChannelTopic === false) return
        if(!data) return;
        if(!data.Channel) return;
        const Channel = await guild.channels.cache.get(data.Channel)
        if(!Channel) return

        if(oldChannel.name !== newChannel.name) {
            return Channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setTitle("Salon mis à jour")
                        .setDescription("Un salon vient d'être mis à jour, voici ses informations :\n\n**Nom de l'ancien salon : " + oldChannel.name + "\nNom du nouveau salon : " + newChannel.name + " (<#" + newChannel.id + ">)**")
                        .setFooter({
                            text: client.footer,
                            iconURL: client.user.displayAvatarURL({dynamic: true})
                        })
                    ]
            })
        }
    }
};