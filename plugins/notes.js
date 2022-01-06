/* X-Script  */

const fs = require('fs/promises')
const path = require('path')
const { MessageType } = require('@adiwajshing/baileys')
const XcriptX = require('../events');
const { successfullMessage, errorMessage, infoMessage } = require('../helpers');
const NotesDB = require('./sql/notes');


XcriptX.addCommand({ pattern: 'notes', fromMe: true,}, async (message, match) => {


    const _notes = await NotesDB.getNotes()
    const notes = []
    _notes.map(note => {
        if (!note.note.includes('IMG;;;')) {
            notes.push('📜' + note.note)
        }
    })

    if (notes.length < 1) {
        return await message.sendMessage(infoMessage("No saved notes"))
    }

    await message.sendMessage(infoMessage("Note saved"))

    await message.sendMessage(notes.join('\n\n'))
    _notes.filter(note => note.note.includes('IMG;;;')).forEach(async (note) => {
        const imageName = note.note.replace('IMG;;;', '')
        const image = await fs.readFile(path.resolve('media', imageName))
        await message.sendMessage(image, MessageType.image)
    })


})



XcriptX.addCommand({ pattern: 'save ?(.*)', fromMe: true,}, async (message, match) => {

    const userNote = match[1]

    if (!userNote && !message.reply_message) {
        await message.sendMessage(errorMessage("Please provide a note or reply to a message."))

        return
    }

    if (userNote) {
        await NotesDB.saveNote(userNote)
        await message.sendMessage(successfullMessage("Successfully added new note, check your notes with .notes."), MessageType.text)

        return

    } else if (!userNote && message.reply_message) {
        if (!message.reply_message.video) {

            if (message.reply_message.image) {
                const savedFileName = await message.client.downloadAndSaveMediaMessage({
                    key: {
                        remoteJid: message.reply_message.jid,
                        id: message.reply_message.id
                    },
                    message: message.reply_message.data.quotedMessage
                })

                const randomFileName = savedFileName.split('.')[0] + Math.floor(Math.random() * 50) + path.extname(savedFileName)
                await fs.copyFile(savedFileName, path.resolve('media', randomFileName))
                await NotesDB.saveNote("IMG;;;" + randomFileName)
                await message.sendMessage(successfullMessage("Saved"), MessageType.text)


            }

            await NotesDB.saveNote(message.reply_message.text)
            await message.sendMessage(successfullMessage("Saved"), MessageType.text)

            return
        }
    } else {
        await message.sendMessage(errorMessage("Cant Save this"))

        return
    }
})

XcriptX.addCommand({ pattern: 'deleteNotes', fromMe: true,}, async (message, match) => {

    await NotesDB.deleteAllNotes()

    const mediaFolder = await fs.readdir(path.resolve('media'))

    mediaFolder.forEach(async (file) => {
        await fs.unlink(path.resolve('media', file))
    })

    return await message.sendMessage(successfullMessage("Notes deleted successfully"))
})
