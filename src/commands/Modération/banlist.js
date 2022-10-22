const {  EmbedBuilder, PermissionsBitField } = require('discord.js');


module.exports = {
    name: "banlist",
    description: "Envoie la liste des utilisateurs bannis",
    usage: `/banlist`,
    example: "/banlist",
    category: "🔨 Modération",
    permissions: ["ManageMessages"],
    async runInteraction (client, interaction) {
    const fetchBans = await interaction.guild.bans.fetch();

    const embed = new EmbedBuilder()
        .setTitle("Utilisateur(s) banni(s)")
        .setDescription((await fetchBans).map((member) => member.user.tag).join(`,\n`))
        .setColor(client.color)

    interaction.reply({ embeds: [embed] })
  }
}