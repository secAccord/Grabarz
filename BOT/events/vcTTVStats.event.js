import { Events } from "discord.js"
import { twitchWS } from "../include/WebSocket/connections.js";
import json from '../config.json' assert { type: "json" };

const { channels, guild } = json;

export const config = {
    displayName: "VC TTV Statistic",
    trigger: Events.ClientReady,
    once: false,
    enabled: true
};

export async function execute(client) {
    let last = {
        status: true,
        follows: 0,
    }

    twitchWS.on("vcStatsTTV", (ttv) => {
        if (last.status != ttv[1]["status"]) {
            client.guilds.cache.get(guild).channels.cache.get(channels.stats.live)
                .setName(ttv[1]['status'] ? "🟣︙Live ON!" : "🔴︙Live OFF! :(")
                .catch(console.error);
            last.status = ttv[1]["status"];

        }
        if (last.follows != ttv[0]["total"]) {
            client.guilds.cache.get(guild).channels.cache.get(channels.stats.follow)
                .setName(`🍺︙Alkoholików: ${ttv[0]["total"].toString()}`)
                .catch(console.error);
            last.follows = ttv[0]["total"];
        }
    });
}