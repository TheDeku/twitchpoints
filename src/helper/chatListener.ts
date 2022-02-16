import { database } from 'firebase-admin'
import * as fs from 'fs'
import { date } from 'joi'
import moment from 'moment'
import { client } from './configuration'

const pathFiles = '/Users/deku/Development/twitchbot/src/files/'
const keys = ["relaxingcode","relaxingchatbot","!redes","!tula","!discord","!comandos"]
export async function twitchbot() {
    try {
        client.on('message', (channel, tags, message, self) => {
            console.log(`${tags.username} ${tags.subscriber} ${JSON.stringify(tags.badges)} ${message}`)
            if (!keys.includes(tags['display-name'])) {
                if (!keys.includes(message)) {
                    speechchat(message, tags);
                }
            }
            // if (tags['display-name']!="relaxingcode" && tags['display-name']!="relaxingchatbot") {
            //     speechchat(message, tags);
            // }
            commands(message, tags);

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

async function speechchat(message:string, tag:any){
    let db = database()
    let arrayMessags: any[] = []
    await db
        .ref()
        .child(`chatspeech`)
        .get()
        .then(snap => {
            if (snap.val() !== null) {
                arrayMessags = snap.val()
            }
        })

        arrayMessags.push({message:message, launched:false, date:moment().format("YYYY-MM-DD")})
        db.ref(`chatspeech`).set(arrayMessags)
 
    }


function commands(message: string, tag: any) {
    switch (message) {
        case '!redes':
            client.say('relaxingcode', `Redes sociales: https://linktr.ee/relaxingcode`)
            break
        case '!discord':
            client.say('relaxingcode', ` Discord: https://discord.gg/MExp3hyEk5`)
            break
        case '!tula':
            let numeroR = Math.floor(Math.random() * 30)
            client.say('relaxingcode', `@${tag.username}, Estimado usted tiene un miembro viril de ${numeroR} cm`)
            break
            case '!comandos':
                client.say('relaxingcode', `@${tag.username}, los comandos son !discord, !tula y !redes `)
                break

        default:
            break
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
    let arrayMessags: any[] = []
    await db
        .ref()
        .child(`chat/${moment().format('YYYY-MM-DD')}/${path}`)
        .get()
        .then(snap => {
            if (snap.val() !== null) {
                arrayMessags = snap.val()
            }
        })

    arrayMessags.push({ user: tag.username, message: message })
    db.ref(`chat/${moment().format('YYYY-MM-DD')}/${path}`).set(arrayMessags)
}
