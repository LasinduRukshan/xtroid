/* X-Script  */

const XcriptX = require('../events');
const {MessageType, Mimetype} = require('@adiwajshing/baileys');
const Config = require('../config');
const fs = require('fs');
const got = require('got');
const FormData = require('form-data');
const stream = require('stream');
const {promisify} = require('util');

const pipeline = promisify(stream.pipeline);



if (Config.WORKTYPE == 'private') {

    XcriptX.addCommand({pattern: 'rmbg ?(.*)', fromMe: true,}, (async (message, match) => {    

        if (message.reply_message === false || message.reply_message.image === false) return await message.client.sendMessage(message.jid,"*Give me a photo!*",MessageType.text);
        if (Config.RBG_API_KEY === false) return await message.client.sendMessage(message.jid,"*You don't have an API key!*\nYou can get it here: remove.bg.".replace('remove.bg', 'remove.bg'),MessageType.text);
    
        var load = await message.reply("Removing background...");
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        var form = new FormData();
        form.append('image_file', fs.createReadStream(location));
        form.append('size', 'auto');

        var rbg = await got.stream.post('https://api.remove.bg/v1.0/removebg', {
            body: form,
            headers: {
                'X-Api-Key': Config.RBG_API_KEY
            }
        }); 
    
        await pipeline(
		    rbg,
		    fs.createWriteStream('rbg.png')
        );
    
        await message.client.sendMessage(message.jid,fs.readFileSync('rbg.png'), MessageType.document, {filename: 'XCript.png', mimetype: Mimetype.png});
        await load.delete();
    }));
}
else if (Config.WORKTYPE == 'public') {

    XcriptX.addCommand({pattern: 'rmbg ?(.*)', fromMe: false,}, (async (message, match) => {    
        if (message.reply_message === false || message.reply_message.image === false) return await message.client.sendMessage(message.jid,"*Give me a photo!*",MessageType.text);
        if (Config.RBG_API_KEY === false) return await message.client.sendMessage(message.jid,"*You don't have an API key!*\nYou can get it here: remove.bg.".replace('remove.bg', 'remove.bg'),MessageType.text);
    
        var load = await message.reply("Removing background...");
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        var form = new FormData();
        form.append('image_file', fs.createReadStream(location));
        form.append('size', 'auto');

        var rbg = await got.stream.post('https://api.remove.bg/v1.0/removebg', {
            body: form,
            headers: {
                'X-Api-Key': Config.RBG_API_KEY
            }
        }); 
    
        await pipeline(
		    rbg,
		    fs.createWriteStream('rbg.png')
        );
    
        await message.client.sendMessage(message.jid,fs.readFileSync('rbg.png'), MessageType.document, {filename: 'XCript.png', mimetype: Mimetype.png});
        await load.delete();
    }));
    
}
