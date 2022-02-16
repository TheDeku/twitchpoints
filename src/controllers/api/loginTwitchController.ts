import { NextFunction, Request, Response } from 'express'
import { twitchbot } from '../../helper/chatListener';
import { initializeBot } from '../../helper/configuration';
import { channelRedemptions } from '../../services/followers';


export default class LoginTwitchController {
	public loginTwitch(req: Request, res: Response, next:NextFunction) {
		// console.log(req)
		res.send(200).json({algo:"algo"})
	}
	
	public async loginCallBack(req: Request, res: Response, next:NextFunction) {
		try {
			console.log(req.user);
			// console.log(req.body.accessToken);
			initializeBot(req.user)

			twitchbot()

			await channelRedemptions();

			res.status(200).json("Listo")
		} catch (error) {
			next(error)
		}
	}

	public loginFail(req: Request, res: Response, next:NextFunction) {
		// res.status(401).send('Login Fail')
	}

	public logout(req: Request, res: Response, next:NextFunction) {
		// req.logout()
		// res.redirect(`${process.env.SAML_FRONT_URL}?connected=false`)
	}
}
