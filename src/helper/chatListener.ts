import { database } from 'firebase-admin'
import * as fs from 'fs'
import { date } from 'joi'
import moment from 'moment'
import { client } from './configuration'

const pathFiles = '/Users/deku/Development/twitchbot/src/files/'
export async function twitchbot() {

    try {
        client.on('message', (channel, tags, message, self) => {
            console.log(`${tags.username} ${tags.subscriber} ${JSON.stringify(tags.badges)} ${message}`)
            let wordList = message.toLowerCase().split(' ')
            let messageToSend: string
            // let folderUser = `${pathFiles}${tags['room-id']}/`
            // try {
            //     if (!fs.existsSync(folderUser)) {
            //         fs.mkdirSync(folderUser)
            //     }
            // } catch (err) {
            //     console.error(err)
            // }

            if (tags.subscriber) {
                // let folderType = `${folderUser}/suscribers/`
                let path = `${tags['room-id']}/suscribers`
                saveText(path, tags, message)
                // procesText(folderType, tags, message)
                
            } else {
                if (tags.badges !== null) {
                    if (tags.badges.vip === '1') {
                        // let folderType = `${folderUser}/vips/`
                        // procesText(folderType, tags, message)
                        let path = `${tags['room-id']}/vips`
                        saveText(path, tags, message)
                    } else if (tags.badges.moderator === '1') {
                        // let folderType = `${folderUser}/moderators/`
                        // procesText(folderType, tags, message)
                        let path = `${tags['room-id']}/moderators`
                        saveText(path, tags, message)
                    } else if (tags.badges.premium === '1') {
                        // let folderType = `${folderUser}/premium/`
                        // procesText(folderType, tags, message)
                        let path = `${tags['room-id']}/premium`
                        saveText(path, tags, message)
                    }
                } else {
                    // let folderType = `${folderUser}/general/`
                    // procesText(folderType, tags, message)
                    let path = `${tags['room-id']}/general`
                    saveText(path, tags, message)
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}

function procesText(path: string, tag: any, message: any) {
    try {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path)
        }
    } catch (err) {
        console.error(err)
    }
    try {
        if (fs.existsSync(`${path}${moment().format('YYYY-MM-DD')}.json`)) {
            let messagesString = fs.readFileSync(`${path}${moment().format('YYYY-MM-DD')}.json`, { encoding: 'utf-8' })
            let arrayMessags: any[] = JSON.parse(messagesString)
            arrayMessags.push({ user: tag.username, message: message })
            fs.writeFileSync(`${path}${moment().format('YYYY-MM-DD')}.json`, JSON.stringify(arrayMessags))
        } else {
            let savedChat = [{ user: tag.username, message: message }]
            let saveStringChat = JSON.stringify(savedChat)
            fs.writeFileSync(`${path}${moment().format('YYYY-MM-DD')}.json`, saveStringChat)
        }
    } catch (error) {
        console.log(error)
    }
}

async function saveText(path: string, tag: any, message: any) {
    let db = database()
    let arrayMessags: any[] = [];
    await db
        .ref()
        .child(`chat/${moment().format('YYYY-MM-DD')}/${path}`)
        .get().then(snap =>{
            if (snap.val() !== null) {
                arrayMessags = snap.val();
            }
        })
   
    arrayMessags.push({ user: tag.username, message: message })
    db.ref(`chat/${moment().format('YYYY-MM-DD')}/${path}`).set(arrayMessags)
 }
