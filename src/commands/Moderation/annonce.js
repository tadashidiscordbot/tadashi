const { ApplicationCommandOptionType, EmbedBuilder, MessageFlagsBitField } = require("discord.js");
const annnouceData = require('../../models/annonceChannel')
const { Success } = require('../../utils/Success')
const { Error } = require('../../utils/Error')

module.exports = {
    name: "annonce",
    description: "Permet de faire une annonce dans ce serveur",
    usage: "/ping",
    example: "/ping",
    category: "🔨 Modération",
    permissions: ["UseApplicationCommands", "ModerateMembers"],
    options: [
        {
            name: "annonce",
            description: "Votre annonce",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "image",
            description: "Votre image",
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ],
    async runInteraction (client, interaction) {
        const { options } = interaction;

        const annoncetext = options.getString("annonce");
        const image = options.getString("image")

        const channelData1 = await annnouceData.findOne({ Guild: interaction.guild.id })
        if(!channelData1) return Error(interaction, "La configuration de l'annonce n'est pas configurer, merci de faire la commande slash `/config annonce` de Tadashi !")
        const channel = interaction.guild.channels.cache.get(channelData1.channelId)
        if(!channel) return Error(interaction, "Le salon est invalide !")
        const role = interaction.guild.roles.cache.get(channelData1.role) 
        if(!role) return Error(interaction, "Le rôle est invalide !")
        
        const embed = new EmbedBuilder()
            .setTitle("Nouvelle annonce !")
            .setDescription(annoncetext)
            .setFooter({
                text: `${interaction.guild.name}`,
                iconURL: `${interaction.guild.iconURL()}`
            })
            .setColor(client.color)
            .setTimestamp()
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })

        image ? embed.setImage(image) : ''
        
        const msg = await channel.send({ content: `${role}`, embeds: [embed] })
        return Success(interaction, `[L'annonce](https://discord.com/channels/${interaction.guild.id}/${channel.id}/${msg.id}) a été envoyé avec succès !`)
    }
};