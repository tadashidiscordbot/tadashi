const {  EmbedBuilder, ApplicationCommandOptionType, ActionRowBuilder, PermissionsBitField, ButtonBuilder, ButtonStyle } = require("discord.js");
const Error = require('../../utils/Error')
const Success = require('../../utils/Success')

module.exports = {
    name: "activity",
    description: "Permet de faire une activité sur un salon vocal",
    usage: "/activity",
    example: "/activity",
    category: "⚙️ Utilités",
    permissions: ["UseApplicationCommands"],
    options: [
        {
            name: "youtube",
            description: "Activité YouTube",
            type: ApplicationCommandOptionType.Subcommand
        }
    ],
    async runInteraction (client, interaction) {
        const app = client.discordTogether

        const VC = interaction.member.voice.channel
        if(!VC) return Error(interaction, "Vous devriez être sur salon vocal pour effectuer cette action !")

        if(interaction.options.getSubcommand() === "youtube") {
            app.createTogetherCode(VC.id, "youtube").then(invite => Success(interaction, `Cliquez [ici](${invite.code}) pour avoir accès à l'activité **[YouTube](${invite.code})**`))
        }

    }
};