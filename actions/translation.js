import { MODELS, chatGPT } from "../services/chatGPT.js"
import { security } from "../services/security.js";

export default {
    sectionName: "Translations and text corrections",
    actions: [
        {
            command: 'echo',
            description: 'Echo me',
            action: async (ctx, next) => {
                const input = ctx.message.text.split(' ').slice(1).join(' ').trim();
                if(input === '') return;
                ctx.replyWithHTML(`<i>Echo :</i><b>${input} ${input}</b> ${input} ......`);
            }
        },
        {
            command: 'tfr',
            forAllowdUsers: true,
            description: 'French->Russian',
            action: async (ctx, next) => {
                const input = ctx.message.text.split(' ').slice(1).join(' ').trim();
                if(input === '') return;
                
                const prompt = `Translate the following text from French to Russian: ${input}`;
                const translation = await chatGPT.textRequest(prompt);
                ctx.replyWithHTML(translation);
            }
        },
        {
            command: 'trf',
            forAllowdUsers: true,
            description: 'Russian->French',
            action: async (ctx, next) => {
                const input = ctx.message.text.split(' ').slice(1).join(' ').trim();
                if(input === '') return;
                const prompt = `Translate the following text from Russian to French: ${input}`;
                const translation = await chatGPT.textRequest(prompt);
                
                ctx.replyWithHTML(translation);
            }
        },
        {
            command: 'f',
            description: 'Fix Text',
            forAllowdUsers: true,
            action: async (ctx, next) => {
                const input = ctx.message.text.split(' ').slice(1).join(' ').trim();
                if(input === '') return;
                console.log('Recieved text to fix: ',input);
                const prompt = `Fix any issues in the following french text, without explanation, only fixed result: ${input}`;
                const fixedText = await chatGPT.textRequest(prompt);
                ctx.replyWithHTML(fixedText);
            }
        },
        {
            command: 'fex',
            description: 'Fix and Explain',
            action: async (ctx, next) => {
                const input = ctx.message.text.split(' ').slice(1).join(' ').trim();
                if(input === '') return;
                console.log('Recieved text to fix: ',input);
                const prompt = `Fix any issues in the following french text and explain in russian (add html markup to better reading, only tags I and B ): ${input}`;

                const fixedText = await chatGPT.textRequest(prompt);
                ctx.replyWithHTML(fixedText);
            }
        },
        {
            command: 'fexe',
            forAllowdUsers: true,
            description: 'Fix and Explain in English',
            action: async (ctx, next) => {
                const input = ctx.message.text.split(' ').slice(1).join(' ').trim();
                if(input === '') return;
                console.log('Recieved text to fix: ',input);
                const prompt = `Fix any issues in the following french text and explain in english (add html markup to better reading, only tags I and B): ${input}`;
                const fixedText = await chatGPT.textRequest(prompt);
                ctx.replyWithHTML(fixedText);

            }
        },
        {
            command: 'dfr',
            forAllowdUsers: true,
            description: 'Word in dictionary',
            action: async (ctx, next) => {
                const input = ctx.message.text.split(' ').slice(1).join(' ').trim();
                if(input === '') return;
                console.log('Recieved text to fix: ',input);
                const prompt = `Найди значение слова во француском языке, глагол приведи в инфинитив,  с транскрицией и примерами для существительных укажи род: ${input}. 
                Результат верни в виде JSON. {
                original_word, // Исправленое слово 

                translations:[ //все возможные переводы. Сначала перевод слова наиболее совпадающего
                {
                type: '' // noun, prenom, verb, adv, adj .....
                infinitive: '', 
                gender: '' // если применимо (m,f)
                transcription: '',//
                translation, // перевод на русский язык
                examples:[] // 1,2 примера использования на француском языке
                },...],....}
                `;
                const fixedText = await chatGPT.textRequest(prompt, MODELS.GPT4O);
                ctx.replyWithHTML(fixedText);

            }
        },
        {
            command: 'cjfr',
            forAllowdUsers: true,
            description: 'Conjugaisons',
            action: async (ctx, next) => {
                const input = ctx.message.text.split(' ').slice(1).join(' ').trim();
                if(input === '') return;
                console.log('Recieved text to fix: ',input);
                const prompt = `Donez-moi les conjugaisons pour: ${input}`;
                const fixedText = await chatGPT.textRequest(prompt);
                ctx.replyWithHTML(fixedText);

            }
        },
    ]
    }
