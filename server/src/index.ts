import express from "express";
import { config } from "./config";
import { router } from "./routers/routes";
import mongoose from "mongoose";
import passport from "passport";
import { initialize as initializePassport } from "./auth/passport-config";
import { authRouter } from "./auth/auth-routes";
import { borsdataRouter } from "./routers/borsdata";
import { backtesterRouter } from "./routers/backtester";
import { strategyRouter } from "./routers/strategy";
import { usersRouter } from "./routers/users";

import { Strategy  } from './models/backtester'

require("dotenv")

const flash = require("express-flash");
const session = require("express-session");
const bodyParser = require("body-parser")

const cors = require("cors")

const MongoStore = require("connect-mongo")

const corsOptions = {
	origin: ['http://localhost:4200', 'http://backtester-api.dev', 'http://localhost:8000'],
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	credentials: true,
	methods: ['GET','POST','PUT','DELETE'],
	allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept"
  }

declare global {
	namespace Express {
	  interface User {
		_id: mongoose.Schema.Types.ObjectId,
		username: String,
		following: mongoose.Schema.Types.ObjectId[],
	  }
	}
  }

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config() // require syntax to more compactly import env variables
}

console.log(config.mongo.uri)

// Connect to MongoDB database
console.log('Connection to mongoDb on uri: ' + config.mongo.uri)
mongoose.connect(config.mongo.uri, config.mongo.options)
mongoose.connection.on('error', function(err: Error) {
 console.error('MongoDB connection error: ' + err)
});

// Setup express application and initialize passport
const app = express()
initializePassport(passport)
app.use(flash())
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUnitialized: false,
	store: MongoStore.create({
		mongoUrl: config.mongo.uri,
		mongoOptions: config.mongo.options
	})
}))

//Strategy.deleteMany({}).then(res => console.log("strategy deletion successful"))

app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// cross-origin middleware
app.use(cors(corsOptions))

// Connect routers
app.use("/api/", router)
app.use("/api/", authRouter)
app.use("/api/", borsdataRouter)
app.use("/api/", backtesterRouter)
app.use("/api/", strategyRouter)
app.use("/api/", usersRouter)

app.listen(config.port, () =>  console.log(`Express app listening on ${config.port}!`))
