const { EmbedBuilder } = require("discord.js");

function Error(interaction, description) {
    interaction.reply({ embeds: [
        new EmbedBuilder()
            .setDescription(`❌ ${description}`)
            .setColor("Red")], ephemeral: true })
} 

module.exports = Error;