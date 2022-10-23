const { ApplicationCommandOptionType } = require("discord.js");
const DB = require('../../models/AFKModel')
const { Success } = require('../../utils/Success')

module.exports = {
    name: "afk",
    description: "Permet d'être en mode AFK ou enlever le mode",
    usage: "/afk",
    example: "/afk",
    category: "⚙️ Utilités",
    permissions: ["UseApplicationCommands"],
    options: [
        {
            name: "set",
            description: "Ce mettre en mode AFK",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "reason",
                    description: "Raison de l'AFK",
                    type: ApplicationCommandOptionType.String,
                    required: false
                }
            ]
        },
        {
            name: "remove",
            description: "Enlève le mode AFK",
            type: ApplicationCommandOptionType.Subcommand
        }
    ],
    async runInteraction (client, interaction) {
        const { guild, options, user, createdTimestamp } = interaction;
        const afkStatus = options.getString("reason") || "Aucune raison";

        if(options.getSubcommand() === "set") {
            await DB.findOneAndUpdate(
                { GuildID: guild.id, UserID: user.id },
                { Status: afkStatus, Time: parseInt(createdTimestamp / 1000) },
                { new: true, upsert: true }
            )

            Success(interaction, "Le mode AFK vous as été attribué avec succès !")
        }

        if(options.getSubcommand() === "remove") {
            await DB.deleteOne({ GuildID: guild.id, UserID: user.id })

            Success(interaction, "Le mode AFK vous as été retiré avec succès !")
        }
    }
};