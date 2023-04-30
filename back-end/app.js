const express = require('express')
const cors = require('cors')
const songsController = require('./controllers/songController.js')

const app = express()

app.use(cors());
app.use(express.json())


app.get('/', (req, res) => {
    res.send("Welcome to Tuner")
})

app.use("/songs", songsController);

app.get('*', (req, res) => {
    res.status(404).send("Sorry, nothing found!")
})
module.exports = app