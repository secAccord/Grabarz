import { io } from "socket.io-client";
import config from '../config.json' assert { type: "json" };
const {ip ,auth} = config.websocket
const socket = io(ip ,{
    
    auth:{
        token:auth
    }
})
export default socket;