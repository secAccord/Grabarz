import ascii from "ascii-table";
import __dirname from "../doc/dirnameFix.js"
import {file} from "googleapis/build/src/apis/file/index.js";
import EVENT from "../events/events.js";
const eventTable = new ascii().setHeading("Events", "Status").setBorder('|','.','○','○');

export default function eventHandler ( client ){

    EVENT.list.map((event,i) =>{



        if(!event.display){
            eventTable.addRow(EVENT.files[i], "? -> Display Off");
        }else if(event.name){
            eventTable.addRow(EVENT.files[i], "√ -> OK");
        }else{
            eventTable.addRow(EVENT.files[i], "X -> i co narobiłeś pajacu?");
        }

        if(event.display){
            if(event.once){
                client.once(event.name, (...args) => event.execute(...args,client));
            } else {
                client.on(event.name, (...args) => event.execute(...args,client));
            }
        }
    })


console.log(eventTable.toString())

};


