import dotenv from 'dotenv';
import { Telegraf }  from 'telegraf';
import fetch  from 'node-fetch';
import translation  from './actions/translation.js';
import gpt from  './actions/gpt.js';
import { security } from './services/security.js';
import { callbackQuery } from 'telegraf/filters';

dotenv.config();

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const openaiApiKey = process.env.OPENAI_API_KEY;
const allowedUsers = process.env.ALLOWED_USERS?.trim()?.split(',') || [];

security.init(allowedUsers);

if (!botToken) {
  console.error('Error: TELEGRAM_BOT_TOKEN is not defined');
  process.exit(1);
}

if (!openaiApiKey) {
  console.error('Error: OPENAI_API_KEY is not defined');
  process.exit(1);
}

console.log(`Using bot token: ${botToken}`);
console.log(`Using OpenAI API key: ${openaiApiKey}`);

const bot = new Telegraf(botToken);

let helpText = '';
const actionsToProvide = [translation, gpt];

actionsToProvide.forEach(actionsSet => {
  
  helpText +=  `\n\n| <b><i>${actionsSet.sectionName}</i></b> |\n-------------------\n`
  actionsSet.actions.forEach(action => {
    helpText += `<b>/${action.command}</b> - <i> ${action?.description || ''} </i>\n`;
    
    if(action?.forAllowdUsers) {
    bot.command(action.command, async (ctx, next) => {
      await security.securityCheck(ctx, next, action.action);
    });
    } else {
      bot.command(action.command, async (ctx, next) => {
        await action.action(ctx, next);
      });
    } 
  });

});  
bot.help((ctx) => ctx.replyWithHTML(helpText));
// Alternative
const allActions = actionsToProvide.reduce((obj,item) => ([
  ...obj,
  ...item.actions
]), []);

bot.hears(/\´{2}[a-z0-9\-_]{1,6} /i, async (ctx, next) => {

  const pattern = /\´{2}([a-z0-9\-_]{1,6}) (.*)/i;
  const matches = ctx.message.text.match(pattern);

if (matches) {
  const action = allActions.find(el => el.command === matches[1]);

  if (action) {
    if (action?.forAllowdUsers) {
         await security.securityCheck(ctx, next, action.action);
      } else {
        await action.action(ctx, next)
      } 
  }
  
} 
});

  
bot.launch();
console.log('Bot is running...');
