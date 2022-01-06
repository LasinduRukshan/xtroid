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

if (Config.WORKTYPE == 'admin') {

    async function checkUsAdmin(message, user = message.data.participant) {
    var grup = await message.client.groupMetadata(message.jid);
    var sonuc = grup['participants'].map((member) => {     
        if (member.jid.split("@")[0] == user.split("@")[0] && member.isAdmin) return true; else; return false;
    });
    return sonuc.includes(true);
}
async function checkImAdmin(message, user = message.client.user.jid) {
    var grup = await message.client.groupMetadata(message.jid);
    var sonuc = grup['participants'].map((member) => {     
        if (member.jid.split("@")[0] == user.split("@")[0] && member.isAdmin) return true; else; return false;
    });
    return sonuc.includes(true);
}

    XcriptX.addCommand({pattern: 'welcome$', fromMe: false,}, (async (message, match) => {
    var us = await checkUsAdmin(message);
    if (!us) return await message.client.sendMessage(message.jid,'You are not An Admin, Do not Try again you will be ban' ,MessageType.text ,{quoted: message.data });
    var hg = await sql.getMessage(message.jid);
    if (hg === false) {
        await message.client.sendMessage(message.jid,"*You don't set the welcome message yet.!*\n**To set:** ```.welcome hi && hi#how are you?```",MessageType.text);
    } else {
        await message.client.sendMessage(message.jid,"*✅ Welcome message already set!*\n*Message:* ```" + hg.message + '```',MessageType.text);
    }
}));

XcriptX.addCommand({pattern: 'welcome (.*)', fromMe: false, dontAddCommandList: true}, (async (message, match) => {
    var us = await checkUsAdmin(message);
    if (!us) return await message.client.sendMessage(message.jid,'You are not An Admin, Do not Try again you will be ban',MessageType.text ,{quoted: message.data });
    if (match[1] === '') {
        return await message.client.sendMessage(message.jid,"*You must write a message to set up the welcome message.*\n*Example:* ```.welcome hi && hi#how are you?```");
    } else {
        if (match[1] === 'delete') { await message.client.sendMessage(message.jid,"*✅ Welcome message has been deleted successfully!*",MessageType.text); return await sql.deleteMessage(message.jid, 'welcome'); }
        await sql.setMessage(message.jid, 'welcome', match[1].replace(/#/g, '\n'));
        return await message.client.sendMessage(message.jid,"*✅ Welcome message has been set successfully!*",MessageType.text)
    }
}));

XcriptX.addCommand({pattern: 'goodbye$', fromMe: false,}, (async (message, match) => {
    var us = await checkUsAdmin(message);
    if (!us) return await message.client.sendMessage(message.jid,'You are not An Admin, Do not Try again you will be ban',MessageType.text ,{quoted: message.data });
    var hg = await sql.getMessage(message.jid, 'goodbye');
    if (hg === false) {
        await message.client.sendMessage(message.jid,"*You didn't set a goodbye message!*",MessageType.text)
    } else {
        await message.client.sendMessage(message.jid,"*✅ Goodbye message has been set!*" + hg.message + '```',MessageType.text);
    }
}));

XcriptX.addCommand({pattern: 'goodbye (.*)', fromMe: false, dontAddCommandList: true}, (async (message, match) => {
    var us = await checkUsAdmin(message);
    if (!us) return await message.client.sendMessage(message.jid,'You are not An Admin, Do not Try again you will be ban',MessageType.text ,{quoted: message.data });
    if (match[1] === '') {
        return await message.client.sendMessage(message.jid,'*You must write a message to set up the goodbye message.*',MessageType.text);
    } else {
        if (match[1] === 'delete') { await message.client.sendMessage(message.jid,'*✅ Goodbye message has been deleted successfully!*',MessageType.text); return await sql.deleteMessage(message.jid, 'goodbye'); }
        await sql.setMessage(message.jid, 'goodbye', match[1].replace(/#/g, '\n'));
        return await message.client.sendMessage(message.jid,'*✅ Goodbye message has been setted successfully!*',MessageType.text)
    }
}));
}
