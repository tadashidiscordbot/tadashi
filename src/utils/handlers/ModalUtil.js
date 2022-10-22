const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);
const Logger = require('../Logger');

module.exports = async (client) => {
    (await pGlob(`${process.cwd()}/src/modals/*/*.js`)).map(async (ModalFile) => {
        const Modals = require(ModalFile);
        if (!Modals.name) return Logger.warn(`Modals non-fonctionnel: pas de nom ↓\nFichier -> ${ModalFile}`);
        client.modals.set(Modals.name, Modals);
    })
}
