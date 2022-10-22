const {  EmbedBuilder, PermissionsBitField, ChannelType } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: "serverinfo",
    description: "Affiche le informations de ce serveur",
    usage: "/serverinfo",
    example: "/serverinfo",
    category: "⚙️ Utilités",
    permissions: ["UseApplicationCommands"],
    async runInteraction (client, interaction) {
        await interaction.guild.fetch();
        const embed = new EmbedBuilder()
            .setTitle(`Informations du serveur \`${interaction.guild.name}\``)
            .addFields(
                { name: "Nom du serveur", value: `\`${interaction.guild.name}\``, inline: true },
                { name: "Propriétaire du serveur", value: `<@${(await interaction.guild.fetchOwner()).user.id}>`, inline: true },
                { name: "ID du serveur", value: `\`${interaction.guild.id}\``, inline: true },
                { name: "Membres", value: `
                \`${interaction.guild.memberCount}\` membres en total
                \`${interaction.guild.members.cache.filter(member => !member.user.bot).size}\` humains
                \`${interaction.guild.members.cache.filter(member => member.user.bot).size}\` bots`,
                inline: true },
                { name: "Création du serveur", value: `\`${moment(interaction.guild.createdAt).format('[Le] DD/MM/YYYY [à] HH:mm:ss')}\``, inline: true },
                { name: "Nombre de boost", value: `\`${interaction.guild.premiumSubscriptionCount}\``.replace("0", "Aucun"), inline: true },
                { name: "Tier de boost", value: `\`${interaction.guild.premiumTier}\``.replace("0", "0 (Aucun tier)").replace("TIER_", ""), inline: true },
                { name: "Emojis", value: `\`${interaction.guild.emojis.cache.size}\` emojis totales\n\`${interaction.guild.emojis.cache.filter(emoji => !emoji.animated).size}\` emojis normal\n\`${interaction.guild.emojis.cache.filter(emoji => emoji.animated).size}\` emojis animés`, inline: true },
                { name: `Rôle(s) (${interaction.guild.roles.cache.size})`, value: `${interaction.guild.roles.cache.map(role => role.toString()).join(', ')}`, inline: true }
            )
            .setFooter({
                text: "Serverinfo",
                iconURL: interaction.user.displayAvatarURL({dynamic: true})
            })
            .setTimestamp()
            .setColor(client.color)
            .setThumbnail(interaction.guild.iconURL())
            .setImage(interaction.guild.bannerURL())

        interaction.reply({ embeds: [embed] })
    }
}