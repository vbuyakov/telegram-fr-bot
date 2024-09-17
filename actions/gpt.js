import { MODELS, chatGPT } from "../services/chatGPT.js"

export default {
    sectionName: "ChatGpt command",
    actions: [
        {
            command: 'g',
            description: 'GPT-3.5Turbo',
            forAllowdUsers: true,
            action: async (ctx, next) => {
                const input = ctx.message.text.split(' ').slice(1).join(' ').trim();
                if(input === '') return;
                
                const prompt = `${input}`;
                const translation = await chatGPT.textRequest(prompt, MODELS.GPT35TURBO);
                ctx.replyWithHTML(translation);
            }
        },
        {
            command: 'gg',
            description: 'GPT-4o',
            forAllowdUsers: true,
            action: async (ctx, next) => {
                const input = ctx.message.text.split(' ').slice(1).join(' ').trim();
                if(input === '') return;
                
                const prompt = `${input}`;
                const translation = await chatGPT.textRequest(prompt,MODELS.GPT4O);
                ctx.replyWithHTML(translation);
            }
        },
        //vTODO: audio commands
    ]
}