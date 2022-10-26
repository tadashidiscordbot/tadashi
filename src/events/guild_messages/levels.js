const levelDB = require('../../models/Level')

module.exports = {
    name: "messageCreate",
    once: false,
    async execute(client, message) {
        const { author, guild } = message

        if(!guild || author.bot) return 

        levelDB.findOne({ Guild: guild.id, User: author.id }, async (err, data) => {
            if (err) throw err

            if(!data) {
                levelDB.create({
                    Guild: guild.id,
                    User: author.id,
                    XP: 0,
                    Level: 0
                })
            }
        })

        const give = Math.floor(Math.random() * 29) + 1
        const data = await levelDB.findOne({ Guild: guild.id, User: author.id }).catch(err => { })
        if(!data) return

        const requiredXP = data.Level * data.Level * 100 + 100

        if(data.XP + give >= requiredXP) {
            data.XP += give
            data.Level += 1
            await data.save()
        } else {
            data.XP += give
            await data.save()
        }

    }
}