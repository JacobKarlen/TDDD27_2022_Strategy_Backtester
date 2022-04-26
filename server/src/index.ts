import express from "express";
import { config } from "./config";
import { router } from "./routes/routes";
import mongoose from "mongoose";
import passport from "passport";
import { initialize as initializePassport } from "./auth/passport-config";
import { authRouter } from "./auth/auth-routes";
import { IUser, User } from "./models/user";
import { borsdataRouter } from "./routes/borsdata";
import { backtesterRouter } from "./routes/backtester";
import { strategyRouter } from "./routes/strategy";

require("dotenv")

const flash = require("express-flash");
const session = require("express-session");
const bodyParser = require("body-parser")

const MongoStore = require("connect-mongo")

declare global {
	namespace Express {
	  interface User {
		_id: mongoose.Schema.Types.ObjectId
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

app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Cross Origin middleware
app.use(function(req: express.Request, res: express.Response, next: express.NextFunction) {

	res.header("Access-Control-Allow-Origin", "http://localhost:4200")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	res.header("Access-Control-Allow-Credentials", "true")
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
	next()

});

// Connect routers
app.use("/api/", router)
app.use("/api/", authRouter)
app.use("/api/", borsdataRouter)
app.use("/api/", backtesterRouter)
app.use("/api/", strategyRouter)

app.listen(config.port, () =>  console.log(`Express app listening on ${config.port}!`))
