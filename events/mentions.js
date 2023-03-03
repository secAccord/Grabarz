import { Events } from "discord.js"
export const Mentions = {
    //name: "Bot Mention Reply",
    name: Events.MessageCreate,
    once: false,
    display: true,
    enabled: true,
    execute(msg) {

        if(msg.author.bot) return;
        if(msg.content.toLowerCase().includes("kij w dupie")) return msg.reply(`https://bit.ly/grafpoleca`);
        
        if(msg.content.includes("<:kekw:1030444146357456957>")) return msg.react('<:kekw:1030444146357456957>')
        if(msg.content.includes("<:sprajtOHey:943311119777419325>")) return msg.reply(`Hejcia ${msg.author} ${msg.client.emojis.cache.get("906960352632262657")}`)
        if(!msg.mentions.has(msg.client.user.id)) return;

        if(msg.content.toLowerCase().includes("cześć")) return msg.reply(`Siema ${msg.author}`);        
    }
}