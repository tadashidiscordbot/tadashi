const { ApplicationCommandOptionType } = require("discord.js");
const { Success } = require('../../utils/Success')

module.exports = {
    name: "massrole",
    description: "Permet d'ajouter ou supprimer des r么les 脿 tous les membres",
    usage: "/massrole add `[role: r么le]`\n/massrole remove `[role: r么le]`",
    example: "/massrole add `[role: Membre]`",
    category: "馃敤 Mod茅ration",
    permissions: ["ManageRoles"],
    options: [
        {
            name: "add",
            description: "Ajoute un r么le 脿 tous les membres",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "role",
                    description: "R么le",
                    type: ApplicationCommandOptionType.Role,
                    required: true
                }
            ]
        },
        {
            name: "remove",
            description: "Retire un r么le 脿 tous les membres",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "role",
                    description: "R么le",
                    type: ApplicationCommandOptionType.Role,
                    required: true
                }
            ]
        }
    ],
    async runInteraction (client, interaction) {
        if(interaction.options.getSubcommand() === "add") {
            const role = interaction.options.getRole("role")

            const fetchMembers = interaction.guild.members.cache.filter(m => !m.user.bot)

            Success(interaction, `Je suis entrain d'ajouter le r么le ${role} 脿 tous les membres ! Ceci peut prendre du temps si il y'a beaucoup de membres dans ce serveur !`)
            await fetchMembers.forEach(m => m.roles.add(role))
        }

        if(interaction.options.getSubcommand() === "remove") {
            const role = interaction.options.getRole("role")

            const fetchMembers = interaction.guild.members.cache.filter(m => !m.user.bot)

            Success(interaction, `Je suis entrain de supprimer le r么le ${role} 脿 tous les membres ! Ceci peut prendre du temps si il y'a beaucoup de membres dans ce serveur !`)
            await fetchMembers.forEach(m => m.roles.remove(role))
        }
    }
};