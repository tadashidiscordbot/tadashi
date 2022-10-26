const { EmbedBuilder, ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');
const { Success } = require('../../utils/Success')
const { Error } = require('../../utils/Error')

module.exports = {
  name: "kick",
  description: "Exclu un utilisateur",
  permissions: ["KickMembers"],
  usage: "/kick `[user: @utilisateur]` `[reason: raison]`",
  example: "/kick `[user: @drixerex]` `[reason: Insultes]`",
  category: "🔨 Modération",
  options: [
    {
      name: "user",
      description: "Utilisateur",
      type: ApplicationCommandOptionType.User,
      required: true
    },
    {
      name: "reason",
      description: "Raison",
      type: ApplicationCommandOptionType.String,
      required: true
    },
  ],
  async runInteraction(client, interaction) {
    const target = interaction.options.getMember("user")
    const reason = interaction.options.getString("reason")

    if(target.user.bot) return Error(interaction, "Je ne peux pas kick un bot")

    if (target.user.id === client.user.id) return Error(interaction, "Je ne suis pas fou, mais j'ai du mal à accepter ta demande. 👀")
    if (!target.kickable) return Error(interaction, "Je ne peux pas kick ce membre !")

    const embedpv = new EmbedBuilder()
      .setTitle("Sanction")
      .setDescription(`Vous venez d'être **exclu** du serveur **${interaction.guild.name}**\n**Raison :** ${reason}`)
      .setFooter({
        text: interaction.guild.name,
        iconURL: interaction.guild.iconURL({ dynamic: true })
      })
      .setColor(client.color)

    //target.send({ embeds: [embedpv] }).catch(() => target.kick(reason))
    target.kick(reason).catch(() => target.kick(reason))
    Success(interaction, "Ce membre a bien été kick !")
    const embed = new EmbedBuilder()
      .setTitle("Membre exclu")
      .setDescription(`Un membre a été exclu du serveur **${interaction.guild.name}**`)
      .addFields(
        { name: "Membre", value: `${target.user.tag}`, inline: false },
        { name: "Raison", value: `${reason}`, inline: false },
      )
      .setColor(client.red)
      .setTimestamp()

    interaction.channel.send({ embeds: [embed] })
  }
}