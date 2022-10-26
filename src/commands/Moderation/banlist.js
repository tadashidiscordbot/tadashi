const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { Error } = require('../../utils/Error')

module.exports = {
  name: "banlist",
  description: "Envoie la liste des utilisateurs bannis",
  usage: `/banlist`,
  example: "/banlist",
  category: "🔨 Modération",
  permissions: ["ManageMessages"],
  async runInteraction(client, interaction) {
    const fetchBans = await interaction.guild.bans.fetch();
  
    const banlist = (await fetchBans).map((member) => member.user.tag).join(`,\n`)

    if (banlist.length < 1) return Error(interaction, "Il n'y a pas de personnes banni(s) dans ce serveur !")

    const embed = new EmbedBuilder()
      .setTitle("Utilisateur(s) banni(s)")
      .setDescription(`${banlist}`)
      .setColor(client.color)

    interaction.reply({ embeds: [embed] })
  }
}