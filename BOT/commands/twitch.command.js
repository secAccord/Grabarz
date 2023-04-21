import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { twitchWS } from '../include/WebSocket/connections.js';

export const config = {
    displayName: "Twitch ReView",
    enabled: true,
}

export const data =
    new SlashCommandBuilder()
        .setName('ttv')
        .setDescription('Wysyła informacje o transmisji i streamerze.')

export async function run(msg) {

    twitchWS.emit("getInfo", '430232163');
    twitchWS.on("sendInfo", (e) => {

        console.log(e);

        const embed = new EmbedBuilder()
            .setColor(0x6441a5)
            .setTitle(`<:twitch:940662930767233024> ${e[2]['display_name']}`)
            .setThumbnail(e[2]['img'])
            .addFields(
                { name: 'Alkoholicy:', value: e[0]['total'].toString(), inline: true },
                { name: 'Ostatni trzeźwy:', value: e[0]['last'], inline: true },
                { name: 'Na żywo:', value: e[1]['status'] ? "Tak" : "Nie", inline: true },
            )

        if (e[1]['status']) {
            embed.addFields(
                { name: 'Wicuf:', value: e[1]["viewer"].toString(), inline: true },
                { name: 'Tytuł:', value: e[1]["title"], inline: true },
                { name: 'Kategoria:', value: e[1]["category"], inline: true },
            )
                .setImage(`https://static-cdn.jtvnw.net/previews-ttv/live_user_${e[1]["login"]}-1280x720.jpg`,)
        }

        embed.addFields({ name: "Bio:", value: e[2]["description"] ? e[2]["description"] : "Brak!" })
            .setFooter({ text: "by Accord Studio & MIKSKY" })

            msg.reply({ embeds: [embed] });
    })
}