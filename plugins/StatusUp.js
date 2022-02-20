/* X-Script  */


const XcriptX = require('../events');
const {MessageType, Mimetype} = require('@adiwajshing/baileys');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const {execFile} = require('child_process');
const cwebp = require('cwebp-bin');
const Config = require('../config');
const DW = 'Status Downloading Check Log Number....'
const Language = require('../language');
const Lang = Language.getString('XcriptX');
const NEED_REPLY = '⚠️tag stataus'

    XcriptX.addCommand({pattern: 'down$', fromMe: true, desc: 'Download status to your log'}, (async (message, match) => {    

        if (message.reply_message === false) return await message.client.sendMessage(message.jid,NEED_REPLY, MessageType.text);
        var downloading = await message.client.sendMessage(message.jid,DW,MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        if (message.reply_message.video === false && message.reply_message.image) {
            ffmpeg(location)
                .save('st.png')
                .on('end', async () => {
                    await message.client.sendMessage(message.client.user.jid,fs.readFileSync('st.png'), MessageType.image);
            });
        return 
        }

        ffmpeg(location)
            .save('sta.mp4')
            .on('end', async () => {
                await message.client.sendMessage(message.client.user.jid,fs.readFileSync('sta.mp4'), MessageType.video);
            });
        return 
    }));

    XcriptX.addCommand({pattern: 'tg ?(.*)', fromMe: true, }, (async (message, match) => {

        var im = await (message);
    
        if (!im) return await message.client.sendMessage(message.jid,Lang.ADMİN,MessageType.text);
    
        if (match[1] !== '') {
    
            grup = await message.client.groupMetadata(message.jid);
    
            var jids = [];
    
            mesaj = '';
    
            grup['participants'].map(
    
                async (uye) => {
    
                    mesaj += '🔮@' + uye.id.split('@')[0] + ' ';
    
                    jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
    
                }
    
            );
    
            await message.client.sendMessage(message.jid,`${match[1]}`, MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
    
        }
    
        else if (match[1] == '') {
    
            grup = await message.client.groupMetadata(message.jid);
    
            var jids = [];
    
            mesaj = '';
    
            grup['participants'].map(
    
                async (uye) => {
    
                    mesaj += '🔮@' + uye.id.split('@')[0] + '\n';
    
                    jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
    
                }
    
            );
    
            await message.client.sendMessage(message.jid,mesaj, MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
    
        }
    
        else if (message.reply_message && match[1] == '') {
    
            grup = await message.client.groupMetadata(message.jid);
    
            var jids = [];
    
            mesaj = '';
    
            grup['participants'].map(
    
                async (uye) => {
    
                    mesaj += '🔮@' + uye.id.split('@')[0] + '\n';
    
                    jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
    
                }
    
            );
    
            await message.client.sendMessage(message.jid,message.reply_message.text, MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
    
        }
    
    }));
