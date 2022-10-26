const {  EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require('discord.js');

const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setURL("https://discord.gg/HCH8zjtWkJ")
            .setLabel('Rejoindre le serveur')
            .setStyle(ButtonStyle.Link)
    )

module.exports = {
    name: "support",
    description: "Envoie le serveur support de Tadashi",
    usage: "/support",
    example: "/support",
    category: "⚙️ Utilités",
    permissions: ["UseApplicationCommands"],
    async runInteraction(client, interaction) {
        const embed = new  EmbedBuilder()
        .setTitle("Support de Tadashi")
        .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
        .setDescription("Il est tout à fait normal de rencontrer un problème, ça peut arriver à tout le monde !\n\nPour résoudre des problème de commandes, rejoignez mon [serveur support](https://discord.gg/HCH8zjtWkJw), vous pouvez mettre vos rapports de bug(s) !")
        .addFields({ name: "Serveur support", value: "[Rejoindre](https://discord.gg/HCH8zjtWkJ)"})
        .setURL("https://discord.gg/HCH8zjtWkJ")
        .setColor(client.color)

        interaction.reply({ embeds: [embed], components: [button] })
    }
}