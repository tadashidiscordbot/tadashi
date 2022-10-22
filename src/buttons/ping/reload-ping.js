const { EmbedBuilder } = require('discord.js')

module.exports = {
    customId: "reload-ping",
    async runInteraction(client, interaction) {
        const embed = new EmbedBuilder()
        .setTitle("Pong 🏓 !")
        .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
        .addFields(
            { name: "Ping", value: `\`\`\`${client.ws.ping}ms\`\`\`` },
        )
        .setTimestamp()
        .setFooter({
            text: client.footer,
            iconURL: interaction.user.displayAvatarURL({dynamic: true})
        })
        .setColor(client.color)

        interaction.update({ content: null, embeds: [embed] });
    }
}