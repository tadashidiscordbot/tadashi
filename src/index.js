const { Client, Collection } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const mongoose = require("mongoose");
const client = new Client({ intents: 3243773 });
const Logger = require('./utils/Logger');
const { DiscordTogether } = require('discord-together');

['commands', 'buttons', 'modals', 'selects'].forEach(x => client[x] = new Collection());
['CommandUtil', 'EventUtil', 'ButtonUtil', 'ModalUtil', 'SelectUtil'].forEach(handler => { require(`./utils/handlers/${handler}`)(client) });
const antijoin = new Collection();
require('./utils/Giveaways')(client);

process.on('exit', code => { Logger.client(`Le processus s'est arrêté avec le code: ${code}`) });
process.on('uncaughtException', (err, origin) => { Logger.error(`UNCAUGHT_EXCEPTION: ${err}`, `Origine: ${origin}`) });
process.on('unhandledRejection', (reason, promise) => { Logger.warn(`UNHANDLED_REJECTION: ${reason}\n-----\n`, promise) });
process.on('warning', (...args) => Logger.warn(...args));

module.exports = client;

mongoose.connect(process.env.DATABASE_URI, {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
}).then(() => { Logger.db("La connexion à la base de données a été faite avec succès !") })

client.discordTogether = new DiscordTogether(client)
client.color = "#2f3136";
client.footer = "Tadashi, le robot utile."
client.red = "#ff0000";
client.green = "#00FF23";
client.yellow = "#c5ff00";

client.login(process.env.TOKEN);

module.exports = { antijoin };
