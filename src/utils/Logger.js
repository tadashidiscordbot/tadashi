const chalk = require('chalk');
const dayjs = require('dayjs');

const format = '{tstamp} {tag} {txt}\n';

function error(content) {
    write(content, 'black', 'bgRed', 'ERROR', true);
}

function used(content, cmdname) {
    write(content, 'black', 'bgBlue', `CMD - ${cmdname}`, true);
}

function warn(content) {
    write(content, 'black', 'bgYellow', 'WARN', false);
}

function typo(content) {
    write(content, 'black', 'bgCyan', 'TYPO', false);
}

function command(content) {
    write(content, 'black', 'bgMagenta', 'CMD', false);
}

function slash(content) {
    write(content, 'black', 'bgMagenta', 'SLASH', false);
}

function event(content) {
    write(content, 'black', 'bgGreen', 'EVT', false);
}

function db(content) {
    write(content, 'black', 'bgGreen', 'DATABASE', false);
}

function client(content) {
    write(content, 'black', 'bgBlue', 'CLIENT', false);
}

function write(content, tagColor, bgTagColor, tag, error = false) {
    const timestamp = `[${dayjs().format('DD/MM - HH:mm:ss')}]`;
    const logTag = `[${tag}]`;
    const stream = error ? process.stderr : process.stdout;

    const item = format
        .replace('{tstamp}', chalk.gray(timestamp))
        .replace('{tag}', chalk[bgTagColor][tagColor](logTag))
        .replace('{txt}', chalk.white(content));

    stream.write(item);
}

module.exports = { used, error, warn, command, event, typo, client, db, slash };