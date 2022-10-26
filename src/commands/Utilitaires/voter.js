const {  EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "voter",
    description: "Permet de voter le bot sur top.gg",
    usage: "/voter",
    example: "/voter",
    category: "⚙️ Utilités",
    permissions: ["UseApplicationCommands"],
    async runInteraction(client, interaction) {
        const embed = new EmbedBuilder()
        .setTitle("Voter le bot")
        .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
        .setDescription("**Pour soutenir le travail du bot et ainsi aider à développer Tadashi, vous pouvez voter pour tadashi sur [top.gg](https://top.gg/bot/991789507592589413/vote) ! Merci aux personnes qui iront voter ! Pous pouvez votez pour le bot tous les 12 heures ! Encore une fois merci aux personnes qui irons voter ceci fera extrêmement plaisir et aidera fortement au développement de Tadashi !**")
        .setTimestamp()
        .setFooter({
            text: client.footer,
            iconURL: client.user.displayAvatarURL({dynamic: true})
        })
        .setColor(client.color)

        interaction.reply({ embeds: [embed] });
    }
};