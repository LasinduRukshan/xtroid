
const XcriptX = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const sql = require('./sql/greetings');
const hed = "*🔰 Group Rules 🔰* \n\n"
const pw = "◄XCript Protection►"

XcriptX.addCommand({pattern: 'rules', fromMe: true,}, (async (message, match) => {
    var rg = await sql.getMessage(message.jid, 'rule');
    if (rg === false) {
        await message.client.sendMessage(message.jid,"Rules not setted yet",MessageType.text)
    } else {
        await message.client.sendMessage(message.jid,hed + rg.message + '\n\n' + pw,MessageType.text);
    }
}));

XcriptX.addCommand({pattern: 'newrules (.*)', fromMe: true,}, (async (message, match) => {
    if (match[1] === '') {
        return await message.client.sendMessage(message.jid,"Need some text about rules",MessageType.text);
    } else {
        if (match[1] === 'delete') { await message.client.sendMessage(message.jid,"Group rules deleted",MessageType.text); return await sql.deleteMessage(message.jid, 'rule'); }
        await sql.setMessage(message.jid, 'rule', match[1].replace(/#/g, '\n'));
        return await message.client.sendMessage(message.jid,"New rules added to the group",MessageType.text)
    }
}));

XcriptX.addCommand({pattern: 'rules', fromMe: false, dontAddCommandList: true}, (async (message, match) => {
    var rg = await sql.getMessage(message.jid, 'rule');
    if (rg === false) {
        await message.client.sendMessage(message.jid,"Rules not setted yet",MessageType.text)
    } else {
        await message.client.sendMessage(message.jid,hed + rg.message + '\n\n' + pw,MessageType.text);
    }
}));

XcriptX.addCommand({pattern: 'newrules (.*)', fromMe: false, dontAddCommandList: true}, (async (message, match) => {
	await message.sendMessage("Only Admins can Set Rules in this Group.")
}));
