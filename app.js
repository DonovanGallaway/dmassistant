import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import {messageBuilder, addMessage} from './basicAI.js'

dotenv.config()
const app = express()
const port = process.env.PORT

let appHistory

app.use(cors())
app.use(express.json())

app.get('/', async (req,res) => {
    const systemMessage = {content: "You are a helpful assistant, specifically for Game Masters trying to get their sessions or campaigns together. You will be called upon to generate stat blocks or other errata, as well as plot lines, encounters, or characters. Prompt the user for what they would like assistance with.", role: 'system'}
    let data
    try{
        res.status(200).json([systemMessage])
    } catch {
        res.status(400).json({error})
    }
})

app.post('/message', async (req,res) => {
    console.log(req.body)
    const history = req.body.history
    const content = req.body.content
    history.push(content)
    console.log(history)
    try {
        const data = await messageBuilder(history)
        history.push(data.message)
        res.status(200).json(history)
    } catch (error){
        console.log(error)
        res.status(400).json({error})
    }
})

app.listen(port, () => {
    console.log('App is listening on port ' + port)
})