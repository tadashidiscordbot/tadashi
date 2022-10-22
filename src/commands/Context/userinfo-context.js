const { ApplicationCommandType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: "Informations utilisateur",
    category: "⚙️ Context",
    permissions: ["UseApplicationCommands"],
    type: ApplicationCommandType.User,
    async runInteraction (client, interaction) {
        const member = await interaction.guild.members.fetch(interaction.targetId)
        const embed = new EmbedBuilder()
            .setTitle(`Informations sur \`${member.user.username}\``)
            .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
            .setFooter({
                text: "Userinfo",
                iconURL: member.user.displayAvatarURL({dynamic: true})
            })
            .addFields(
                { name: "Nom d'utilisateur :", value: `\`${member.user.username}\` ${member}`, inline: true },
                { name: "Tag :", value: `\`${member.user.discriminator}\``, inline: true },
                { name: "Nom complet :", value: `\`${member.user.tag}\``, inline: true },
                { name: "Identifiant :", value: `\`${member.user.id}\``, inline: true },
                { name: "Robot :", value: `\`${member.user.bot ? "Oui" : "Non"}\``, inline: true },
                { name: "Status :", value: `\`${member ? member.presence ? member.presence.status : "Hors ligne" : "Inconnu"}\``.replace("dnd", "Ne pas déranger").replace("online", "En ligne").replace("idle", "Inactif").replace("offline", "Hors ligne"), inline: true },
                { name: "Création de compte :", value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)`, inline: true },
                { name: "A rejoins le serveur :", value: `<t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)`, inline: true },
                { name: "Boost le serveur :", value: `\`${member.premiumSince ? "Oui" : "Non"}\``, inline: true },
                { name: "Surnom :", value: `\`${member.nickname ? member.nickname : "Aucun"}\``, inline: true },
                { name: `Rôles (${member.roles.cache.size}) :`, value: `${member.roles.cache.map(role => role).join(', ')}`, inline: true }
            )
            .setTimestamp()
        	.setImage(await (await client.users.fetch(member.user.id, {force: true})).bannerURL({dynamic: true, size: 4096}))
            .setColor(client.color)

        interaction.reply({ embeds: [embed] })
    }
}