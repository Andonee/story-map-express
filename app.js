const express = require('express')
const mapRoutes = require('./routes/map')
const authRoutes = require('./routes/auth')
const mapsInfoRoutes = require('./routes/mapInfo')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(
	cors({
		origin: true,
		allowedHeaders: ['Content-Type', 'X-Requested-With', 'Authorization'],
		maxAge: 10 * 3600,
	})
)

app.use(express.json())
app.use(morgan('combined'))

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type Authorization')
	next()
})

app.use('/api', mapRoutes)
app.use('/api', authRoutes)
app.use('/api', mapsInfoRoutes)

mongoose
	.connect(
		`mongodb+srv://Andonee:${process.env.MONGO_PASSWORD}@story-map.q7cen.mongodb.net/story-map?retryWrites=true&w=majority`,
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then(result => {
		console.log('DB connected')
		app.listen(process.env.PORT || 5001)
	})
	.catch(err => console.log(err))
