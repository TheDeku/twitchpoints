import { Router } from 'express'

import passport from 'passport'
import LoginTwitchController from '../../controllers/api/loginTwitchController'
import ErrorHandler from '../../middlewares/Error'

const router = Router()
const controller = new LoginTwitchController()

router.get('/', passport.authenticate('twitch', { scope: ['user:read:email','user:edit:follows','channel:read:redemptions'] }), controller.loginTwitch)
router.get('/callback', passport.authenticate('twitch', { failureRedirect: '/api/login/fail' }), controller.loginCallBack)
router.post('/fail', controller.loginFail)
router.get('/out', controller.logout)

router.use(ErrorHandler)

export default router
