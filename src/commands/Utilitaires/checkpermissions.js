const { PermissionsBitField, EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")

module.exports = {
    name: "checkpermissions",
    description: "Permet de vérifier vos permissions ou celles d'un utilisateur",
    usage: "/checkpermissions `(user: utilisateur)`",
    example: "/checkpermissions",
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
        const embed1 = new EmbedBuilder()
            .setTitle("Informations des permissions")
            .setDescription("```Chargement en cours, veuillez patientez..```")
            .setColor(client.color)
            .setFooter({
                text: "Checkpermissions",
            })

		const reply = await interaction.reply({ embeds: [embed1], fetchReply: true })

		const embed2 = new EmbedBuilder()
			.setTitle(`Permissions de ${member.user.tag}`)
			.setDescription(`**Voir les salons : ${member.permissions.has(PermissionsBitField.Flags.ViewChannel) ? "<:on_switch:1025082274619867166>" : "<:off_switch:1025082272866644009>"}\nGérer les salons : ${member.permissions.has(PermissionsBitField.Flags.ManageChannels) ? "<:on_switch:1025082274619867166>" : "<:off_switch:1025082272866644009>"}\nGérer les rôles : ${member.permissions.has(PermissionsBitField.Flags.ManageRoles) ? "<:on_switch:1025082274619867166>" : "<:off_switch:1025082272866644009>"}\nGérer les émojis et les autocollants : ${member.permissions.has(PermissionsBitField.Flags.ManageEmojisAndStickers) ? "<:on_switch:1025082274619867166>" : "<:off_switch:1025082272866644009>"}\nVoir les logs du serveur : ${member.permissions.has(PermissionsBitField.Flags.ViewAuditLog) ? "<:on_switch:1025082274619867166>" : "<:off_switch:1025082272866644009>"}\nVoir les analyses de serveur : ${member.permissions.has(PermissionsBitField.Flags.ViewGuildInsights) ? "<:on_switch:1025082274619867166>" : "<:off_switch:1025082272866644009>"}\nGérer les webhooks : ${member.permissions.has(PermissionsBitField.Flags.ManageWebhooks) ? "<:on_switch:1025082274619867166>" : "<:off_switch:1025082272866644009>"}\nGérer le serveur : ${member.permissions.has(PermissionsBitField.Flags.ManageGuild) ? "<:on_switch:1025082274619867166>" : "<:off_switch:1025082272866644009>"}\nCréer une invitation : ${member.permissions.has(PermissionsBitField.Flags.CreateInstantInvite) ? "<:on_switch:1025082274619867166>" : "<:off_switch:1025082272866644009>"}\nChanger le pseudo : ${member.permissions.has(PermissionsBitField.Flags.ChangeNickname) ? "<:on_switch:1025082274619867166>" : "<:off_switch:1025082272866644009>"}\nGérer les pseudos : ${member.permissions.has(PermissionsBitField.Flags.ManageNicknames) ? "<:on_switch:1025082274619867166>" : "<:off_switch:1025082272866644009>"}\nExpulser des membres : ${member.permissions.has(PermissionsBitField.Flags.KickMembers) ? "<:on_switch:1025082274619867166>" : "<:off_switch:1025082272866644009>"}\nBannir des membres : ${member.permissions.has(PermissionsBitField.Flags.BanMembers) ? "<:on_switch:1025082274619867166>" : "<:off_switch:1025082272866644009>"}\nExclure temporairement des membres : ${member.permissions.has(PermissionsBitField.Flags.ModerateMembers) ? "<:on_switch:1025082274619867166>" : "<:off_switch:1025082272866644009>"}\nEnvoyer des messages : ${member.permissions.has(PermissionsBitField.Flags.SendMessages) ? "<:on_switch:1025082274619867166>" : "<:off_switch:1025082272866644009>"}\nEnvoyer des messages dans les fils : ${member.permissions.has(PermissionsBitField.Flags.SendMessagesInThreads) ? "<:on_switch:1025082274619867166>" : "<:off_switch:1025082272866644009>"}\nCréer des fils public : ${member.permissions.has(PermissionsBitField.Flags.CreatePublicThreads) ? "<:on_switch:1025082274619867166>" : "<:off_switch:1025082272866644009>"}\nCréer des fils privés : ${member.permissions.has(PermissionsBitField.Flags.CreatePrivateThreads) ? "<:on_switch:1025082274619867166>" : "<:off_switch:1025082272866644009>"}\nIntégrer des liens : ${member.permissions.has(PermissionsBitField.Flags.EmbedLinks) ? "<:on_switch:1025082274619867166>" : "<:off_switch:1025082272866644009>"}\nJoindre des fichiers :${member.permissions.has(PermissionsBitField.Flags.AttachFiles) ? "<:on_switch:1025082274619867166>" : "<:off_switch:1025082272866644009>"}\nAjouter des réactions : ${member.permissions.has(PermissionsBitField.Flags.AddReactions) ? "<:on_switch:1025082274619867166>" : "<:off_switch:1025082272866644009>"}\nUtiliser des émojis externes : ${member.permissions.has(PermissionsBitField.Flags.UseExternalEmojis) ? "<:on_switch:1025082274619867166>" : "<:off_switch:1025082272866644009>"}\nUtiliser des autocollants externes : ${member.permissions.has(PermissionsBitField.Flags.UseExternalStickers) ? "<:on_switch:1025082274619867166>" : "<:off_switch:1025082272866644009>"}\nMentionner @everyone, @here et tous les rôles : ${member.permissions.has(PermissionsBitField.Flags.MentionEveryone) ? "<:on_switch:1025082274619867166>" : "<:off_switch:1025082272866644009>"}\nGérer les messages : ${member.permissions.has(PermissionsBitField.Flags.ManageMessages) ? "<:on_switch:1025082274619867166>" : "<:off_switch:1025082272866644009>"}\nGérer les fils : ${member.permissions.has(PermissionsBitField.Flags.ManageThreads) ? "<:on_switch:1025082274619867166>" : "<:off_switch:1025082272866644009>"}\nVoir les anciens messages : ${member.permissions.has(PermissionsBitField.Flags.ReadMessageHistory) ? "<:on_switch:1025082274619867166>" : "<:off_switch:1025082272866644009>"}\nUtiliser les commandes de l'application : ${member.permissions.has(PermissionsBitField.Flags.UseApplicationCommands) ? "<:on_switch:1025082274619867166>" : "<:off_switch:1025082272866644009>"}\nSe connecter : ${member.permissions.has(PermissionsBitField.Flags.Connect) ? "<:on_switch:1025082274619867166>" : "<:off_switch:1025082272866644009>"}\nParler : ${member.permissions.has(PermissionsBitField.Flags.Speak) ? "<:on_switch:1025082274619867166>" : "<:off_switch:1025082272866644009>"}\nUtiliser les Activités : ${member.permissions.has(PermissionsBitField.Flags.UseEmbeddedActivities) ? "<:on_switch:1025082274619867166>" : "<:off_switch:1025082272866644009>"}\nVoix prioritaire : ${member.permissions.has(PermissionsBitField.Flags.PrioritySpeaker) ? "<:on_switch:1025082274619867166>" : "<:off_switch:1025082272866644009>"}\nAdministrateur : ${member.permissions.has(PermissionsBitField.Flags.Administrator) ? "<:on_switch:1025082274619867166>" : "<:off_switch:1025082272866644009>"}**`)
			.setFooter({
				text: client.footer,
				iconURL: client.user.displayAvatarURL()
			})
			.setColor(client.color)

		reply.edit({ embeds: [embed2] })
    }
}