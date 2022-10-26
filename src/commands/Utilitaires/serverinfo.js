const { EmbedBuilder } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: "serverinfo",
    description: "Affiche le informations de ce serveur",
    usage: "/serverinfo",
    example: "/serverinfo",
    category: "⚙️ Utilités",
    permissions: ["UseApplicationCommands"],
    async runInteraction (client, interaction) {
        const { guild } = interaction;
        await interaction.guild.fetch();

        const embed = new EmbedBuilder()
            .setTitle(`Informations du serveur \`${interaction.guild.name}\``)
            .setDescription(
                `
                **__🖥️・Informations sur le serveur :__**
                > **Nom du serveur :** ${guild.name}
                > **ID du serveur :** ${guild.id}
                > **Propriétaire :** <@${(await guild.fetchOwner()).user.id}> \`${(await guild.fetchOwner()).user.tag}\`
                > **Date de création :** <t:${parseInt(guild.createdAt / 1000)}:f> (<t:${parseInt(guild.createdAt / 1000)}:R>)
                
                **__📊・Statistiques du serveur :__** 
                > **Membres :** ${guild.memberCount}
                > **Niveau de boost :** ${guild.premiumTier} (${guild.premiumSubscriptionCount} boost(s))
                > **Emojis :** ${guild.emojis.cache.size}
                > **Rôles :** (${guild.roles.cache.size}) : ${guild.roles.cache.map(role => role.toString()).join(', ')}
                `.replace("TIER_", ""),
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