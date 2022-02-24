import axios from 'axios';
import { NextFunction, Request, Response } from 'express'
import { twitchbot } from '../../helper/chatListener';
import { initializeBot } from '../../helper/configuration';
import * as fs from 'fs';
import { credential, firestore, initializeApp, database } from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import { pushNotification, saveNotification } from '../../services/firebaseRepository';




export default class WebhooksController {
	public async webhookCallback(req: Request, res: Response, next:NextFunction) {

		console.log(req.body);
		if (req.body.challenge) {
			res.status(200).send(req.body.challenge)
		}else if (req.body) {
			// let db = database()
			// let events:any[] = [];
			// await db.ref().child("botones").get().then((snap) =>{
			// 	if (snap.exists()) {
			// 		events = snap.val();
			// 	}
			// })
			// events.push({uuid:uuidv4(),data:req.body,launched:false});

			// db.ref("botones").set(events)
			saveNotification(req.body);
			await pushNotification(req.body);
			res.status(200).send(req.body)
			// let folderData = "/Users/deku/Development/twitchbot/twitchAngular/twitch-angular/src/data"
			// let eventString = fs.readFileSync(`${folderData}/event.json`, { encoding: 'utf-8' })
			// let events:any[] = JSON.parse(eventString);
			// events.push({status:false,data:req.body.event})
			// fs.writeFileSync(`${folderData}/event.json`, JSON.stringify(events))
		

	
		}else{
			res.redirect("");
		}

	}




	public async getWebhooks(req: Request, res: Response, next:NextFunction){
		let url = `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_SECRET}&grant_type=client_credentials`
		console.log(url);
		let response = {data:"null"}
		try {
			let twitchClient = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_SECRET}&grant_type=client_credentials`, {})
			console.log(twitchClient.data.access_token);
			console.log(process.env.TWITCH_CLIENT_ID);
	
			response = await axios.get("https://api.twitch.tv/helix/eventsub/subscriptions", {
				headers: { 'content-Type': 'application/json',"Authorization": `Bearer ${twitchClient.data.access_token}`,"CLIENT-ID":process.env.TWITCH_CLIENT_ID }
			})
		} catch (error) {
			console.log(error);
		}

		res.status(200).json(response.data)
	}
}
