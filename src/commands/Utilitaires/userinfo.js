const { ApplicationCommandType, EmbedBuilder, ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');

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