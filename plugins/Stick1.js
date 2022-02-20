const XcriptX = require('../events');
const {MessageType, Mimetype} = require('@adiwajshing/baileys');
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const {execFile} = require('child_process');
const cwebp = require('cwebp-bin');
const Config = require('../config');

const Language = require('../language');
const Lang = Language.getString('sticker');

if (Config.WORKTYPE == 'private') {
    XcriptX.addCommand({pattern: 'st$', fromMe: true, }, (async (message, match) => {    

        if (message.reply_message === false) return await message.client.sendMessage(message.jid,Lang.NEED_REPLY, MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        const sticker = new Sticker(location, {
            pack: 'Lasiyas Pack', // The pack name
            author: 'Lasi', // The author name
            type: StickerTypes.FULL, // The sticker type
            categories: ['🤩', '🎉'], // The sticker category
            id: message.reply_message.id, // The sticker id
            quality: 50, // The quality of the output file
            background: '#000000' // The sticker background color (only for full stickers)
        })
        
        await message.sendMessage(Buffer.from(sticker.data), MessageType.sticker, {mimetype: sticker.webp, })
  }));
}
