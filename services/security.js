import { callbackQuery } from "telegraf/filters";

const allowedUsers = [];

export const security = {
    init(users) {
        allowedUsers.push(...users.map(e => e.trim()));

    },
    isAlowed(user) {
        if(allowedUsers.length === 0) return;
        return allowedUsers.includes(user);
    },
    async securityCheck(ctx, next, callBack) {
        
        if(!this.isAlowed(ctx.update.message.from.username)) {
            await ctx.replyWithHTML(`This option not allowed for you. 
                Please ask administrator to provide you correspondings rights`);
            return;
        }
        await callBack(ctx, next);
    }
}