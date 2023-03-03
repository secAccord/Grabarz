import {ActivityType} from "discord.js";
import moment from "moment";

export default function statusListService(client , stream){
    const today = new Date();
        return [
            {
                "name": `by Accord`,
                "type": ActivityType.Streaming,
                "url": "https://twitch.tv/Sprajti"
            },
            {
                "name": "by MIKSKY",
                "type": ActivityType.Streaming,
                "url": "https://twitch.tv/MIKSKY_"
            },
            {
                "name": `${moment(today).format('L')} | PL 📆`,
                "type": ActivityType.Streaming,
                "url": "https://twitch.tv/Sprajti"
            },
            {
                "name": stream[0]? "TTV: Sprajti" : `"Marvel Avengers : Początek Twitcha"`,
                "type": ActivityType.Watching,
            },
            {
                "name": `Ping: ${Math.round(client.ws.ping)}ms 🏓`,
                "type": ActivityType.Playing,
            },

            {
                "name": stream[0]? stream[1] : "BTS - Dynamite",
                "type": stream[0]? ActivityType.Competing : ActivityType.Listening,
            },
    ]
}
