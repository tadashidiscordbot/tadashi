const { ApplicationCommandOptionType, ChannelType, EmbedBuilder } = require("discord.js");
const suggestionChannelData = require('../../models/suggestChannel')
const annonceChannelData = require('../../models/annonceChannel')
const poolData = require('../../models/poolChannel')
const welcomeData = require('../../models/welcomeData')
const { Success } = require('../../utils/Success')
const { Error } = require('../../utils/Error')

module.exports = {
    name: "config",
    description: "Permet de configurer Tadashi dans ce serveur",
    usage: "/config",
    example: "/config",
    category: "🔨 Modération",
    permissions: ["ModerateMembers"],
    options: [
        {
            name: "info",
            description: "Permet de savoir l'information d'un configuration",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "config",
                    description: "Configuration",
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        {
                            name: "Suggestion",
                            value: "1"
                        },
                        {
                            name: "Annonce",
                            value: "2"
                        },
                        {
                            name: "Sondage",
                            value: "3"
                        },
                        {
                            name: "Bienvenue",
                            value: "4"
                        }
                    ],
                    required: true
                }
            ],
        },
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
                    required: true
                }
            ]
        },
        {
            name: "annonce",
            description: "Configurer le système d'annonce",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "channel",
                    description: "Salon",
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText, ChannelType.GuildAnnouncement],
                    required: true
                },
                {
                    name: "role",
                    description: "Rôle à mentionner lors de l'annonce",
                    type: ApplicationCommandOptionType.Role,
                    required: true
                }
            ]
        },
        {
            name: "pool",
            description: "Configurer le système de sondages",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "channel",
                    description: "Salon",
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText, ChannelType.GuildAnnouncement],
                    required: true
                },
                {
                    name: "role",
                    description: "Rôle à mentionner lors du sondage",
                    type: ApplicationCommandOptionType.Role,
                    required: true
                }
            ]
        },
        {
            name: "welcome",
            description: "Configurer le système de bienvenue",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "channel",
                    description: "Salon",
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText, ChannelType.GuildAnnouncement],
                    required: true
                },
                {
                    name: "auto_role",
                    description: "Auto rôle",
                    type: ApplicationCommandOptionType.Role,
                    required: false
                }
            ]
        }
    ],
    async runInteraction (client, interaction) {
        const { options, guild } = interaction;

        if(options.getSubcommand() === "info") {
            const config = options.getString("config")

            if(config === "1") {
                const data = await suggestionChannelData.findOne({ Guild: guild.id })
                if(!data) return Error(interaction, "Il n'y a pas de données enregistrés pour la configuration des suggestion")

                const embed = new EmbedBuilder()
                    .setTitle("Informations sur la configuration des suggestions")
                    .setDescription(
                        `
                        Informations sur la configuration des suggestions du serveur ${guild.name}

                        > **Salon :** ${guild.channels.cache.get(data.channelId) ? guild.channels.cache.get(data.channelId) : "Salon supprimé ou inconnu"}
                        `
                    )
                    .setColor(client.color)

                interaction.reply({ embeds: [embed] })
            }

            if(config === "2") {
                const data = await annonceChannelData.findOne({ Guild: guild.id })
                if(!data) return Error(interaction, "Il n'y a pas de données enregistrés pour la configuration des suggestion")

                const embed = new EmbedBuilder()
                    .setTitle("Informations sur la configuration des annonces")
                    .setDescription(
                        `
                        Informations sur la configuration des annonces du serveur ${guild.name}

                        > **Salon :** ${guild.channels.cache.get(data.channelId) ? guild.channels.cache.get(data.channelId) : "Salon supprimé ou inconnu"}
                        > **Rôle :** ${guild.roles.cache.get(data.role) ? guild.roles.cache.get(data.role) : "Rôle supprimé ou inconnu"}
                        `
                    )
                    .setColor(client.color)

                interaction.reply({ embeds: [embed] })
            }

            if(config === "3") {
                const data = await poolData.findOne({ Guild: guild.id })
                if(!data) return Error(interaction, "Il n'y a pas de données enregistrés pour la configuration des sondages")

                const embed = new EmbedBuilder()
                    .setTitle("Informations sur la configuration des sondages")
                    .setDescription(
                        `
                        Informations sur la configuration des sondages du serveur ${guild.name}

                        > **Salon :** ${guild.channels.cache.get(data.channelId) ? guild.channels.cache.get(data.channelId) : "Salon supprimé ou inconnu"}
                        > **Rôle :** ${guild.roles.cache.get(data.role) ? guild.roles.cache.get(data.role) : "Rôle supprimé ou inconnu"}
                        `
                    )
                    .setColor(client.color)

                interaction.reply({ embeds: [embed] })
            }

            if(config === "4") {
                const data = await welcomeData.findOne({ Guild: guild.id })
                if(!data) return Error(interaction, "Il n'y a pas de données enregistrés pour la configuration des sondages")

                const embed = new EmbedBuilder()
                    .setTitle("Informations sur la configuration du système de bienvenue")
                    .setDescription(
                        `
                        Informations sur la configuration du système de bienvenue du serveur ${guild.name}

                        > **Salon :** ${guild.channels.cache.get(data.channelId) ? guild.channels.cache.get(data.channelId) : "Salon supprimé ou inconnu"}
                        > **Rôle :** ${guild.roles.cache.get(data.role) ? guild.roles.cache.get(data.role) : "Rôle supprimé ou inconnu"}
                        `
                    )
                    .setColor(client.color)

                interaction.reply({ embeds: [embed] })
            }
        }

        if(options.getSubcommand() === "suggest") {
            const channel = options.getChannel("channel")

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

        if(options.getSubcommand() === "annonce") {
            const channel = options.getChannel("channel")
            const role = options.getRole("role")

            annonceChannelData.findOne({ Guild: guild.id }, async (err, data) => {
                if(data) {
                    data.channelId = channel.id;
                    data.role = role.id;
                    data.save()

                    return Success(interaction, `Le salon d'annonce et de rôle a été modifié pour le salon ${channel} et le rôle ${role} avec succès !`)
                } else {
                    new annonceChannelData({
                        Guild: guild.id,
                        channelId: channel.id,
                        role: role.id
                    }).save();

                    return Success(interaction, `Le salon d'annonce et de rôle a été enregistré pour le salon ${channel} et le rôle ${role} avec succès !`)
                }
            })
        }

        
        if(options.getSubcommand() === "pool") {
            const channel = options.getChannel("channel")
            const role = options.getRole("role")

            poolData.findOne({ Guild: guild.id }, async (err, data) => {
                if(data) {
                    data.channelId = channel.id;
                    data.role = role.id;
                    data.save()

                    return Success(interaction, `Le salon de sondages et de rôle a été modifié pour le salon ${channel} et le rôle ${role} avec succès !`)
                } else {
                    new poolData({
                        Guild: guild.id,
                        channelId: channel.id,
                        role: role.id
                    }).save();

                    return Success(interaction, `Le salon de sondages et de rôle a été enregistré pour le salon ${channel} et le rôle ${role} avec succès !`)
                }
            })
        }

        if(options.getSubcommand() === "welcome") {
            const channel = options.getChannel("channel")
            const role = options.getRole("auto_role")

            if(!role) {
                welcomeData.findOne({ Guild: guild.id }, async (err, data) => {
                    if(data) {
                        data.channelId = channel.id;
                        data.save()
    
                        return Success(interaction, `Le salon de bienvenue a été modifié pour le salon ${channel} avec succès !`)
                    } else {
                        new welcomeData({
                            Guild: guild.id,
                            channelId: channel.id,
                        }).save();
    
                        return Success(interaction, `Le salon de bienvenue a été enregistré pour le salon ${channel} avec succès !`)
                    }
                })
            }

            if(role) {
                welcomeData.findOne({ Guild: guild.id }, async (err, data) => {
                    if(data) {
                        data.channelId = channel.id
                        data.role = role.id
                        data.save()
    
                        return Success(interaction, `Le salon de bienvenue et l'auto rôle a été modifié pour le salon ${channel} et le rôle ${role} avec succès !`)
                    } else {
                        new welcomeData({
                            Guild: guild.id,
                            channelId: channel.id,
                            role: role.id
                        }).save();
    
                        return Success(interaction, `Le salon de bienvenue et l'auto rôle a été enregistré pour le salon ${channel} et le rôle ${role} avec succès !`)
                    }
                })
            }
        }

    }
};