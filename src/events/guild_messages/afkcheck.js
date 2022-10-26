const { EmbedBuilder } = require('discord.js')
const DB = require('../../models/AFKModel')

module.exports = {
    name: "messageCreate",
    once: false,
    async execute(client, message) {
        if(message.author.bot) return;

        DB.findOne({GuildID: message.guild.id, UserID: message.author.id}, async(err, data) => {
            if(err) throw err;
            if(data) {
                data.delete().then(
                    message.reply({ embeds: [new EmbedBuilder().setColor(client.green).setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` }).setDescription(`✅ Le mode AFK vous a été enlevé car il me semble que vous n'êtes plus AFK <:pepe_ok:1025082277962723449>`)] })
                )

            }
        })

        if(message.mentions.members.size) {
            const embed = new EmbedBuilder()
                .setColor(client.red)
                .setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })
            
            message.mentions.members.forEach((m) => {
                DB.findOne({GuildID: message.guild.id, UserID: m.id}, async(err, data) => {
                    if(err) throw err;
                    if(!data) return
                    embed.setDescription(`${client.no} ${m} est en mode AFK depuis <t:${data.Time}:R>\nRaison de l'AFK : ${data.Status}`)
                    return message.reply({ embeds: [embed] })
                })
            })
        }
    }
}