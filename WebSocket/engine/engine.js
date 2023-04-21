import { createServer } from "https";
import { Server } from "socket.io";
import app from "./routing.js";
import clc from 'cli-color'
import { TTV_STREAM, TTV_ALL_INFO } from "./twitch.js";
import { interval } from "rxjs";
import getStatusBot from "./botStatus.js";

const color = clc;

const server = createServer(app);
const io = new Server(7000);



const msCalc = s => s * 1000;

const statusTTVIntr = interval(msCalc(60));
const botPresenceIntr = interval(msCalc(90));
const channelTTVIntr = interval(msCalc(60));

//Socket
io.on("connection", (socket) => {


    socket.on("login", e => console.log(color.blueBright(`[Discord] ${e}`)))

    socket.on("getInfo", async (id) => {

        await TTV_ALL_INFO(id).then(adw => {
            socket.emit("sendInfo", adw);
        })


    })

})
//Status Change
let blockPing = true;
async function statusTTV() {



    await TTV_STREAM('430232163').then(adw => {

        const { data } = adw

        // console.log(adw);

        if (!data.length) {
            console.log("Stream OFF!!!");
            blockPing = false;
            return;
        }

        if (blockPing) return console.log("Stream already starting!");
        const rawData = data[0]

        io.emit("status", {
            name: rawData["user_name"],
            login: rawData["user_login"],
            category: rawData["game_name"],
            title: rawData["title"],
            viewer: rawData["viewer_count"]
        });
        console.log("Data Send Status TTV!");
        blockPing = true;

    });
}

async function statusBot() {
    getStatusBot('430232163').then(resp => {
        io.emit("changePresence", resp);
        console.log(resp);
    });
}

//Loop Start
statusTTVIntr.subscribe(() => statusTTV());
botPresenceIntr.subscribe(() => statusBot());
channelTTVIntr.subscribe(async () => {
    await TTV_ALL_INFO('430232163').then(adw => {
        io.emit("vcStatsTTV", adw);
    })
});

export default server