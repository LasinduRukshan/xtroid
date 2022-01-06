/* X-Script  */

const XcriptX = require('../events');
const Heroku = require('heroku-client');
const Config = require('../config');
const {MessageType} = require('@adiwajshing/baileys');
const got = require('got');
const fs = require('fs');
const Db = require('./sql/plugin');
const Language = require('../language');
const Lang = Language.getString('_plugin');
const NLang = Language.getString('updater');

let msg = Config.LANG == 'SI' || Config.LANG == 'AZ' ? '*අනුමත කරනලද ප්ලගීනයකි..!* ✅' : '*Approved plugin.* ✅'
let inmsg = Config.LANG == 'SI' || Config.LANG == 'AZ' ? '*අනුමත නොකරණ ලද ප්ලගීනකි..!* ❌' : '*Not Approved Plugin.* ❌'

const heroku = new Heroku({
    token: Config.HEROKU.API_KEY
});


let baseURI = '/apps/' + Config.HEROKU.APP_NAME;

XcriptX.addCommand({pattern: 'install ?(.*)', fromMe: true,}, (async (message, match) => {
    if (match[1] === '') return await message.sendMessage('Need url .install https://gist.github.com/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    try {
        var url = new URL(match[1]);
    } catch {
        return await message.sendMessage('Invalid url');
    }
    
    if (url.host === 'gist.github.com') {
        url.host = 'gist.githubusercontent.com';
        url = url.toString() + '/raw'
    } else {
        url = url.toString()
    }

    var response = await got(url);
    if (response.statusCode == 200) {
        // plugin adı
        var plugin_name = response.body.match(/addCommand\({.*pattern: ["'](.*)["'].*}/);
        if (plugin_name.length >= 1) {
            plugin_name = "." + plugin_name[1];
        } else {
            plugin_name = "." + Math.random().toString(36).substring(8);
        }

        fs.writeFileSync('./plugins/' + plugin_name + '.js', response.body);
        try {
            require('./' + plugin_name);
        } catch (e) {
            fs.unlinkSync('/root/Test/lugins/' + plugin_name + '.js')
            return await message.sendMessage('Invalid plugin' + ' ```' + e + '```');
        }

        await Db.installPlugin(url, plugin_name);
        await message.client.sendMessage(message.jid, 'Instaled', MessageType.text);
        if (!match[1].includes('lasiyaWa')) {
            await new Promise(r => setTimeout(r, 400));
            await message.client.sendMessage(message.jid, 'Unofficial Plugin detected', MessageType.text);
        }
    }
}));

XcriptX.addCommand({pattern: 'pluglist', fromMe: true,}, (async (message, match) => {
    var mesaj = 'Plugin list';
    var plugins = await Db.PluginDB.findAll();
    if (plugins.length < 1) {
        return await message.sendMessage('No plugin found');
    } else {
        plugins.map(
            (plugin) => {
                let vf = plugin.dataValues.url.includes('lasiyawa') ? msg : inmsg
                mesaj += '```' + plugin.dataValues.name + '```: ' + '🧚‍♂️ \n' + vf + '\n\n';
            }
        );
        return await message.client.sendMessage(message.jid, mesaj, MessageType.text);
    }
}));

XcriptX.addCommand({pattern: 'remove(?: |$)(.*)', fromMe: true,}, (async (message, match) => {
    if (match[1] === '') return await message.sendMessage('need plugin');
    if (!match[1].startsWith('.')) match[1] = '.' + match[1];
    var plugin = await Db.PluginDB.findAll({ where: {name: match[1]} });
    if (plugin.length < 1) {
        return await message.sendMessage(message.jid, 'No plugin', MessageType.text);
    } else {
        await plugin[0].destroy();
        delete require.cache[require.resolve('./' + match[1] + '.js')]
        fs.unlinkSync('./plugins/' + match[1] + '.js');
        await message.client.sendMessage(message.jid, 'Deleted', MessageType.text);
        
        await new Promise(r => setTimeout(r, 1000));
    
        await message.sendMessage('Update Compleate');

        console.log(baseURI);
        await heroku.delete(baseURI + '/dynos').catch(async (error) => {
            await message.sendMessage(error.message);

        });
    }

}));
