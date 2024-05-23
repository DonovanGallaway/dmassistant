import OpenAI from 'openai'
import dotenv from 'dotenv'

dotenv.config();

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

const messageBuilder = async (messages, model) =>{
  const completion = await openai.chat.completions.create({
    messages: messages,
    model: model ? model : 'gpt-4o'
  })

  return completion.choices[0]
}

const addMessage = (message, role) => {
  return {
    role: role,
    message: message
  }
}


export {addMessage, messageBuilder}