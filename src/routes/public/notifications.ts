import { Router } from 'express'



import ErrorHandler from '../../middlewares/Error'
import NotificationController from '../../controllers/public/notificationController';


const router = Router()
const controller = new NotificationController()

router.get('/', controller.followerNotification)

router.use(ErrorHandler)

export default router
