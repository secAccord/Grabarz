import { readdirSync } from "fs";
import ascii from "ascii-table";
import __dirname from "../../dirname.js";
import path from "path";
import { Events, Collection, EmbedBuilder } from "discord.js";

const cmdTableLogs = new ascii().setHeading("Commands", "FileName", "Status", "SlashCommand");
export default async (client) => {

    client.commands = new Collection();

    const cmdFiles = readdirSync(path.join(__dirname, "/commands")).filter((file) =>
        file.endsWith(".command.js"),
    );

    for (const file of cmdFiles) {

        const command = await import(path.join(__dirname, `/commands/${file}`));
        const { config, data } = command;

        if (config.displayName && !config.enabled) {
            cmdTableLogs.addRow(config.displayName, file, "? -> Off", "X");
        } else if (config.displayName) {
            cmdTableLogs.addRow(config.displayName, file, "√ -> Loaded", (data.name) ? "√" : "X");
            if (data.name) client.commands.set(data.name, command);
        } else {
            cmdTableLogs.addRow(config.displayName || "Error !!!", file, "X -> i co narobiłeś pajacu?", "X");
            continue
        }
    }

    console.log(cmdTableLogs.toString());






    client.on(Events.InteractionCreate, async (msg) => {

        const { user, guild } = msg;

        if (user.bot) return;
        if (!msg.isChatInputCommand()) return;


        msg.defFooter = { text: msg.user.tag, iconURL: msg.user.displayAvatarURL({ format: 'webp', dynamic: true }) };

        msg.errEmbed = new EmbedBuilder()
            .setTitle("Opss... Error!")
            .setDescription(`There was an error while executing this command!`)
            .setColor('#ff0000')


        
        
        const cmd = await msg.client.commands.get(msg.commandName);
        
        if (!cmd) {
            console.error(`No command matching ${msg.commandName} was found.`);

            webhookClient.send({
                username: 'Bot Status | Command',
                content: `No command matching ${msg.commandName} was found.`,
            });

            return;
        }

        try {
            await cmd.run(msg);
        } catch (error) {
            console.error(error);
            await msg.reply({ embeds: [msg.errEmbed], ephemeral: true });
        }

    })
}