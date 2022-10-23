const { ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');
const { Success } = require('../../utils/Success')

module.exports = {
    name: "say",
    permissions: ["UseApplicationCommands"],
    usage: "/say `[texte: texte]`",
    example: "/say `[texte: Bonjour !]`",
    category: "🥳 Fun",
    description: "Permet de dire un texte que vous souhaitez !",
    options: [
        {
            name: "texte",
            description: "Texte",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    async runInteraction(client, interaction) {
        saytext = interaction.options.getString("texte")
        Success(interaction, "Message envoyé !")

        interaction.channel.send(`${saytext} - **${interaction.user.tag}**`)
    }
}