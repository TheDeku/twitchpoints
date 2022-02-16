import { NextFunction, Request, Response } from 'express'
import { database } from 'firebase-admin'
import moment from 'moment'
import { client } from "../../helper/configuration"



export default class ChatController {
	public async listenChat(req: Request, res: Response, next:NextFunction) {
    client.say('relaxingcode', `${req.query.message}`)


    let db = database()
    let arrayMessags: any[] = []
    await db
        .ref()
        .child(`chatbot`)
        .get()
        .then(snap => {
            if (snap.val() !== null) {
                arrayMessags = snap.val()
            }
        })

        arrayMessags.push({message:req.query.message, launched:false, date:moment().format("YYYY-MM-DD")})
        db.ref(`chatbot`).set(arrayMessags)
        res.status(200).json({que:"queso"})
    }
}
