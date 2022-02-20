/* X-Script  */

const XcriptX = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const speedTest = require('@lh2020/speedtest-net');
const TinyURL = require('tinyurl');
const Config = require('../config');
const Language = require('../language');
const Lang = Language.getString('web');
const SLang = Language.getString('webss');

function speedText(speed) {
    let bits = speed * 8;
    const units = ['', 'K', 'M', 'G', 'T'];
    const places = [0, 1, 2, 3, 3];
    let unit = 0;
    while (bits >= 2000 && unit < 4) {
      unit++;
      bits /= 1000;
    }

    return `${bits.toFixed(places[unit])} ${units[unit]}bps`;
}

XcriptX.addCommand({pattern: 'speedtest', fromMe: true}, (async (message, match) => {
    var msg = await message.reply(Lang.SPEEDTESTING);
    var st = await speedTest({acceptLicense: true, acceptGdpr: true});
    
    await message.client.sendMessage(
      message.jid,Lang.SPEEDTEST_RESULT + '\n\n' + 
    '*ISP:* ```' + st.isp + '```\n' +
    '*Ping:* ```' + st.ping.latency + 'ms```\n' +
    '*' + Lang.UPLOAD + ':* ```' + speedText(st.upload.bandwidth) + '```\n' +
    '*' + Lang.DOWNLOAD + ':* ```' + speedText(st.download.bandwidth) + '```\n',MessageType.text
    );
    await msg.delete();
}));

XcriptX.addCommand({pattern: 'ping$', fromMe: true, deleteCommand: false,}, (async (message, match) => {
  var start = new Date().getTime();
  await message.sendMessage('```Ping!```');
  var end = new Date().getTime();

  await message.client.sendMessage(
    message.jid,'*Pong!*\n```' + (end - start) + 'ms```', MessageType.text, { quoted: message.data });
}));

