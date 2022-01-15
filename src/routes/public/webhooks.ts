import { Router } from 'express'

import passport from 'passport'
import LoginTwitchController from '../../controllers/api/loginTwitchController'
import ErrorHandler from '../../middlewares/Error'
import WebhooksController from '../../controllers/public/webhookController';

const router = Router()
const controller = new WebhooksController()

router.post('/', controller.webhookCallback)
router.get('/', controller.getWebhooks)

router.use(ErrorHandler)

export default router
