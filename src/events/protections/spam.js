const DB = require('../../models/spamProtect')
const UserMap = new Map()

module.exports = {
    name: "messageCreate",
    once: false,
    async execute(client, message) {
        const data = await DB.findOne({ Guild: message.guild.id }).catch(err => console.log(err))
        if(!data) return

        if(message.author.bot) return;

        if(data.channelId) {
            if(message.channel.id === data.channelId) return
        }

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
                    if(message.member.permissions.has("ModerateMembers")) {
                        try{await message.member.send(`**⚠️ Rappel :**\n> Le spam n'est pas autorisé dans le salon ${message.channel}. En tant que modérateur il ne va rien vous arriver. Si ce salon est un salon dédies au spam, veuillez faire la commande slash \`/config antispam (exception_channel: #salon)\` de Tadashi !`)} catch(err) {}
                        return
                    } else {
                        try{await message.member.send(`**⚠️ Avertissement :**\n> Le spam n'est pas autorisé dans le salon ${message.channel}.`)} catch(err) {}
                    }

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