const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "invite",
    description: "Permet d'inviter le bot",
    usage: "/invite",
    example: "/invite",
    category: "⚙️ Utilités",
    permissions: ["UseApplicationCommands"],
    async runInteraction (client, interaction) {
        const embed = new EmbedBuilder()
            .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
            .setDescription("Vous aimez Tadashi ? Vous souhaitez un bot de rêve ?\n\nLien d'invitation : [M'inviter](https://discord.com/oauth2/authorize?client_id=991789507592589413&permissions=8&scope=bot%20applications.commands)\nSite internet : [Mon site](https://tadashibot.com)\nTadashi'Player : [Inviter Tadashi'Player](https://discord.com/api/oauth2/authorize?client_id=1028230534171729960&permissions=8&scope=bot)")
            .setTimestamp()
            .setFooter({
                text: client.footer,
                iconURL: interaction.user.displayAvatarURL({dynamic: true})
            })
            .setColor(client.color)

        interaction.reply({ embeds: [embed] });
    }
};