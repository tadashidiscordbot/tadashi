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
            .setTitle(`Latence du bot \`${client.user.username}\``)
            .setDescription(
                `
                > **Latence du bot :** ${tryPong.createdTimestamp - interaction.createdTimestamp}ms
                > **Latence de la communication de discord et du bot (API) :** ${client.ws.ping}ms
                > **Localisation du serveur :** États-Unis (Ashburn)
                `
            )
            .setAuthor({ name: "Latence du bot", url: "https://tadashibot.com/", iconURL: `${client.user.displayAvatarURL()}` })
            .setTimestamp()
            .setColor(client.color)

        tryPong.edit({ content: null, embeds: [embed], components: [button] });

    }
};