import socket from "../doc/socket.io.js";
 
import { SlashCommandBuilder } from 'discord.js';

export const command = {
    data : new SlashCommandBuilder()
		.setName('ttv')
		.setDescription('Wysyła informacje o transmisji i streamerze'),
        async execute(msg) {
            await msg.reply({ content: 'Specjalnie dla ciebie', ephemeral: true });
            await socket.emit("getInfo",({ channel : msg.channel.id, guild : msg.guild.id}))
        },
    }

