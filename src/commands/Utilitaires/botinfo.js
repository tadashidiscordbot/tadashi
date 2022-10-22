const {  EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require('discord.js');
const djsv = require('../../../package.json')
const botversion = require('../../version.json')

const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setURL("https://discord.com/oauth2/authorize?client_id=991789507592589413&permissions=8&scope=bot%20applications.commands")
            .setLabel('Inviter Tadashi')
            .setStyle(ButtonStyle.Link)
    )

module.exports = {
    name: "botinfo",
    description: "Affiche les informations du bot",
    usage: "/botinfo",
    example: "/botinfo",
    category: "⚙️ Utilités",
    permissions: ["UseApplicationCommands"],
    async runInteraction (client, interaction) {
        const arr = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
        arr.reverse();
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        let guildsCount = await client.guilds.fetch();
        let usersCount = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        const embed1 = new  EmbedBuilder()
            .setTitle("Informations du bot")
            .setDescription("```Chargement en cours, veuillez patientez..```")
            .setColor(client.color)
            .setFooter({
                text: "Botinfo",
            })

        const tryPong = await interaction.reply({ embeds: [embed1], fetchReply: true })

        const embed = new  EmbedBuilder()
            .setTitle("Informations")
            .setDescription("À noter que le ping du bot n'est pas significatif, pour avoir le vrai ping, veuillez faire la commande slash `/ping` !")
            .addFields(
                { name: "Développeur :", value: "`drixerex#3579`", inline: true },
                { name: "Nom du robot :", value: `\`${client.user.username}\``, inline: true },
                { name: "Tag du robot :", value: `\`${client.user.discriminator}\``, inline: true },
                { name: "Identifiant du robot :", value: `\`${client.user.id}\``, inline: true },
                { name: "Base de données :", value: "`MongoDB`", inline: true },
                { name: "Framework de développement :", value: "`discord.js (NodeJS)`", inline: true },
                { name: "Version de discord.js :", value: `\`${djsv.dependencies['discord.js']}\``.replace('^', ''), inline: true },
                { name: "Version de NodeJS :", value: `\`${process.version}\``.replace('^', ''), inline: true },
                { name: "Version du bot", value: `\`${botversion.version}\``, inline: true  },
                { name: "Uptime :", value: `\`${days}j ${hours}h ${minutes}m ${seconds}s\``.replace('^', ''), inline: true },
                { name: "Serveurs :", value: `\`${guildsCount.size}\``, inline: true },
                { name: "Utilisateurs :", value: `\`${usersCount}\``, inline: true },
                { name: "Date de création :", value: "`30/06/2022` ||<:pepe_ok:1025082277962723449> Anniversaire de DRIXEREX||" },
                { name: "Hébergeur :", value: `\`OVHCloud\``, inline: true },
                { name: "Système :", value: `\`Ubuntu 20.04\``, inline: true },
                { name: "RAM utilisé :", value: `\`${(process.memoryUsage().rss/1024/1024).toFixed(2)}MB/16 384MB\``, inline: true },
                
            )
            .setTimestamp()
            .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
            .setColor(client.color)
            .setFooter({
                text: "©️ 2022 DRIXEREX",
            })

        tryPong.edit({ content: ' ', embeds: [embed], components: [button] })
    }
 }