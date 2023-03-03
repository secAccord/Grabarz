import socket from "../doc/socket.io.js";
import { joinVoiceChannel  } from "@discordjs/voice"
import json  from '../config.json' assert { type: "json" };
const {guild , channels } = json
const LoginInfo = {
	name: 'ready',
    once: true,
    display: true,
	execute(client) {

        console.log(`Zalogowano jako ${client.user.tag}!`);
        socket.emit("login",`Zalogowano jako ${client.user.tag}!`)
        const voice = channels.cmentarz;
        //Join Voice Chat
        const channel = client
            .guilds.cache.get(guild)
            .channels.cache.get(voice)
        const VC = joinVoiceChannel({
            channelId:channels.cmentarz,
            guildId:guild,
            adapterCreator: channel.guild.voiceAdapterCreator,
        })
	},
};
export default LoginInfo;