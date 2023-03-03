import socket from "../doc/socket.io.js";

import json  from '../config.json' assert { type: "json" };

const {channels , guild} = json
let lit = 0 ;
import {EmbedBuilder, ButtonStyle, ActivityType , ButtonBuilder, ActionRowBuilder} from 'discord.js';
import statusListService from "../service/statusList.service.js";

const WEBSOCKET_EVENT = {
	name: 'ready',
    once: false,
    display: true,
	execute(client) {


        socket.on('auth' , () =>{
            socket.emit(`login`,`Zalogowano jako ${client.user.tag} `)
        })

        socket.on('status',(msg) => {

            if (!msg.status) return;

            const twitchEmbed = new EmbedBuilder()
                .setColor(0x6441a5)
                .setTitle(`Twitch | ${msg.name} streamuje!`)
                .setDescription(`Siemanko mordeczki! Nasz przekochany streamer ${msg.name} wleciał punktualnie odpalił streamka!\n` +
                    "Wbijaj się dobrze pobawić.")
                .addFields(
                    {name:"Tytuł", value: msg.title}, {name:"Kategoria:", value: msg.category}
                )
                .setThumbnail("https://static-cdn.jtvnw.net/jtv_user_pictures/623b735a-1267-428a-a600-1d503be70f37-profile_image-70x70.png")
                .setImage(`https://static-cdn.jtvnw.net/previews-ttv/live_user_${msg.name}-1280x720.jpg`,)
                .setTimestamp()
                .setFooter({text: "by Silesia Esport Company"})

             const TwitchButton = new ActionRowBuilder()
                 .addComponents(
                     new ButtonBuilder()
                        .setDisabled(false)
                        .setLabel('Wbijaj na strimka!')
                        .setEmoji('🎥')
                        .setURL(`https://twitch.tv/${msg.name}`)
                        .setStyle(ButtonStyle.Link)
                 )



            client.guilds.cache.get(guild).channels.cache.get(channels.ttvAlert).send({
                content: "@everyone TWITCH - STREAM ON!!!",
                embeds: [twitchEmbed],
                 components: [TwitchButton]
            });



        })

        socket.on("follow", async (e) => {

            const embed = new EmbedBuilder()
                .setColor(0x6441a5)
                .setTitle(`<:twitch:940662930767233024> ${e[3]['name']}`)
                .setThumbnail(e[3]['img'])
                .addFields({name: 'Żałobnicy', value: e[1]['total'].toString(), inline: true},
                    {name: 'Ostatni żywy klient', value: e[1]['last'], inline: true},
                    {name: 'Na żywo', value: e[2]['status'] ? "Tak" : "Nie", inline: true},)
            if(e[2]['status']) embed.addFields(
                { name: 'Wicuf', value: e[2]['streamData']["viewer"].toString() , inline: true },
                { name: 'Tytuł', value: e[2]['streamData']["title"], inline: true },
                { name: 'Kategoria', value: e[2]['streamData']["category"] , inline: true },
            ).setImage(`https://static-cdn.jtvnw.net/previews-ttv/live_user_${e[2]['streamData']["name"]}-1280x720.jpg`,)

            embed.addFields({name:"Bio:",value: e[3]["description"]? e[3]["description"]: "Gówno to jest" })
                .setFooter({text: "by Silesia Esport Company"})



            await client.guilds.cache.get(e[0]["guild"]).channels.cache.get(e[0]["channel"]).send({
                embeds: [embed],
            });
        })

        socket.on("statusChange", (e) =>{
                try {

                    const statusList = statusListService(client , e)
                    //console.log(statusList)


                if (lit === statusList.length)
                    lit = 0;

                client.user.setPresence({
                    activities: [statusList[lit]],
                });

                lit++;
                }catch (e) {console.log(e)}
         })


    }
}
export default WEBSOCKET_EVENT