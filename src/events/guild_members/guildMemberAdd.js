const DB = require('../../models/welcomeChannelModel')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "guildMemberAdd",
    once: false,
    async execute(client, member) {
        DB.findOne({ Guild: member.guild.id }, async(e, data) => {
            if(!data) return;

            const channel = member.guild.channels.cache.get(data.Channel);

            const embed = new EmbedBuilder()
                .setColor(client.color)
                .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
                .setDescription(`Bienvenue ${member.user} dans le serveur ! Passe un bon moment sur ce serveur ! 😜\n\nCe serveur est maintenant à **${member.guild.memberCount}** membres grâce à toi !`)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()

            channel.send({ content: `${member.user}`, embeds: [embed] })

            if(data.Role) {
                await member.roles.add(data.Role)
            }
        })

    }
};