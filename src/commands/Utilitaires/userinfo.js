const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "userinfo",
    description: "Affiche les informations d'un utilisateur",
    usage: "/userinfo `(user: @utilisateur)`",
    example: "/userinfo `(user: @drixerex)`",
    category: "⚙️ Utilités",
    permissions: ["UseApplicationCommands"],
    options: [
        {
            name: "user",
            description: "Utilisateur",
            type: ApplicationCommandOptionType.User,
            required: false
        }
    ],
    async runInteraction (client, interaction) {
        const member = await interaction.guild.members.fetch(interaction.options.getMember("user") || interaction.user.id)
        const formatter  = new Intl.ListFormat("en-GB", { style: "narrow", type: "conjunction" });

        const badges = {
            BugHunterLevel1: "<:BugHunter:1034175744676474970>",
            BugHunterLevel2: "<:BugBuster:1034176271917264937>",
            CertifiedModerator: "<:DiscordCertifiedModerator:1034176525324537977>",
            HypeSquadOnlineHouse1: "<:HypesquadBravery:1025778246329061486>",
            HypeSquadOnlineHouse2: "<:HypesquadBrilliance:1025778247616704532>",
            HypeSquadOnlineHouse3: "<:HypesquadBalance:1025778245087543337>",
            Hypesquad: "<:HypeSquadEventAttendee:1025778249642541167>",
            Partner: "<:DiscordPartner:1034177499657146510> ",
            PremiumEarlySupporter: "<:EarlySupporter:1034177608436428800> ",
            Staff: "<:DiscordStaff:1034177686005895219> ",
            VerifiedBot: "<:VerifiedBot:1025804638135529532>",
            VerifiedDeveloper: "<:VerifiedDeveloper:1034177974058106920>"
        };


        const clientType = [
            { name: "desktop", text: "Ordinateur", emoji: "💻" },
            { name: "mobile", text: "Téléphone", emoji: "🤳🏻" },
            { name: "web", text: "Site internet", emoji: "🌍" },
            { name: "offline", text: "Offline", emoji: "💤" }
        ];

        // Badge bug en résolution : > **Badge(s) (${userFlags.length}) :** ${userFlags.length ? formatter.format(userFlags.map(flag => `**${badges[flag]}**`)) : "Aucune"} 

        const userFlags = member.user.flags.toArray();

        const clientStatus = member.presence?.clientStatus instanceof Object ? Object.keys(member.presence.clientStatus) : "Offline";

        const deviceFilter = clientType.filter(device => clientStatus.includes(device.name));
        const devices = !Array.isArray(deviceFilter) ? new Array(deviceFilter) : deviceFilter;
        
        const activityType = [
            "🎮 Joue à",
            "🎙 Streame",
            "🎧 Ecoute",
            "📺 Regarde",
            "",
            "🏆 En compétition"
        ];

        const embed = new EmbedBuilder()
            .setTitle(`Informations sur \`${member.user.username}\``)
            .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
            .setFooter({
                text: "Userinfo",
                iconURL: member.user.displayAvatarURL({dynamic: true})
            })
            .setDescription(
                `
                **__👤・Informations sur l'utilisateur :__**
                > **Nom d'utilisateur :** ${member.user} \`${member.user.tag}\`
                > **Tag :** ${member.user.discriminator}
                > **ID :** ${member.user.id}
                > **Robot :** ${member.user.bot ? "Oui" : "Non"}
                > **Création de compte :** <t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)
                > **Appareil :** ${devices.map(device => `${device.emoji} ${device.text}`).join(", ")}
                > **Activité :** ${member.presence?.activities.map(activity => `${activityType[activity.type]} ${activity.name}`.replace("Custom Status", "Status personnalisé")).join(", ") || "Aucune"}

                **__🖥️・Informations relatives à ${interaction.guild.name} :__**
                > **A rejoint le serveur le :** <t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)
                > **Boost le serveur :** ${member.premiumSince ? "Oui" : "Non"}
                > **Surnom :** ${member.nickname ? member.nickname : "Aucun"}
                > Rôles (${member.roles.cache.size}) : ${member.roles.cache.map(role => role).join(', ')}
                `
            )
            .setTimestamp()
        	.setImage(await (await client.users.fetch(member.user.id, {force: true})).bannerURL({dynamic: true, size: 4096}))
            .setColor(client.color)

        interaction.reply({ embeds: [embed] })
    }
}