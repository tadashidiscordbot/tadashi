// const DB = require('../../models/protections')

module.exports = {
    name: "messageCreate",
    once: false,
    async execute(client, message) {
        return
        const data = DB.findOne({ Guild: message.guild.id }).catch(err => console.log(err))

        if(!data) return
        if(data.AntiLink === false) return;

        if(message.author.bot) return;
            
        if(message.content.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g))) {

            await message.delete()
    
            await message.channel.send(`<:tadashi:1025083076159737937> \`⚠️ Attention :\` ${message.author}, les liens ne sont pas autorisé sur ce serveur !`)
        }
    }
}