const DB = require('../../models/welcomeData')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "guildMemberAdd",
    once: false,
    async execute(client, member) {
        const data = await DB.findOne({ Guild: member.guild.id })

        if(!data) return;
        const channel = member.guild.channels.cache.get(data.channelId);
        if(!channel) return;

        const embed = new EmbedBuilder()
            .setColor(client.color)
            .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(
            `Bienvenue ${member.user} dans le serveur ! Passe un bon moment sur ce serveur ! 😜
            
            Ce serveur est maintenant à **${member.guild.memberCount}** membres grâce à toi !
            `
            )
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()

        channel.send({ content: `${member.user}`, embeds: [embed] })

        if(data.role) {
            const role = member.guild.roles.cache.get(data.role)
            if(!role) return;
            await member.roles.add(role)
        }

    }
};