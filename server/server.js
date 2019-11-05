require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const mandelbrotRouter = require('./routes/mandelbrot')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))


app.use(express.json())


app.use('/mandelbrot', mandelbrotRouter)

app.get('/', (req, res) => res.sendFile('app/public/index.html', {'root': './'}))
app.get('/style.css', (req, res) => res.sendFile('app/public/style.css', {'root': './'}))
app.get('/bundle.js', (req, res) => res.sendFile('app/public/bundle.js', {'root': './'}))

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))