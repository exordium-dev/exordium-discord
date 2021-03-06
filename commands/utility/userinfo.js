// dotenv requirement for token data
const dotenv = require('dotenv');
dotenv.config();

// discord requirement
const Discord = require('discord.js');

module.exports = {
    name: "userinfo",
    category: "utility",
    description: "Fetches information on a mentioned user.",

    run: async (client, message, args) => {
        try {
            const user = message.mentions.members.first() || message.member

            const embed = new Discord.MessageEmbed()
                .setTitle(user.user.tag)
                .setDescription(`Here's what we know about ${user.user.tag}`)
                .setFooter(`ID: ${user.id}`)
                .addField('Account Creation Date: ', `${user.user.createdAt}`, true)
                .addField('Current Game: ', `${user.user.presence.game || 'None'}`, true)
                .setThumbnail(user.user.avatarURL({size: 512}))
                .setColor(process.env.DISCORD_COLOR_PRIMARY)
                .setTimestamp()

            message.channel.send(embed);
                
        } catch (err) {
            message.channel.send('Error. You should not be seeing this.\n' + err).catch();
        }
    }
}
