import { Events } from "discord.js"

export const config = {
    displayName: "Bot Login Connect",
    trigger: Events.ClientReady,
    once: true,
    enabled: true
};

export async function execute(client) {
    console.log(`Logged in as ${client.user.tag}!`);
}