/* X-Script  */

const XcriptX = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const sql = require('./sql/greetings');
const Config = require('../config');



if (Config.WORKTYPE == 'private') {

XcriptX.addCommand({pattern: 'welcome$', fromMe: true,}, (async (message, match) => {
    var hg = await sql.getMessage(message.jid);
    if (hg === false) {
        await message.client.sendMessage(message.jid,"*You don't set the welcome message yet.!*\n**To set:** ```.welcome hi && hi#how are you?```",MessageType.text);
    } else {
        await message.client.sendMessage(message.jid,"*✅ Welcome message already set!*\n*Message:* ```" + hg.message + '```',MessageType.text);
    }
}));

XcriptX.addCommand({pattern: 'welcome (.*)', fromMe: true, dontAddCommandList: true}, (async (message, match) => {
    if (match[1] === '') {
        return await message.client.sendMessage(message.jid,"*You must write a message to set up the welcome message.*\n*Example:* ```.welcome hi && hi#how are you?```");
    } else {
        if (match[1] === 'delete') { await message.client.sendMessage(message.jid,"*✅ Welcome message has been deleted successfully!*",MessageType.text); return await sql.deleteMessage(message.jid, 'welcome'); }
        await sql.setMessage(message.jid, 'welcome', match[1].replace(/#/g, '\n'));
        return await message.client.sendMessage(message.jid,"*✅ Welcome message has been set successfully!*",MessageType.text)
    }
}));

XcriptX.addCommand({pattern: 'goodbye$', fromMe: true,}, (async (message, match) => {
    var hg = await sql.getMessage(message.jid, 'goodbye');
    if (hg === false) {
        await message.client.sendMessage(message.jid,"*You didn't set a goodbye message!*",MessageType.text)
    } else {
        await message.client.sendMessage(message.jid,"*✅ Goodbye message has been set!*" + hg.message + '```',MessageType.text);
    }
}));

XcriptX.addCommand({pattern: 'goodbye (.*)', fromMe: true, dontAddCommandList: true}, (async (message, match) => {
    if (match[1] === '') {
        return await message.client.sendMessage(message.jid,'*You must write a message to set up the goodbye message.*',MessageType.text);
    } else {
        if (match[1] === 'delete') { await message.client.sendMessage(message.jid,'*✅ Goodbye message has been deleted successfully!*',MessageType.text); return await sql.deleteMessage(message.jid, 'goodbye'); }
        await sql.setMessage(message.jid, 'goodbye', match[1].replace(/#/g, '\n'));
        return await message.client.sendMessage(message.jid,'*✅ Goodbye message has been setted successfully!*',MessageType.text)
    }
}));
} 

else if (Config.WORKTYPE == 'public') {


XcriptX.addCommand({pattern: 'welcome$', fromMe: true,}, (async (message, match) => {
    var hg = await sql.getMessage(message.jid);
    if (hg === false) {
        await message.client.sendMessage(message.jid,"*You don't set the welcome message yet.!*\n**To set:** ```.welcome hi && hi#how are you?```",MessageType.text);
    } else {
        await message.client.sendMessage(message.jid,"*✅ Welcome message already set!*\n*Message:* ```" + hg.message + '```',MessageType.text);
    }
}));

XcriptX.addCommand({pattern: 'welcome (.*)', fromMe: true, dontAddCommandList: true}, (async (message, match) => {
    if (match[1] === '') {
        return await message.client.sendMessage(message.jid,"*You must write a message to set up the welcome message.*\n*Example:* ```.welcome hi && hi#how are you?```");
    } else {
        if (match[1] === 'delete') { await message.client.sendMessage(message.jid,"*✅ Welcome message has been deleted successfully!*",MessageType.text); return await sql.deleteMessage(message.jid, 'welcome'); }
        await sql.setMessage(message.jid, 'welcome', match[1].replace(/#/g, '\n'));
        return await message.client.sendMessage(message.jid,"*✅ Welcome message has been set successfully!*",MessageType.text)
    }
}));

XcriptX.addCommand({pattern: 'goodbye$', fromMe: true,}, (async (message, match) => {
    var hg = await sql.getMessage(message.jid, 'goodbye');
    if (hg === false) {
        await message.client.sendMessage(message.jid,"*You didn't set a goodbye message!*",MessageType.text)
    } else {
        await message.client.sendMessage(message.jid,"*✅ Goodbye message has been set!*" + hg.message + '```',MessageType.text);
    }
}));

XcriptX.addCommand({pattern: 'goodbye (.*)', fromMe: true, dontAddCommandList: true}, (async (message, match) => {
    if (match[1] === '') {
        return await message.client.sendMessage(message.jid,'*You must write a message to set up the goodbye message.*',MessageType.text);
    } else {
        if (match[1] === 'delete') { await message.client.sendMessage(message.jid,'*✅ Goodbye message has been deleted successfully!*',MessageType.text); return await sql.deleteMessage(message.jid, 'goodbye'); }
        await sql.setMessage(message.jid, 'goodbye', match[1].replace(/#/g, '\n'));
        return await message.client.sendMessage(message.jid,'*✅ Goodbye message has been setted successfully!*',MessageType.text)
    }
}));
} 
