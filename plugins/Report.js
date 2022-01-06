/* X-Script  */

const XcriptX = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const Config = require('../config');


if (Config.WORKTYPE == 'private') {
    XcriptX.addCommand({pattern: 'report ?(.*)', fromMe: true,}, (async (message, match) => {
        if (match[1] == '' && message.reply_message) {
            let grup = await message.client.groupMetadata(message.jid);
            var jids = [];
            mesaj = '';
            grup['participants'].map(async (uye) => {
                if (uye.isAdmin) {
                    mesaj += '@' + uye.id.split('@')[0] + ' ';
                    jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
                }
            });
            await message.client.sendMessage(message.jid,' ```Report``` \n\n*User:* '+'@' + message.reply_message.jid.split('@')[0] + "\n*Reason:* " + `${match[1]}`, MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
        
        }
        else if (match[1] !== '' && message.reply_message) {
            let grup = await message.client.groupMetadata(message.jid);
            var jids = [];
            mesaj = '';
            grup['participants'].map(async (uye) => {
                if (uye.isAdmin) {
                    mesaj += '@' + uye.id.split('@')[0] + ' ';
                    jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
                }
            });
            await message.client.sendMessage(message.jid,' ```Report``` \n\n*User:* '+'@' + message.reply_message.jid.split('@')[0] + "\n*Reason:* " + `${match[1]}`, MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
        }
        else if (!message.reply_message) {
            return message.client.sendMessage(message.jid,'Reply to user..', MessageType.text);
        }
    }));
}
