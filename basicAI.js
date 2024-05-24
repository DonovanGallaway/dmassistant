import OpenAI from 'openai'
import dotenv from 'dotenv'

dotenv.config();

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

const messageBuilder = async (messages) =>{
  try{
    const completion = await openai.chat.completions.create({
    messages: messages,
    model: 'gpt-4o'
  })
    return completion.choices[0];
}
  catch (error){
    return {error}
  }

  return completion.choices[0]
}

const addMessage = (content, role) => {
  return {
    role: role,
    content: content
  }
}


export {addMessage, messageBuilder}