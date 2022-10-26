const DB = require('../../models/goodByeModel')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "guildMemberRemove",
    once: false,
    async execute(client, member) {
        DB.findOne({ Guild: member.guild.id }, async(e, data) => {
            if(!data) return;

            const channel = member.guild.channels.cache.get(data.Channel);

            const embed = new EmbedBuilder()
                .setColor("#ff0000")
                .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
                .setDescription(`Un membre nous à quitté, A bientôt ${member.user.tag} dans le serveur de ${member.guild.name} 🥲\n\nIl y'a **${member.guild.memberCount}** membres restant`)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()

            channel.send({ embeds: [embed] })
        })

    }
};