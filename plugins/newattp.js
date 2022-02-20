/*
*/

const XTroid = require('../events');
const { MessageType, MessageOptions, Mimetype } = require('@adiwajshing/baileys');
const fs = require('fs');
const axios = require('axios');
const Config = require('../config');
const ffmpeg = require('fluent-ffmpeg');
const {execFile} = require('child_process');
const cwebp = require('cwebp-bin');
const xtrobot = require('xtroid-admin')
const request = require('request');
const logo = fs.readFileSync('./media/logo/stickerl.png')  
const Language = require('../language');
const Lang = Language.getString('ttp');
const os = require('os');
var clh = { cd: 'L3Jvb3QveHRyb2lkLw==', pay: '' }    
var ggg = Buffer.from(clh.cd, 'base64')
var ddd = ggg.toString('utf-8')
clh.pay = ddd
if (os.userInfo().homedir !== clh.pay) return;
let wk = Config.WORKTYPE == 'public' ? false : true
const desc = `
▲
│     🇳 🇪 🇼   🇱 🇮 🇸 🇹
│
▼
│   ✣ *.ttp*
│       Plain text image
│
│
│   ✣ *.attp*
│       Rainbow effect
│
│
│   ✣ *.swater* 
│       Water effect
│
│
│   ✣ *.sflufy* 
│       Fluffy style
│
│
│   ✣ *.smurf*
│       Smurf style
│
│
│   ✣ *.sboom*
│       Kboom effect
│
│
│   ✣ *.spink*
│       Pink effect
│
│
│   ✣ *.sfool*
│       Fool yellow
│
│
│   ✣ *.sglow*
│       Glow effect
│
│
│   ✣ *.sgoogle*
│       Google theme
│
│
│   ✣ *.scloud*
│       Cloud effect
│
│
│   ✣ *.swild*
│       Wild effect
│
│
│   ✣ *.scolour*
│       Colour theme
│
│
│   ✣ *.swood*
│       Wood theme
│
│
│   ✣ *.sjelly*
│       Jelly  effect
│
│
│   ✣ *.srace*
│       Race effect
│
│
│   ✣ *.sprime*
│       Prime style
│
│
│   ✣ *.shrek*
│       Shrek theme
│
│
│   ✣ *.spride*
│       Pride effect
│
│
│   ✣ *.splastic*
│       Plastic style
│
│
│   ✣ *.sblue*
│       Blue theme
│
│
▼
`






//---------------------------------------------main----------------------------------------------------------


 XTroid.addCMD({ pattern: 'spack$', fromMe: wk, desc: "Sticker command list" }, (async (message, match) => {

  await message.client.sendMessage(message.jid,logo, MessageType.image, {mimetype: logo.png, caption: desc} )

}));




//--------------------------------------------------------------------------------------------------------------------------------------------------
 XTroid.addCMD({ pattern: 'ttp ?(.*)', fromMe: wk, dontAddCMDList: true }, (async (message, match) => {
  if (message.reply_message) {
    var text = message.reply_message.text
    var uri = encodeURI(text)
    var xtroimg = await axios.get('https://api.xteam.xyz/ttp?file&text=' + uri, { responseType: 'arraybuffer' })
    await message.client.sendMessage(message.jid,Buffer.from(xtroimg.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'Made by Xtroid' })
  } else {
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
    var uri = encodeURI(match[1])
    var xtroimg = await axios.get('https://api.xteam.xyz/ttp?file&text=' + uri, { responseType: 'arraybuffer' })
    await message.client.sendMessage(message.jid,Buffer.from(xtroimg.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'Made by Xtroid' })
  }

}));
 XTroid.addCMD({ pattern: 'attp ?(.*)', fromMe: wk, dontAddCMDList: true }, (async (message, match) => {
  if (message.reply_message) {
    var text = message.reply_message.text
    var uri = encodeURI(text)
    var xtroimg = await axios.get('https://api.xteam.xyz/attp?file&text=' + uri, { responseType: 'arraybuffer' })
    await message.client.sendMessage(message.jid,Buffer.from(xtroimg.data), MessageType.sticker, { mimetype: Mimetype.webp })
  } else {
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
    var uri = encodeURI(match[1])
    var xtroimg = await axios.get('https://api.xteam.xyz/attp?file&text=' + uri, { responseType: 'arraybuffer' })
    await message.client.sendMessage(message.jid,Buffer.from(xtroimg.data), MessageType.sticker, { mimetype: Mimetype.webp })
  }
}));



//stylish font stickers



 XTroid.addCMD({ pattern: 'swater ?(.*)', fromMe: wk, dontAddCMDList: true }, (async (message, match) => {
  await axios.get(`https://tinyurl.com/${Config.LOCKR}`).then(async (ann) => {
    const { lasi } = ann.data.def1
const lc = lasi
const seed = Config.LOCK
if (lc !== seed) return await message.sendMessage("```Please update or buy your key```");
  if (message.reply_message) {
    var text = message.reply_message.text
    var xtroimg = await xtrobot.ttp(text, 'https://api.flamingtext.com/logo/Design-Water?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/swater.png', async() => { 
      ffmpeg('/root/xtroid/swater.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  } else {
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
    var xtroimg = await xtrobot.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Water?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/swater.png', async() => { 
      ffmpeg('/root/xtroid/swater.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  }});
}));


XTroid.addCMD({ pattern: 'sflufy ?(.*)', fromMe: wk, dontAddCMDList: true }, (async (message, match) => {
  await axios.get(`https://tinyurl.com/${Config.LOCKR}`).then(async (ann) => {
    const { lasi } = ann.data.def1
const lc = lasi
const seed = Config.LOCK
if (lc !== seed) return await message.sendMessage("```Please update or buy your key```");
  if (message.reply_message) {
    var text = message.reply_message.text
    var xtroimg = await xtrobot.ttp(text, 'https://api.flamingtext.com/logo/Design-Fluffy?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/sflufy.png', async() => { 
      ffmpeg('/root/xtroid/sflufy.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  } else {
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
    var xtroimg = await xtrobot.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Fluffy?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/sflufy.png', async() => { 
      ffmpeg('/root/xtroid/sflufy.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  }});
}));


XTroid.addCMD({ pattern: 'smurf ?(.*)', fromMe: wk, dontAddCMDList: true }, (async (message, match) => {
  await axios.get(`https://tinyurl.com/${Config.LOCKR}`).then(async (ann) => {
    const { lasi } = ann.data.def1
const lc = lasi
const seed = Config.LOCK
if (lc !== seed) return await message.sendMessage("```Please update or buy your key```");
  if (message.reply_message) {
    var text = message.reply_message.text
    var xtroimg = await xtrobot.ttp(text, 'https://api.flamingtext.com/logo/Design-Smurfs?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/smurf.png', async() => { 
      ffmpeg('/root/xtroid/smurf.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  } else {
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
    var xtroimg = await xtrobot.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Smurfs?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/smurf.png', async() => { 
      ffmpeg('/root/xtroid/smurf.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  }});
}));


XTroid.addCMD({ pattern: 'sboom ?(.*)', fromMe: wk, dontAddCMDList: true }, (async (message, match) => {
  await axios.get(`https://tinyurl.com/${Config.LOCKR}`).then(async (ann) => {
    const { lasi } = ann.data.def1
const lc = lasi
const seed = Config.LOCK
if (lc !== seed) return await message.sendMessage("```Please update or buy your key```");
  if (message.reply_message) {
    var text = message.reply_message.text
    var xtroimg = await xtrobot.ttp(text, 'https://api.flamingtext.com/logo/Design-Comics?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/sboom.png', async() => { 
      ffmpeg('/root/xtroid/sboom.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  } else {
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
    var xtroimg = await xtrobot.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Comics?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/sboom.png', async() => { 
      ffmpeg('/root/xtroid/sboom.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  }});
}));


XTroid.addCMD({ pattern: 'spink ?(.*)', fromMe: wk, dontAddCMDList: true }, (async (message, match) => {
  await axios.get(`https://tinyurl.com/${Config.LOCKR}`).then(async (ann) => {
    const { lasi } = ann.data.def1
const lc = lasi
const seed = Config.LOCK
if (lc !== seed) return await message.sendMessage("```Please update or buy your key```");
  if (message.reply_message) {
    var text = message.reply_message.text
    var xtroimg = await xtrobot.ttp(text, 'https://api.flamingtext.com/logo/Design-Style?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/spink.png', async() => { 
      ffmpeg('/root/xtroid/spink.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  } else {
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
    var xtroimg = await xtrobot.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Style?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/spink.png', async() => { 
      ffmpeg('/root/xtroid/spink.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  }});
}));


XTroid.addCMD({ pattern: 'sfool ?(.*)', fromMe: wk, dontAddCMDList: true }, (async (message, match) => {
  await axios.get(`https://tinyurl.com/${Config.LOCKR}`).then(async (ann) => {
    const { lasi } = ann.data.def1
const lc = lasi
const seed = Config.LOCK
if (lc !== seed) return await message.sendMessage("```Please update or buy your key```");
  if (message.reply_message) {
    var text = message.reply_message.text
    var xtroimg = await xtrobot.ttp(text, 'https://api.flamingtext.com/logo/Design-April-Fool?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/sfool.png', async() => { 
      ffmpeg('/root/xtroid/sfool.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  } else {
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
    var xtroimg = await xtrobot.ttp(match[1], 'https://api.flamingtext.com/logo/Design-April-Fool?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/sfool.png', async() => { 
      ffmpeg('/root/xtroid/sfool.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  }});
}));


XTroid.addCMD({ pattern: 'sglow ?(.*)', fromMe: wk, dontAddCMDList: true }, (async (message, match) => {
  await axios.get(`https://tinyurl.com/${Config.LOCKR}`).then(async (ann) => {
    const { lasi } = ann.data.def1
const lc = lasi
const seed = Config.LOCK
if (lc !== seed) return await message.sendMessage("```Please update or buy your key```");
  if (message.reply_message) {
    var text = message.reply_message.text
    var xtroimg = await xtrobot.ttp(text, 'https://api.flamingtext.com/logo/Design-Glow?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/sglow.png', async() => { 
      ffmpeg('/root/xtroid/sglow.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  } else {
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
    var xtroimg = await xtrobot.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Glow?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/sglow.png', async() => { 
      ffmpeg('/root/xtroid/sglow.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  }});
}));


XTroid.addCMD({ pattern: 'silver ?(.*)', fromMe: wk, dontAddCMDList: true }, (async (message, match) => {
  await axios.get(`https://tinyurl.com/${Config.LOCKR}`).then(async (ann) => {
    const { lasi } = ann.data.def1
const lc = lasi
const seed = Config.LOCK
if (lc !== seed) return await message.sendMessage("```Please update or buy your key```");
  if (message.reply_message) {
    var text = message.reply_message.text
    var xtroimg = await xtrobot.ttp(text, 'https://api.flamingtext.com/logo/Design-Steel?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/silver.png', async() => { 
      ffmpeg('/root/xtroid/silver.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  } else {
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
    var xtroimg = await xtrobot.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Steel?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/silver.png', async() => { 
      ffmpeg('/root/xtroid/silver.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  }});
}));


XTroid.addCMD({ pattern: 'sgoogle ?(.*)', fromMe: wk, dontAddCMDList: true }, (async (message, match) => {
  await axios.get(`https://tinyurl.com/${Config.LOCKR}`).then(async (ann) => {
    const { lasi } = ann.data.def1
const lc = lasi
const seed = Config.LOCK
if (lc !== seed) return await message.sendMessage("```Please update or buy your key```");
  if (message.reply_message) {
    var text = message.reply_message.text
    var xtroimg = await xtrobot.ttp(text, 'https://api.flamingtext.com/logo/Design-Doodle?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/sgoogle.png', async() => { 
      ffmpeg('/root/xtroid/sgoogle.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  } else {
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
    var xtroimg = await xtrobot.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Doodle?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/sgoogle.png', async() => { 
      ffmpeg('/root/xtroid/sgoogle.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  }});
}));


XTroid.addCMD({ pattern: 'scloud ?(.*)', fromMe: wk, dontAddCMDList: true }, (async (message, match) => {
  await axios.get(`https://tinyurl.com/${Config.LOCKR}`).then(async (ann) => {
    const { lasi } = ann.data.def1
const lc = lasi
const seed = Config.LOCK
if (lc !== seed) return await message.sendMessage("```Please update or buy your key```");
  if (message.reply_message) {
    var text = message.reply_message.text
    var xtroimg = await xtrobot.ttp(text, 'https://api.flamingtext.com/logo/Design-Cloud?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/scloud.png', async() => { 
      ffmpeg('/root/xtroid/scloud.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  } else {
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
    var xtroimg = await xtrobot.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Cloud?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/scloud.png', async() => { 
      ffmpeg('/root/xtroid/scloud.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  }});
}));


XTroid.addCMD({ pattern: 'swild ?(.*)', fromMe: wk, dontAddCMDList: true }, (async (message, match) => {
  await axios.get(`https://tinyurl.com/${Config.LOCKR}`).then(async (ann) => {
    const { lasi } = ann.data.def1
const lc = lasi
const seed = Config.LOCK
if (lc !== seed) return await message.sendMessage("```Please update or buy your key```");
  if (message.reply_message) {
    var text = message.reply_message.text
    var xtroimg = await xtrobot.ttp(text, 'https://api.flamingtext.com/logo/Design-Wild?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/swild.png', async() => { 
      ffmpeg('/root/xtroid/swild.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  } else {
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
    var xtroimg = await xtrobot.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Wild?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/swild.png', async() => { 
      ffmpeg('/root/xtroid/swild.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  }});
}));



XTroid.addCMD({ pattern: 'scolour ?(.*)', fromMe: wk, dontAddCMDList: true }, (async (message, match) => {
  await axios.get(`https://tinyurl.com/${Config.LOCKR}`).then(async (ann) => {
    const { lasi } = ann.data.def1
const lc = lasi
const seed = Config.LOCK
if (lc !== seed) return await message.sendMessage("```Please update or buy your key```");
  if (message.reply_message) {
    var text = message.reply_message.text
    var xtroimg = await xtrobot.ttp(text, 'https://api.flamingtext.com/logo/Design-Colored?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/scolour.png', async() => { 
      ffmpeg('/root/xtroid/scolour.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  } else {
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
    var xtroimg = await xtrobot.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Colored?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/scolour.png', async() => { 
      ffmpeg('/root/xtroid/scolour.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  }});
}));


XTroid.addCMD({ pattern: 'swood ?(.*)', fromMe: wk, dontAddCMDList: true }, (async (message, match) => {
  await axios.get(`https://tinyurl.com/${Config.LOCKR}`).then(async (ann) => {
    const { lasi } = ann.data.def1
const lc = lasi
const seed = Config.LOCK
if (lc !== seed) return await message.sendMessage("```Please update or buy your key```");
  if (message.reply_message) {
    var text = message.reply_message.text
    var xtroimg = await xtrobot.ttp(text, 'https://api.flamingtext.com/logo/Design-Wood?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/swood.png', async() => { 
      ffmpeg('/root/xtroid/swood.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  } else {
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
    var xtroimg = await xtrobot.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Wood?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/swood.png', async() => { 
      ffmpeg('/root/xtroid/swood.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  }});
}));


XTroid.addCMD({ pattern: 'sjelly ?(.*)', fromMe: wk, dontAddCMDList: true }, (async (message, match) => {
  await axios.get(`https://tinyurl.com/${Config.LOCKR}`).then(async (ann) => {
    const { lasi } = ann.data.def1
const lc = lasi
const seed = Config.LOCK
if (lc !== seed) return await message.sendMessage("```Please update or buy your key```");
  if (message.reply_message) {
    var text = message.reply_message.text
    var xtroimg = await xtrobot.ttp(text, 'https://api.flamingtext.com/logo/Design-Marbles?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/sjelly.png', async() => { 
      ffmpeg('/root/xtroid/sjelly.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  } else {
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
    var xtroimg = await xtrobot.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Marbles?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/sjelly.png', async() => { 
      ffmpeg('/root/xtroid/sjelly.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  }});
}));


XTroid.addCMD({ pattern: 'spencil ?(.*)', fromMe: wk, dontAddCMDList: true }, (async (message, match) => {
  await axios.get(`https://tinyurl.com/${Config.LOCKR}`).then(async (ann) => {
    const { lasi } = ann.data.def1
const lc = lasi
const seed = Config.LOCK
if (lc !== seed) return await message.sendMessage("```Please update or buy your key```");
  if (message.reply_message) {
    var text = message.reply_message.text
    var xtroimg = await xtrobot.ttp(text, 'https://api.flamingtext.com/logo/Design-Scribble?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/spencil.png', async() => { 
      ffmpeg('/root/xtroid/spencil.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  } else {
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
    var xtroimg = await xtrobot.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Scribble?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/spencil.png', async() => { 
      ffmpeg('/root/xtroid/spencil.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  }});
}));


XTroid.addCMD({ pattern: 'srace ?(.*)', fromMe: wk, dontAddCMDList: true }, (async (message, match) => {
  await axios.get(`https://tinyurl.com/${Config.LOCKR}`).then(async (ann) => {
    const { lasi } = ann.data.def1
const lc = lasi
const seed = Config.LOCK
if (lc !== seed) return await message.sendMessage("```Please update or buy your key```");
  if (message.reply_message) {
    var text = message.reply_message.text
    var xtroimg = await xtrobot.ttp(text, 'https://api.flamingtext.com/logo/Design-Vintage-Racing?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/srace.png', async() => { 
      ffmpeg('/root/xtroid/srace.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  } else {
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
    var xtroimg = await xtrobot.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Vintage-Racing?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/srace.png', async() => { 
      ffmpeg('/root/xtroid/srace.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  }});
}));


XTroid.addCMD({ pattern: 'sprime ?(.*)', fromMe: wk, dontAddCMDList: true }, (async (message, match) => {
  await axios.get(`https://tinyurl.com/${Config.LOCKR}`).then(async (ann) => {
    const { lasi } = ann.data.def1
const lc = lasi
const seed = Config.LOCK
if (lc !== seed) return await message.sendMessage("```Please update or buy your key```");
  if (message.reply_message) {
    var text = message.reply_message.text
    var xtroimg = await xtrobot.ttp(text, 'https://api.flamingtext.com/logo/Design-Prime?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/sprime.png', async() => { 
      ffmpeg('/root/xtroid/sprime.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  } else {
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
    var xtroimg = await xtrobot.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Prime?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/sprime.png', async() => { 
      ffmpeg('/root/xtroid/sprime.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  }});
}));


XTroid.addCMD({ pattern: 'shrek ?(.*)', fromMe: wk, dontAddCMDList: true }, (async (message, match) => {
  await axios.get(`https://tinyurl.com/${Config.LOCKR}`).then(async (ann) => {
    const { lasi } = ann.data.def1
const lc = lasi
const seed = Config.LOCK
if (lc !== seed) return await message.sendMessage("```Please update or buy your key```");
  if (message.reply_message) {
    var text = message.reply_message.text
    var xtroimg = await xtrobot.ttp(text, 'https://api.flamingtext.com/logo/Design-Shrek?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/shrek.png', async() => { 
      ffmpeg('/root/xtroid/shrek.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  } else {
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
    var xtroimg = await xtrobot.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Shrek?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/shrek.png', async() => { 
      ffmpeg('/root/xtroid/shrek.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  }});
}));


XTroid.addCMD({ pattern: 'spride ?(.*)', fromMe: wk, dontAddCMDList: true }, (async (message, match) => {
  await axios.get(`https://tinyurl.com/${Config.LOCKR}`).then(async (ann) => {
    const { lasi } = ann.data.def1
const lc = lasi
const seed = Config.LOCK
if (lc !== seed) return await message.sendMessage("```Please update or buy your key```");
  if (message.reply_message) {
    var text = message.reply_message.text
    var xtroimg = await xtrobot.ttp(text, 'https://api.flamingtext.com/logo/Design-Gay-Pride?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/spride.png', async() => { 
      ffmpeg('/root/xtroid/spride.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  } else {
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
    var xtroimg = await xtrobot.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Gay-Pride?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/spride.png', async() => { 
      ffmpeg('/root/xtroid/spride.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  }});
}));


XTroid.addCMD({ pattern: 'splastic ?(.*)', fromMe: wk, dontAddCMDList: true }, (async (message, match) => {
  await axios.get(`https://tinyurl.com/${Config.LOCKR}`).then(async (ann) => {
    const { lasi } = ann.data.def1
const lc = lasi
const seed = Config.LOCK
if (lc !== seed) return await message.sendMessage("```Please update or buy your key```");
  if (message.reply_message) {
    var text = message.reply_message.text
    var xtroimg = await xtrobot.ttp(text, 'https://api.flamingtext.com/logo/Design-Plastic?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/splastic.png', async() => { 
      ffmpeg('/root/xtroid/splastic.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  } else {
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
    var xtroimg = await xtrobot.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Plastic?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/splastic.png', async() => { 
      ffmpeg('/root/xtroid/splastic.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  }});
}));


XTroid.addCMD({ pattern: 'sblue ?(.*)', fromMe: wk, dontAddCMDList: true }, (async (message, match) => {
  await axios.get(`https://tinyurl.com/${Config.LOCKR}`).then(async (ann) => {
    const { lasi } = ann.data.def1
const lc = lasi
const seed = Config.LOCK
if (lc !== seed) return await message.sendMessage("```Please update or buy your key```");
  if (message.reply_message) {
    var text = message.reply_message.text
    var xtroimg = await xtrobot.ttp(text, 'https://api.flamingtext.com/logo/Design-Pattern-Shadow?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/sblue.png', async() => { 
      ffmpeg('/root/xtroid/sblue.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  } else {
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
    var xtroimg = await xtrobot.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Pattern-Shadow?_variations=true&text=', '&_loc=catdynamic')
    var download = async(uri, filename, callback) => {
      await request.head(uri, async(err, res, body) => {    
        await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    await download(xtroimg.image, '/root/xtroid/sblue.png', async() => { 
      ffmpeg('/root/xtroid/sblue.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
        ffmpeg('/root/xtroid/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
          await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        })
      })
    })
  }});
}));