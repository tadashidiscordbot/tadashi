const {  EmbedBuilder, ActionRowBuilder, PermissionsBitField, ButtonBuilder, ButtonStyle } = require("discord.js");

const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("reload-ping")
            .setEmoji("<:timer:1025082228239241256>")
            .setLabel("Actualiser")
            .setStyle(ButtonStyle.Success)
    )

module.exports = {
    name: "ping",
    description: "Affiche le ping du bot",
    usage: "/ping",
    example: "/ping",
    category: "⚙️ Utilités",
    permissions: ["UseApplicationCommands"],
    async runInteraction (client, interaction) {
        const tryPong = await interaction.reply({ content: "Calcul du ping... Un instant !", fetchReply: true });
    
        const embed = new EmbedBuilder()
            .setTitle("Pong 🏓 !")
            .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
            .addFields(
                { name: "Latence API", value: `\`\`\`${client.ws.ping}ms\`\`\``, inline: true },
                { name: "Latence Bot", value: `\`\`\`${tryPong.createdTimestamp - interaction.createdTimestamp}ms\`\`\``, inline: true }
            )
            .setTimestamp()
            .setFooter({
                text: client.footer,
                iconURL: interaction.user.displayAvatarURL({dynamic: true})
            })
            .setColor(client.color)

        tryPong.edit({ content: null, embeds: [embed], components: [button] });

    }
};