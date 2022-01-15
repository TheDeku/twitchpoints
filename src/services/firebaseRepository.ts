import { database } from 'firebase-admin'
import { v4 as uuidv4 } from 'uuid'

export async function saveNotification(data: any) {
    let db = database()
    let buttonsChannel: any[] = []

    await db
        .ref()
        .child('buttons/info')
        .get()
        .then(snap => {
            if (snap.exists()) {
                buttonsChannel = snap.val()
                // if (buttonsChannel.length === 0) {
                //     buttonsChannel.push({ uuid: data.event.reward.id, name: data.event.reward.title })
                // }
                for (const button of buttonsChannel) {
                    if (button.uuid === data.event.reward.id) {
                        button.name = data.event.reward.title
                    }
                }
            }
            let notifications = buttonsChannel.filter(e => {
                return e.uuid === data.event.reward.id 
            })
            if (notifications.length === 0) {
                buttonsChannel.push({ uuid: data.event.reward.id, name: data.event.reward.title })
            }
            db.ref('buttons/info').set(buttonsChannel)
        })
}
export async function pushNotification(data: any) {
    let db = database()
    let events: any[] = []
    await db
        .ref()
        .child('buttons/notifications')
        .get()
        .then(snap => {
            if (snap.exists()) {
                events = snap.val()
            }
        })
    events.push({ uuid: uuidv4(), data: data, launched: false })

    db.ref('buttons/notifications').set(events)
}

export async function cleanChat() {
    let db = database()
    db
        .ref()
        .child(`chat`).set(null, error =>{
            if (error) {
                console.log('Data could not be removed.' + error);
            }else{
                console.log('Data removed successfully.');
            }
        })
}
