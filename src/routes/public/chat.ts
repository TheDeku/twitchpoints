import { Router } from 'express'



import ErrorHandler from '../../middlewares/Error'
import ChatController from '../../controllers/public/chatController';


const router = Router()
const controller = new ChatController()

router.get('/', controller.listenChat)

router.use(ErrorHandler)

export default router
