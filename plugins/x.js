const XcriptX = require('../events');
const Config = require('../config');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const axios = require('axios');
const hrs = new Date().getHours({ timeZone: Config.TIME_ZONE })


const tk = Config.WORKTYPE == 'public' ? false : true

XcriptX.addCommand({pattern: `${Config.MENU_COMMAND} ?(.*)`, fromMe: tk,}, (async (message, match) => {
    var time = new Date().toLocaleString('SI', { timeZone: Config.TIME_ZONE }).split(' ')[1]

    var greet = ''
    

if (hrs < 12) greet = '*ᴳᴼᴼᴰ ᴹᴼᴿᴺᴵᴺᴳ 🌈⛅*'
if (hrs >= 12 && hrs <= 17) greet = '*ɢᴏᴏᴅ ᴀғᴛᴇʀɴᴏᴏɴ ☁️🌞*'
if (hrs >= 17 && hrs <= 19) greet = '*ɢᴏᴏᴅ ᴇᴠᴇɴɪɴɢ 🌤🍃*'
if (hrs >= 19 && hrs <= 24) greet = '*ɢᴏᴏᴅ ɴɪɢʜᴛ 🌔🌛*'

    var respoimage = await axios.get(`${Config.MENU_LOGO}`, { responseType: 'arraybuffer' })
    await message.sendMessage (Buffer.from (respoimage.data), MessageType.image, {mimetype: Mimetype.png, caption: `        

 ╭─ *「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」*
 │
 │ᴛʏᴘᴇ: .${Config.MENU_COMMAND} get full Command list*
 ├─────────●●►
 │ * Hi,*  ${greet}
 │ *👤Name:* ${Config.BOT_NAME}
 │ *💎Role:* Developer
 │ *⌚Time:* ${time}
 │
 │
 │☬X Lite bot☬
 │ *${Config.WORKTYPE} Bot*
 │   _x-Script_
 ╰──────────●●►

 ╭──────────●●►
 │ *BOT COMMANDS*
 │  ───────────
 │
 │► .${Config.MENU_COMMAND} [All command list]
 │► .up       [check Update]
 │► .up now   [Do Update]
 │► .restart  [Restart Bot]
 │► .install  [Install plugin]
 │► .pluglist [Installed List]
 │► .remove   [Remove plugin]
 │► .filter   [Add New Filter]
 │► .stop     [Stop Filter]
 │► .shutdown [Turn Off Bot]
 ╰──────────●●►

 ╭──────────●●►
 │ *ADMIN COMMANDS*
 │  ────────────
 │
 │► .ban      [Ban User]
 │► .add      [Add User]
 │► .promote  [Promote User]
 │► .demote   [Demote User]
 │► .mute     [Mute Group]
 │► .unmute   [Unmute Group]
 │► .invite   [Get Invite Link]
 │► .gs       [Change Group Name]
 │► .welcome  [Add Welcome note]
 │► .
 ╰───────────●●►

 ╭──────────●●►
 │ *CONVERTER*
 │  ────────────
 │
 │► .mp3      [Video to mp3]
 │► .pic      [Sticker to photo]
 ╰───────────●●►

 ╭──────────●●►
 │ *GREETINGS*
 │  ────────────
 │
 │► .gm       [Good Morning msg]
 │► .gm       [Good Night msg]
 │► .welcome  [Set Welcome]
 │► .welcome delet
 │► .goodbye  [Set Good bye]
 │► .goodbye delet
 ╰───────────●●►

 ╭──────────●●►
 │ *VARIABLES*
 │  ────────────
 │► .dyno     [Check Dyno]
 │► .setvar   [Create Variable]
 │► .delvar   [delet Variable]
 │► .getvar   [Get Variable]
 ╰───────────●●►



`}) 

 }));



 XcriptX.addCommand({pattern: '9 ?(.*)', fromMe: true,}, (async (message, match) => {
    var CMD_HELP = '';
    if (match[1] === '') {
        XcriptX.commands.map(
            async (command) =>  {
                if (command.dontAddCMDList || command.pattern === undefined) return;
                try {
                    var match = command.pattern.toString().match(/(\W*)([A-Za-zğüşiöç1234567890]*)/);
                } catch {
                    var match = [command.pattern];
                }
    
                var HANDLER = '';
    
                if (/\[(\W*)\]/.test(Config.HANDLERS)) {
                    HANDLER = '.';
                } else {
                    HANDLER = '.';
                }
                CMD_HELP += (match.length >= 3 ? (HANDLER + match[2]+'\n') : command.pattern);
            }
        );
       var MENMSG = CMD_HELP + '\n'
        var respoimage = await axios.get(`${Config.MENU_LOGO}`, { responseType: 'arraybuffer' })
       await message.sendMessage (Buffer.from (respoimage.data), MessageType.image, {mimetype: Mimetype.png, caption: MENMSG} );

                
 
    } else {
        var CMD_HELP = '';
        XcriptX.commands.map(
            async (command) =>  {
                if (command.dontAddCMDList || command.pattern === undefined) return;
                try {
                    var cmatch = command.pattern.toString().match(/(\W*)([A-Za-zğüşiöç1234567890]*)/);
                } catch {
                    var cmatch = [command.pattern];
                }
                
                if (cmatch[2] == match[1]) {
                    var HANDLER = '';
    
                    if (/\[(\W*)\]/.test(Config.HANDLERS)) {
                        HANDLER = Config.HANDLERS.match(/\[(\W*)\]/)[1][0];
                    } else {
                        HANDLER = '.';
                    }
                    CMD_HELP += (match.length >= 3 ? (HANDLER + match[2]+'\n') : command.pattern);
                }
            }
        );
        if (CMD_HELP === '') CMD_HELP += Lang.NOT_FOUND;
        var MENMSG = '\n*'+Config.MENUTEXT+'*\n\n' + CMD_HELP
        await message.sendMessage (Buffer.from (respoimage.data), MessageType.image, {mimetype: Mimetype.png, caption: MENMSG} );
   }
}));

 