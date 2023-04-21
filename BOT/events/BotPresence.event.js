import { Events, ActivityType } from "discord.js"
import { twitchWS } from "../include/WebSocket/connections.js";

export const config = {
    displayName: "Bot Presence Changer",
    trigger: Events.ClientReady,
    once: false,
    enabled: true
};

export async function execute(client) {

    client.user.setPresence({ status: "dnd" });

    twitchWS.on("changePresence", (activity) => {
        if (activity) {
            client.user.setPresence(activity)
        } else {
            client.user.setPresence({
                activities: [{
                    name: "Opss?!",
                    type: ActivityType.Watching,
                }],
                status: "dnd"
            });
        }
    })
}