const { EmbedBuilder } = require('discord.js')
const Success = require('../../utils/Success')
const Error = require('../../utils/Error')

module.exports = {
    name: "embed",
    async runInteraction(client, interaction) {
        let message = interaction.fields.getTextInputValue("message")
        let title = interaction.fields.getTextInputValue("title")
        let description = interaction.fields.getTextInputValue("description")
        let footer = interaction.fields.getTextInputValue("footer")

        await Success(interaction, "Votre embed a été créer avec succès !")

        const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setFooter({
                text: `${footer || interaction.guild.name}`,
                iconURL: interaction.guild.iconURL()
            })
            .setTimestamp()
            .setColor(client.color)

        interaction.channel.send({ content: `${message ? message : " "}`, embeds: [embed] })  
    }
}