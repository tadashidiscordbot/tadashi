const {  EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require('discord.js');
const djsv = require('../../../package.json')
const botversion = require('../../version.json')
const { connection } = require("mongoose");
const os = require('os')

const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setURL("https://discord.com/oauth2/authorize?client_id=991789507592589413&permissions=8&scope=bot%20applications.commands")
            .setLabel('Inviter Tadashi')
            .setStyle(ButtonStyle.Link)
            .setEmoji("<:certified_dev:1025082247298154556>"),

        new ButtonBuilder()
            .setURL("https://tadashibot.com/")
            .setLabel("Mon site internet")
            .setStyle(ButtonStyle.Link)
            .setEmoji("💻"),

        new ButtonBuilder()
            .setURL("https://discord.gg/HCH8zjtWkJ")
            .setLabel("Serveur support")
            .setStyle(ButtonStyle.Link)
            .setEmoji("👮")
    )

module.exports = {
    name: "botinfo",
    description: "Affiche les informations du bot",
    usage: "/botinfo",
    example: "/botinfo",
    category: "⚙️ Utilités",
    permissions: ["UseApplicationCommands"],
    async runInteraction (client, interaction) {
        let guildsCount = await client.guilds.fetch();
        let usersCount = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
        const getChannelTypeSize = type => client.channels.cache.filter(channel => type.includes(channel.type)).size;

        const status = [
            "Déconnecter",
            "Connecter",
            "En cours de connexion",
            "En cours de déconnexion"
        ];

        const embed = new  EmbedBuilder()
            .setDescription(
                `
                **__🤖・Identité :__**
                > **Nom d'utilisateur :** ${client.user} \`${client.user.tag}\`
                > **Tag :** ${client.user.discriminator}
                > **ID :** ${client.user.id}
                > **Date de création :** <t:${parseInt(client.user.createdTimestamp / 1000)}:f> (<t:${parseInt(client.user.createdTimestamp / 1000)}:R>)

                **__<:certified_dev:1025082247298154556>・Développeur :__**
                > **Nom :** <@923969347276398653> \`drixerex#3579\`
                > **ID :** 923969347276398653

                **__📊・Statistiques du bot :__**
                > **Démarré :** <t:${parseInt(client.readyTimestamp / 1000)}:f> (<t:${parseInt(client.readyTimestamp / 1000)}:R>)
                > **Serveurs :** ${guildsCount.size}
                > **Utilisateurs :** ${usersCount}
                > **Salons :** ${client.channels.cache.size}
                > **Ping avec l'API de Discord :** ${client.ws.ping}ms
                > **Status de la base de données :** ${status[connection.readyState]} (MongoDB)
            
                **__🖥️・Informations techniques :__** 
                > **Hébergeur :** Hetzner
                > **Système d'exploitation :** ${os.type().replace("Windows_NT", "Windows").replace("Darwin", "macOS")}
                > **Processeur :** ${os.cpus()[0].model}
                > **Mémoire utilisé :** ${(process.memoryUsage().rss/1024/1024).toFixed(2)}MB/16 384MB (${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}%)
                > **Node.JS :** ${process.version}
                > **Discord.JS** : v${djsv.dependencies['discord.js']}

                **__🔗 Liens :__**
                > **Inviter tadashi :** [Invitez moi !](https://discord.com/oauth2/authorize?client_id=991789507592589413&permissions=8&scope=bot%20applications.commands)
                > **Site internet :** [Visiter mon site internet !](https://tadashibot.com)
                > **Développeur :** [drixerex#3579](https://drixerex.xyz/)
                `.replace("^", "")
            )
            .setAuthor({ name: 'Informations du bot', iconURL: `${client.user.displayAvatarURL()}`, url: 'https://tadashibot.com' })
            .setTimestamp()
            .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
            .setColor(client.color)
            .setFooter({
                text: "©️ 2022 DRIXEREX",
            })

        interaction.reply({ embeds: [embed], components: [button] })
    }
 }