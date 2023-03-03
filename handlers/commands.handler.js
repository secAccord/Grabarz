//Moduły
//const {} = proces.env;

import {Collection, Events, REST , Routes} from "discord.js";
import ascii from "ascii-table";
import config from '../config.json' assert { type: "json" };
import path from "path";
import __dirname from "../dirnameFix.js";
import fs from "fs";

const rest = new REST({ version: '10' }).setToken(config.BOT_TOKEN);
const commands = []
const commandsPath = path.join(__dirname,'/commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.command.js'));
const commandsLog = new ascii().setHeading("Command","File", "Status").setBorder('|','-','○','○'); //stworzenie tabeli komend

export default async function commandHandler (client) {
    client.commands = new Collection(); 
    for(const file of commandFiles){

        const { command } = await import( `../commands/${file}`);

        commands.push(command.data.toJSON());


        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            commandsLog.addRow(command.data.name,file, "√ -> Loaded");
        } else {
            console.log(`[WARNING] The command at ${file} is missing a required "data" or "execute" property.`);
        }
        
    }
    
  (async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationCommands(config.client),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();
   client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
})

console.log(commandsLog.toString())

};
