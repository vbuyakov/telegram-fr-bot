import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();
const openaiApiKey = process.env.OPENAI_API_KEY;


export const MODELS = {
  GPT4O: 'gpt-4o',
  GPT35TURBO: 'gpt-3.5-turbo'
}


export const chatGPT = {

    replaceAsterisksWithBold(text) {
        return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    },
    async textRequest(prompt, model = MODELS.GPT35TURBO) {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${openaiApiKey}`
            },
            body: JSON.stringify({
                messages: [    {
                    "role": "user",
                    "content": prompt
                  }
                ],
              model,
              // model: 'gpt-3.5-turbo', // - best for price
              temperature: 0.7
            })
          });
        
          const data = await response.json();
          console.log(data);
          console.log(data.choices[0].message);
          return this.replaceAsterisksWithBold(data.choices[0].message.content.trim());
    }
}