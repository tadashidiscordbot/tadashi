// const {  EmbedBuilder, ApplicationCommandOptionType, ActionRowBuilder, PermissionsBitField, ButtonBuilder, ButtonStyle } = require("discord.js");

// module.exports = {
//     name: "annonce",
//     description: "Permet de faire une annonce dans ce serveur",
//     usage: "/ping",
//     example: "/ping",
//     category: "🔨 Modération",
//     permissions: ["UseApplicationCommands", "ModerateMembers"],
//     options: [
//         {
//             name: "annonce",
//             description: "Votre annonce",
//             type: ApplicationCommandOptionType.String,
//             required: true
//         },
//         {
//             name: "annonce",
//             description: "Votre annonce",
//             type: ApplicationCommandOptionType.String,
//             required: true
//         },
//         {
//             name: "annonce",
//             description: "Votre annonce",
//             type: ApplicationCommandOptionType.String,
//             required: true
//         },
//         {
//             name: "annonce",
//             description: "Votre annonce",
//             type: ApplicationCommandOptionType.String,
//             required: true
//         }
//     ],
//     async runInteraction (client, interaction) {
//         const { options } = interaction;

//         const annoncetext = options.getString("annonce");

//     }
// };