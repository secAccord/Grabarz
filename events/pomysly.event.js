import { EmbedBuilder } from 'discord.js';
import json  from '../config.json' assert { type: "json" };

const { channels, guild } = json
const IdeaEvent = {
	name: 'messageCreate',
    once: false,
    display: true,
	execute(msg) {
        if(msg.guild.id != guild) return;
        if(msg.channel.id != channels.tips) return;;

        if(msg.content){
            const suggestionEmbed = new EmbedBuilder()
            .setAuthor({name: msg.author.tag, iconURL: msg.author.displayAvatarURL({ format: 'webp', dynamic: true, size: 256 })})
            .setDescription(msg.content)
            .setColor('#00ff62')
            msg.channel.send({ embeds: [suggestionEmbed]}).then(m => { m.react('👍'); m.react('👎');})
            msg.delete(); 
        }
	},
};
export default IdeaEvent