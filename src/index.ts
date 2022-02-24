import 'reflect-metadata'
import { createConnection } from 'typeorm'
import dotenv from 'dotenv'
import express from 'express'
import { json, urlencoded } from 'body-parser'
import config from './ormconfig'
import registerRoutes from './routes'
import cors from 'cors'
import { twitchbot } from './helper/chatListener'
import { initializeBot } from './helper/configuration'
import CronHelper from './helper/cronHelper'
import passport from 'passport'

import session from 'express-session'
import { strategy } from './services/twitchStrategy'
import * as WebSocket from 'ws';
import * as http from 'http';
import { wsServer } from './helper/wsServer';
import { credential, initializeApp } from 'firebase-admin'
import { initFirebase } from './helper/firebase';
import { cleanChat } from './services/firebaseRepository'
dotenv.config()

// create express app
const app = express()

// const server = 
// wsServer( http.createServer(app));

app.use(cors({ origin: '*' }))

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
passport.use('twitch',strategy())
//Register Middleware
app.use(json(), urlencoded({ extended: true }))


// Register routes

registerRoutes(app)
initFirebase()
cleanChat()

// Start app
app.listen(process.env.PORT, () => console.log(`Run on port: ${process.env.PORT}`))
