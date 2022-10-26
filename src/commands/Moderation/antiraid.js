const { ApplicationCommandOptionType, PermissionsBitField } = require('discord.js')
const { antijoin } = require('../../index')
const { Success } = require('../../utils/Success')
const { Error } = require('../../utils/Error')

module.exports = {
    name: "antiraid",
    description: "Active ou désactive le mode antiraid",
    usage: "/antiraid `[settings: on/off/list]`",
    example: "/antiraid `[settings: on]`",
    category: "🔨 Modération",
    permissions: ["Administrator"],
    options: [
        {
            name: "on",
            description: "Active le mode antiraid",
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: "off",
            description: "Désactive le mode antiraid",
            type: ApplicationCommandOptionType.Subcommand,
        }
    ],
    async runInteraction(client, interaction) {
        const getCollection = antijoin.get(interaction.guild.id);
        if (interaction.options.getSubcommand() === "on") {
            if (getCollection) return Error(interaction, "Le mode antiraid est déjà activé !")
            antijoin.set(interaction.guild.id, []);
            Success(interaction, "Le mode antiraid est activé ! A partir de maintenant, tous les membres qui rejoignent dans ce serveur seront exclus !")
        } 
        
        if(interaction.options.getSubcommand() === "off") {
            if (!getCollection) return Error(interaction, "Le mode antiraid n'est pas activé !")

            antijoin.delete(interaction.guild.id);
            Success(interaction, "Le mode antiraid a été désactivé avec succès !")
        }
    }
}