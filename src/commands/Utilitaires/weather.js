const {  EmbedBuilder, ActionRowBuilder, ApplicationCommandOptionType, PermissionsBitField, ButtonBuilder, ButtonStyle } = require("discord.js");
const weather = require('weather-js')

module.exports = {
    name: "weather",
    description: "Permet d'afficher la météo d'une ville",
    usage: "/weather `[ville: ville]`",
    example: "/weather `[ville: paris]`",
    category: "⚙️ Utilités",
    permissions: ["UseApplicationCommands"],
    options: [
        {
            name: "ville",
            description: "Ville",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    async runInteraction (client, interaction) {
        const city = interaction.options.getString("ville")
        weather.find({search: city, degreeType: "C"}, function(error, result) {
            const errorembed = new EmbedBuilder()
                .setDescription("❌ La ville que vous avez indiqué est invalide !")
                .setColor("Red")

            if(result === undefined || result.length === 0) return interaction.reply({ embeds: [errorembed], ephemeral: true })

            let current = result[0].current;

            const embed = new EmbedBuilder()
                .setThumbnail(current.imageUrl)
                .setAuthor({ name: `Température trouvé pour ${city} (${current.observationpoint})` })
                .addFields(
                    { name: "Ville", value: `\`${current.observationpoint}\``, inline: true },
                    { name: "Temps", value: `\`${current.skytext}\``.replace("Sunny", "Soleil").replace("Cloudy", "Nuageux").replace("Fair", "Équitable").replace("Clear", "Dégager"), inline: true },
                    { name: "Température", value: `\`${current.temperature}°C\``, inline: true },
                    { name: "Température ressenti", value: `\`${current.feelslike}°C\``, inline: true },
                    { name: "Vent", value: `\`${current.winddisplay}\``, inline: true },
                    { name: "Humidité", value: `\`${current.humidity}%\``, inline: true },
                )
                .setColor("Random")

            interaction.reply({ embeds: [embed] })
        })
    }
};