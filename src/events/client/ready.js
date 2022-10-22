const Logger = require('../../utils/Logger')
const { ActivityType } = require('discord.js')

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        Logger.client("Bot initialiser et prêt a être utilisé ! (" + client.user.tag + ")");
        let guildsCount = await client.guilds.fetch();
        let usersCount = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
        Logger.client(`Connecté dans ${guildsCount.size} serveurs et prêt à être utiliser par ${usersCount} utilisateurs`)
        const statuses = [
            `/help`,
            `${guildsCount.size} serveurs`,
            `Tadashi V2 !`,
            `https://invite.tadashibot.com/`,
        ]

        setInterval(() => {
            const status = statuses[Math.floor(Math.random()*statuses.length)]
            client.user.setPresence({ activities: [{ name: `${status}`, type: ActivityType.Playing }] })
        }, 5000)

        client.application.commands.set(client.commands.map(cmd => cmd));
        Logger.client("Commande deployé avec succès dans l'API de discord !")
    }
}