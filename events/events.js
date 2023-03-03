import IdeaEvent from "./pomysly.event.js";
import LoginInfo from "./LoginInfo.event.js";
import WEBSOCKET_EVENT from "./websocket.event.js";
import { Mentions } from "./mentions.js";

const eventTable = [IdeaEvent,LoginInfo,WEBSOCKET_EVENT]
const eventFiles = eventTable.map(e => e.name)
const EVENT = {
    list:eventTable
    ,files:eventFiles
}
export default EVENT