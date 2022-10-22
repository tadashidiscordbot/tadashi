// const DB = require('../../models/protections')

module.exports = {
    name: "messageCreate",
    once: false,
    async execute(client, message) {
        return
        const data = DB.findOne({ Guild: message.guild.id }).catch(err => console.log(err))

        if(!data) return
        if(data.AntiMassPing === false) return;

        if(message.author.bot) return;

        let content = message.content.split(" ")
        let count = 0;

        for(let i = 0; i < content.length; i++) {

            if(content[i].match(new RegExp(/<@!*&*[0-9]+>/g))) count++;
        }

        if(count > 5) {
            await message.delete()
            await message.channel.send(`<:tadashi:1025083076159737937> \`⚠️ Attention :\` ${message.author}, vous mentionnez beaucoup de fois sur un seul message !`)
        }
    }
}