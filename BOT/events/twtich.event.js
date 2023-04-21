import { Events, ActionRowBuilder, EmbedBuilder, ButtonStyle, ButtonBuilder } from "discord.js"
import json from '../config.json' assert { type: "json" };

const { channels, guild } = json;


import { twitchWS } from "../include/WebSocket/connections.js"

export const config = {
    displayName: "Twitch Alert",
    trigger: Events.ClientReady,
    once: false,
    enabled: true
};

export async function execute(client) {
   twitchWS.emit(`login`, `Zalogowano jako ${client.user.tag} `)

    twitchWS.on("status", (ttv) => {
        const twitchEmbed = new EmbedBuilder()
            .setColor(0x6441a5)
            .setTitle(`Twitch | ${ttv.name} streamuje!`)
            .setDescription(`Siemanko mordeczki! Nasz przekochany streamer ${ttv.name} wleciał punktualnie odpalił streamka!\n` +
                "Wbijaj się dobrze pobawić.")
            .addFields(
                { name: "Tytuł", value: ttv.title }, { name: "Kategoria:", value: ttv.category }
            )
            .setThumbnail("https://static-cdn.jtvnw.net/jtv_user_pictures/623b735a-1267-428a-a600-1d503be70f37-profile_image-70x70.png")
            .setImage(`https://static-cdn.jtvnw.net/previews-ttv/live_user_${ttv.login}-1280x720.jpg`,)
            .setTimestamp()
            .setFooter({ text: "by Accord Studio & MIKSKY" })

        const TwitchButton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setDisabled(false)
                    .setLabel('Wbijaj na strimka!')
                    .setEmoji('🎥')
                    .setURL(`https://twitch.tv/${ttv.name}`)
                    .setStyle(ButtonStyle.Link)
            )



        client.guilds.cache.get(guild).channels.cache.get(channels.ttvAlert).send({
            content: `@everyone\nWasz kochany <@${client.user.id}> zaprasza was na platformę twitch.tv!`,
            embeds: [twitchEmbed],
            components: [TwitchButton]
        });
    })
}