const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);
const Logger = require('../Logger');

module.exports = async (client) => {
    (await pGlob(`${process.cwd()}/src/selects/*/*.js`)).map(async (selectMenuFile) => {
        const selectMenu = require(selectMenuFile);
        if (!selectMenu.name) return Logger.warn(`Select menu non-fonctionnel: pas de nom ↓\nFichier -> ${selectMenuFile}`);
        client.selects.set(selectMenu.name, selectMenu);
    })
}
