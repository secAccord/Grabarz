// import moment from 'moment';
import { ActivityType } from "discord.js";
import { TTV_ALL_INFO } from "./twitch.js";

let i = 0;

export default async function getStatusBot(id) {
    const statusList = [];
    await TTV_ALL_INFO(id).then(ttv => {

        const status = ttv[1]['status'] ? "online" : "dnd";

        statusList.push(
            {
                activities: [
                    {
                        name: `Live ${ttv[1]['status'] ? "ON!" : "OFF! :("}`,
                        type: ttv[1]['status'] ? ActivityType.Streaming : ActivityType.Playing,
                        url: "https://twitch.tv/Sprajti"
                    }],
                status: status,
            }
        );

        if (ttv[1]['status']) {
            statusList.push(
                {
                    activities: [
                        {
                            name: `${ttv[1]['title']}`,
                            type: ActivityType.Streaming,
                            url: "https://twitch.tv/Sprajti"
                        }],
                    status: status,
                },
                {
                    activities: [
                        {
                            name: `Wicuf: ${ttv[1]['viewer'].toString()}`,
                            type: ActivityType.Streaming,
                            url: "https://twitch.tv/Sprajti"
                        }],
                    status: status,
                },
                {
                    activities: [
                        {
                            name: `Kategoria: ${ttv[1]['category']}`,
                            type: ActivityType.Streaming,
                            url: "https://twitch.tv/Sprajti"
                        }],
                    status: status,
                }
            );
        }

        statusList.push(
            {
                activities: [
                    {
                        name: `Alkoholików: ${ttv[0]['total'].toString()}`,
                        type: ttv[1]['status'] ? ActivityType.Streaming : ActivityType.Playing,
                        url: "https://twitch.tv/Sprajti"
                    }],
                status: status,
            },
            {
                activities: [
                    {
                        name: `Ostatni trzeźwy: ${ttv[0]['last']}`,
                        type: ttv[0]['status'] ? ActivityType.Streaming : ActivityType.Playing,
                        url: "https://twitch.tv/Sprajti"
                    }],
                status: status,
            },
            {
                activities: [
                    {
                        name: "/ttv",
                        type: ttv[1]['status'] ? ActivityType.Streaming : ActivityType.Listening,
                    }],
                status: status,
            },
            {
                activities: [
                    {
                        name: "by MIKSKY & Accord Studio",
                        type: ttv[1]['status'] ? ActivityType.Streaming : ActivityType.Playing,
                    }],
                status: status,
            }
        );
    });

    if (i >= statusList.length) i = 0;

    const response = statusList[i];

    i++;

    return response;

}


