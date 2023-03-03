import { Client, GatewayIntentBits } from 'discord.js';
import json  from './config.json' assert { type: "json" };

const { BOT_TOKEN } = json;
/* Załadowanie handlerów */
import commandHandler from "./handlers/commands.handler.js";
import eventHandler from "./handlers/events.handler.js";




const client = new Client({
    intents: [ GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
    ],
    disableEveryone: true
})



eventHandler(client);
commandHandler(client);

// CLIENT LOGIN
client.login(BOT_TOKEN);
console.table({
    status:"ON"
})
