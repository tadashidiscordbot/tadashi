const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);
const Logger = require('../Logger');

module.exports = async (client) => {
    (await pGlob(`${process.cwd()}/src/buttons/*/*.js`)).map(async (btnFile) => {
        const btn = require(btnFile);
        if (!btn.customId) return Logger.warn(`Bouton non-fonctionnel: pas de nom ↓\nFichier -> ${btnFile}`);
        client.buttons.set(btn.customId, btn);
    })
}
