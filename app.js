import express from "express"
import dotenv from "dotenv"
import {messageBuilder, addMessage} from './basicAI'

dotenv.config()
const app = express()
const port = process.env.PORT

const messages = []

app.get('/', async (req,res) => {
    const systemMessage = "You are a helpful assistant."
    const data = await messages.push(messageBuilder(systemMessage, 'system'))
    res.status(200).json(data)
})

app.post('/message', (req,res) => {
    const history = req.history
    const message = req.message
})

app.listen(port, () => {
    console.log('App is listening on port ' + port)
})