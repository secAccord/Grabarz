import { Client, Events, GatewayIntentBits } from 'discord.js';
import config from './config.json' assert { type: 'json' };
import eventHandler from "./handlers/events.handler.js";
import commandsHandler from './handlers/commands.handler.js';


const client = new Client({ intents: [GatewayIntentBits.Guilds] });

eventHandler(client);
commandsHandler(client);

client.login(config.token);