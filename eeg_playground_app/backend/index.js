const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const socket = require('socket.io')
const app = express()

const PORT = 3001

const server= app.listen(PORT, () => {
    console.log(`Posluzitelj je pokrenut na portu ${PORT}`)
})
const io = socket(server,{ 
    cors: {
      origin: 'http://localhost:3000'
    }
}) 

require('./mindwave')(io);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
// app.use(express.json())
app.use(express.static('public'));
