import { Application, Router } from 'express'
import  LoginTwitch  from "./api/loginTwitch";
import  Webhooks  from "./public/webhooks";
import  Notifications  from "./public/notifications";


type RouteEntry = {
  path: string
  router: Router
}

const routes: RouteEntry[] = [
  // Rutas aqui como objetos { path: "/api", router: PersonRouter }
  { path: '/api/login', router: LoginTwitch },
  { path: '/api/webhooks', router: Webhooks },
  { path: '/api/notification', router: Notifications },
]

/**
 * This function register all routes defined in this file
 * to an express application.
 * @param app Express application instance
 */
export default function registerRoutes(app: Application): void {
  routes.forEach(item => {
    console.log(item.path)
  })
  routes.forEach(({ path, router }) => app.use(path, router))
}
