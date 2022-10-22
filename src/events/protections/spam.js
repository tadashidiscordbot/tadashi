// const DB = require('../../models/protections')
const UserMap = new Map()

module.exports = {
    name: "messageCreate",
    once: false,
    async execute(client, message) {
        return
        const data = DB.findOne({ Guild: message.guild.id }).catch(err => console.log(err))

        if(!data) return
        if(data.AntiSpam === false) return;

        if(message.author.bot) return;
        if(UserMap.get(message.author.id)) {
            const UserData = UserMap.get(message.author.id)
            const { lastMessage, timer } = UserData
            let difference = message.createdTimestamp - lastMessage.createdTimestamp;
            let msgCount = UserData.msgCount;
    
            if(difference > 3000) {
    
                clearTimeout(timer);
                UserData.msgCount = 1;
                UserData.lastMessage = message;
    
                UserData.timer = setTimeout(() => {
    
                    UserMap.delete(message.author.id)
    
                }, 360000)
    
                UserMap.set(message.author.id, UserData)
            
            } else {
    
                msgCount++;
    
                if(msgCount >= 5) {
    
                    await message.channel.send(`<:tadashi:1025083076159737937> \`⚠️ Attention :\` ${message.author}, vous n'êtes pas autoriser à spam sur ce serveur !`)
    
                    const messages = [...(await message.channel.messages.fetch({
                        limit: 5,
                        before: message.id,
                    })).filter(msg => msg.author.id === message.author.id).values()]
    
                    await message.channel.bulkDelete(messages);
                
                } else {
    
                    UserData.msgCount = msgCount;
                    UserMap.set(message.author.id, UserData)
                }
            }
    
        } else {
    
            let fn = setTimeout(async () => {
    
                UserMap.delete(user.id)
            }, 360000)
    
            UserMap.set(message.author.id, {
    
                msgCount: 1,
                lastMessage: message,
                timer: fn
            })
        }
    }
}