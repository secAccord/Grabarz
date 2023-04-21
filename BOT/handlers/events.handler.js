import { readdirSync } from "fs";
import ascii from "ascii-table";
import __dirname from "../../dirname.js";
import path from "path";

const eventTableLogs = new ascii().setHeading("Events", "FileName", "Status");


export default async (client) => {


    const eventFiles = readdirSync(path.join(__dirname, "/events")).filter((file) =>
        file.endsWith(".event.js"),
    );


    for (const file of eventFiles) {

        const { config, execute } = await import(path.join(__dirname, `/events/${file}`));

        if (config.displayName && !config.enabled) {
            eventTableLogs.addRow(config.displayName, file, "? -> Off");
        } else if (config.displayName) {
            eventTableLogs.addRow(config.displayName, file, "√ -> Loaded");
        } else {
            eventTableLogs.addRow(config.displayName, file, "X -> i co narobiłeś pajacu?");
            continue
        }

        if (config.enabled) {
            if (config.once) {
                client.once(config.trigger, (...args) => execute(...args, client));
            } else {
                client.on(config.trigger, (...args) => execute(...args, client));
            }
        }
    }


    console.log(eventTableLogs.toString());
}