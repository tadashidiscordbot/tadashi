const { EmbedBuilder, ApplicationCommandOptionType, ChannelType } = require("discord.js");
const suggestionChannelData = require('../../models/suggestChannel')
const annonceChannelData = require('../../models/annonceChannel')
const Success = require('../../utils/Success')
const Error = require('../../utils/Error')

module.exports = {
    name: "config",
    description: "Permet de configurer Tadashi dans ce serveur",
    usage: "/config",
    example: "/config",
    category: "🔨 Modération",
    permissions: ["ModerateMembers"],
    options: [
        {
            name: "suggest",
            description: "Configurer le salon de suggestion",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "channel",
                    description: "Salon",
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText],
                    required: false
                }
            ]
        },
        // {
        //     name: "annonce",
        //     description: "Configurer le système d'annonce",
        //     type: ApplicationCommandOptionType.Subcommand,
        //     options: [
        //         {
        //             name: "channel",
        //             description: "Salon",
        //             type: ApplicationCommandOptionType.Channel,
        //             channelTypes: [ChannelType.GuildText],
        //             required: false
        //         },
        //         {
        //             name: "role",
        //             description: "Rôle à mentionner lors de l'annonce",
        //             type: ApplicationCommandOptionType.Role,
        //             required: false
        //         }
        //     ]
        // }
    ],
    async runInteraction (client, interaction) {
        const { options, guild } = interaction;

        if(options.getSubcommand() === "suggest") {
            const channel = options.getChannel("channel")

            if(channel) {
                suggestionChannelData.findOne({ Guild: guild.id }, async (err, data) => {
                    if(data) {
                        data.channelId = channel.id;
                        data.save()

                        return Success(interaction, `Le salon de suggestion a été modifié pour le salon ${channel} avec succès !`)
                    } else {
                        new suggestionChannelData({
                            Guild: guild.id,
                            channelId: channel.id
                        }).save();

                        return Success(interaction, `Le salon de suggestion a été enregisteré pour le salon ${channel} avec succès !`)
                    }
                })
            }

            if(!channel) {
                const channeldata = await suggestionChannelData.findOne({ Guild: guild.id })

                const embed = new EmbedBuilder()
                    .setTitle("Informations sur la configuration du système de suggestion") 
                    .setDescription(
                    `Configuration du système de suggestion enregistré :
                    
                    Salon des suggestions : ${channeldata ? guild.channels.cache.get(channeldata.channelId) ? guild.channels.cache.get(channeldata.channelId) : "Salon invalide" : "Salon non enregistré"}
                    `
                    )
                    .setColor(client.color)

                return interaction.reply({ embeds: [embed] })
            }
        }

        // if(options.getSubcommand() === "annonce") {
        //     const channel = options.getChannel("channel")
        //     const role = options.getRole("role")

        //     if(channel && role) {
        //         annonceChannelData.findOne({ Guild: guild.id }, async (err, data) => {
        //             if(data) {
        //                 data.channelId = channel.id;
        //                 data.role = role.id;
        //                 data.save()
    
        //                 return Success(interaction, `Le salon d'annonce et de rôle a été modifié pour le salon ${channel} et le rôle ${role} avec succès !`)
        //             } else {
        //                 new annonceChannelData({
        //                     Guild: guild.id,
        //                     channelId: channel.id,
        //                     role: role.id
        //                 }).save();
    
        //                 return Success(interaction, `Le salon d'annonce et de rôle a été enregistré pour le salon ${channel} et le rôle ${role} avec succès !`)
        //             }
        //         })
        //     }

        //     if(channel) {
        //         annonceChannelData.findOne({ Guild: guild.id }, async (err, data) => {
        //             if(data) {
        //                 data.channelId = channel.id;
        //                 data.save()
    
        //                 return Success(interaction, `Le salon d'annonce a été modifié pour le salon ${channel} avec succès !`)
        //             } else {
        //                 new annonceChannelData({
        //                     Guild: guild.id,
        //                     channelId: channel.id,
        //                 }).save();
    
        //                 return Success(interaction, `Le salon d'annonce a été enregistré pour le salon ${channel} avec succès !`)
        //             }
        //         })
        //     }

        //     if(role) {
        //         if(channel) {
        //             annonceChannelData.findOne({ Guild: guild.id }, async (err, data) => {
        //                 if(data) {
        //                     data.role = role.id;
        //                     data.save()
        
        //                     return Success(interaction, `Le rôle d'annonce a été modifié pour le rôle ${role} avec succès !`)
        //                 } else {
        //                     new annonceChannelData({
        //                         Guild: guild.id,
        //                         role: role.id,
        //                     }).save();
        
        //                     return Success(interaction, `Le rôle d'annonce a été enregistré pour le rôle ${role} avec succès !`)
        //                 }
        //             })
        //         }
        //     }

        //     if(!channel && !role) {
        //         const channeldata = await annonceChannelData.findOne({ Guild: guild.id })

        //         const embed = new EmbedBuilder()
        //             .setTitle("Informations sur la configuration du système d'annonce") 
        //             .setDescription(
        //             `Configuration du système d'annonce enregistré :
                    
        //             Salon des annonces : ${channeldata ? guild.channels.cache.get(channeldata.channelId) ? guild.channels.cache.get(channeldata.channelId) : "Salon invalide" : "Salon non enregistré"}
        //             Rôle des annonces : ${channeldata ? guild.roles.cache.get(channeldata.role) ? guild.roles.cache.get(channeldata.role) : "Rôle invalide" : "Rôle non enregistré"} 
        //             `
        //             )
        //             .setColor(client.color)

        //         return interaction.reply({ embeds: [embed] })
        //     }
        // }

    }
};