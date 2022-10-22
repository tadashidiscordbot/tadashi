const { EmbedBuilder } = require("discord.js");

function Success(interaction, description) {
    interaction.reply({ embeds: [
        new EmbedBuilder()
            .setDescription(`✅ ${description}`)
            .setColor("Green")], ephemeral: true })
} 

module.exports = Success;