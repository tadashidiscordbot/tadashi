const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);
const Logger = require('../Logger');
const { ApplicationCommandType } = require('discord.js')

module.exports = async (client) => {
    (await pGlob(`${process.cwd()}/src/commands/*/*.js`)).map(async (cmdFile) => {
        const cmd = require(cmdFile);

        if (!cmd.name) return Logger.warn(`Commande  non-chargée: pas de nom ↓\nFichier -> ${cmdFile}`);

        if (!cmd.description && cmd.type != ApplicationCommandType.User) return Logger.warn(`Commande  non-chargée: pas de description ↓\nFichier -> ${cmdFile}`);

        if (!cmd.category) return Logger.warn(`Commande  non-chargée: pas de catégorie ↓\nFichier -> ${cmdFile}`);

        if (!cmd.usage && cmd.type != ApplicationCommandType.User) return Logger.warn(`Commande  non-chargée: pas de description d'utilisation ↓\nFichier -> ${cmdFile}`);
 
        if (!cmd.example && cmd.type != ApplicationCommandType.User) return Logger.warn(`Commande  non-chargée: pas d'exemple ↓\nFichier -> ${cmdFile}`);

        if(!cmd.permissions) return Logger.warn(`Commande non-chargée: pas de permissions ↓\nFichier -> ${cmdFile}`)
        
        client.commands.set(cmd.name, cmd);
        Logger.command(`Command chargé: ${cmd.name}`);
    })
}

