import axios from 'axios';
import { NextFunction, Request, Response } from 'express'
import  hbs  from 'express-handlebars';
import Handlebars from 'handlebars';



export default class NotificationController {
	public followerNotification(req: Request, res: Response, next:NextFunction) {

    res.render('main', {layout : 'index'});
	}
}
