const { PermissionsBitField } = require('discord.js')
const Success = require('../../utils/Success')
const Error = require('../../utils/Error')

module.exports = {
    name: "unlock",
    description: "Déverrouille un salon",
    permissions: ["ManageChannels"],
    usage: "/unlock",
    example: "/unlock",
    category: "🔨 Modération",
    async runInteraction(client, interaction) {
        await interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SEND_MESSAGES: true })
        Success(interaction, `Le salon est déverrouillé !`)
    }
}