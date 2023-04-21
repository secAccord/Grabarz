import { io } from "socket.io-client"
export const twitchWS = io("ws://localhost:7000");