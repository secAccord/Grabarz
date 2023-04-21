import fetch from "node-fetch";
import config from '../config.json' assert { type: 'json' };

const options = {
    method: 'GET',
    headers: {
        'Client-Id': config.CLIENT_KEY,
        Authorization: "Bearer " + config.AUTH_KEY
    }
};

export function TTV_STREAM (ID){
    const url = `https://api.twitch.tv/helix/streams?user_id=${ID}`;
    return fetch(url,options).then(res => res.json())
}
export function TTV_FOLLOW(ID){
    const url = `https://api.twitch.tv/helix/users/follows?to_id=${ID}`;
   
    return fetch(url,options).then(res => res.json())
}
export function TTV_BIO(ID){
    const url = `https://api.twitch.tv/helix/users?id=${ID}`;
    
    return fetch(url,options).then(res => res.json())
}


export async function TTV_ALL_INFO(id) {

    const allData = [];

    await TTV_FOLLOW(id).then(adw => {
        const { data, total } = adw;
        const name = data[0]["from_name"];

        allData.push({
            total: total,
            last: name,
        })


    })

    await TTV_STREAM(id).then(adw => {

        const { data } = adw

        // console.log(data);

        if (!data.length) {
            allData.push({
                status: false
            })
            return;
        }
        const rawData = data[0]

        allData.push({
            status: true,
            name: rawData["user_name"],
            category: rawData["game_name"],
            title: rawData["title"],
            login: rawData["user_login"],
            viewer: rawData["viewer_count"]
        })


    })
    await TTV_BIO(id).then(adw => {

        const { data } = adw
        const rawData = data[0]
        allData.push({
            display_name: rawData['display_name'],
            description: rawData['description'],
            img: rawData["profile_image_url"]
        })

    })

    return allData;

}