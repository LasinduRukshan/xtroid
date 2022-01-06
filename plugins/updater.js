/* X-Script  */

const simpleGit = require('simple-git');
const git = simpleGit();
const XcriptX = require('../events');
const {
    MessageType,
    GroupSettingChange,
    Mimetype,
    MessageOptions
} = require('@adiwajshing/baileys');
const Config = require('../config');
const exec = require('child_process').exec;
const Heroku = require('heroku-client');
const { PassThrough } = require('stream');
const heroku = new Heroku({ token: Config.HEROKU.API_KEY })
const axios = require('axios');
const Language = require('../language');
const Lang = Language.getString('updater');


var logoimage = new Array ();

logoimage[0] = "https://telegra.ph/file/03173f6033fe64edb8d18.jpg";
logoimage[1] = "https://telegra.ph/file/50cc173373bbd8e48ffb8.jpg";
logoimage[2] = "https://telegra.ph/file/24da36b7c4a0308817ab1.jpg";
logoimage[3] = "https://telegra.ph/file/e79558693cf75b224755e.jpg";
logoimage[4] = "https://telegra.ph/file/07efd25212e0e83c7fd58.jpg";

  var i = Math.floor(5*Math.random())

  var uplogonew = logoimage[i]    

XcriptX.addCommand({pattern: 'up$', fromMe: true, }, (async (message, match) => {
    await git.fetch();
    var commits = await git.log([Config.BRANCH + '..origin/' + Config.BRANCH]);
    if (commits.total === 0) {
        
        var webimage = await axios.get(`${uplogonew}`, { responseType: 'arraybuffer' })
        await message.client.sendMessage(message.jid,Buffer.from(webimage.data), MessageType.image, {mimetype: Mimetype.jpg  , caption: '\n\n\n\n' + Lang.UPDATE +'\n\n\n\n *◁◁X-Script▷▷*' })
    
    } else {
        var newzels = Lang.NEW_UPDATE;
        commits['all'].map(
            (commit) => {
                newzels += '🔹 [' + commit.date.substring(0, 10) + ']: ' + commit.message + ' ◁◁X-Script▷▷\n';
            }
        );
        
        var webimage = await axios.get(`${uplogonew}`, { responseType: 'arraybuffer' })
        await message.client.sendMessage(message.jid,Buffer.from(webimage.data), MessageType.image, {mimetype: Mimetype.jpg  , caption: newzels + '```'+'\n\n *◁◁X-Script▷▷*' })
        
    }
 }));  



XcriptX.addCommand({pattern: 'up now$', fromMe: true,}, (async (message, match) => {
    await git.fetch();
    var commits = await git.log([Config.BRANCH + '..origin/' + Config.BRANCH]);
    if (commits.total === 0) {
        return await message.client.sendMessage(
            message.jid,

            Lang.UPDATE, MessageType.text
        );    
    } else {
        var guncelleme = await message.reply(Lang.UPDATING);
        if (Config.HEROKU.HEROKU) {
            try {
                var app = await heroku.get('/apps/' + Config.HEROKU.APP_NAME)
            } catch {
                await message.client.sendMessage(
                    message.jid,Lang.INVALID_HEROKU, MessageType.text);
                await new Promise(r => setTimeout(r, 1000));
                return await message.client.sendMessage(
                    message.jid,Lang.IN_AF, MessageType.text);
            }

            git.fetch('upstream', Config.BRANCH);
            git.reset('hard', ['FETCH_HEAD']);

            var git_url = app.git_url.replace(
                "https://", "https://api:" + Config.HEROKU.API_KEY + "@"
            )
            
            try {
                await git.addRemote('heroku', git_url);
            } catch { console.log('heroku remote ekli'); }
            await git.push('heroku', Config.BRANCH);

            await message.client.sendMessage(
                message.jid,Lang.UPDATED, MessageType.text);

            await message.sendMessage(Lang.AFTER_UPDATE);
            
        } else {
            git.pull((async (err, update) => {
                if(update && update.summary.changes) {
                    await message.client.sendMessage(
                        message.jid,Lang.UPDATED_LOCAL, MessageType.text);
                    exec('npm install').stderr.pipe(process.stderr);
                } else if (err) {
                    await message.client.sendMessage(
                        message.jid,'*❌ Have a Error write our support group get more help*\n*Hata:* ```' + err + '```', MessageType.text);
                }
            }));
            await guncelleme.delete();
        }
    }
}));



