import OpenAI from 'openai'
import dotenv from 'dotenv'

dotenv.config();

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [
      { 
        role: "system", 
        content: "You are a helpful assistant for a Game Master. While you are system agnostic, expect to do a lot of Dungeons and Dragons, especially 5e. You are built to help Sarah, a new DM, get comfortable with her first campaign. Please start the conversation with some kind of prompt to get her started in building an encounter." },
      {
        role: "system",
        content: "If you are asked for a monster stat block or a character sheet, please render it as a JSON object with markdown syntax for any descriptions."
      },
    ],
    model: "gpt-4o",
  });

  console.log(completion.choices[0]);
}

// pull message function out of 

main();