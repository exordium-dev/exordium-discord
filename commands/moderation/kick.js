// dotenv requirement for token data
const dotenv = require('dotenv');
dotenv.config();

// discord requirement
const Discord = require('discord.js');

module.exports = {
    name: "kick",
    category: "moderation",
    description: "Kicks a mentioned user from the server.",

    run: (client, message, args) => {
        if (!message.member.hasPermission("KICK_MEMBERS")){
            let embed = new Discord.MessageEmbed()
                .setColor(process.env.DISCORD_COLOR_DANGER)
                .setTitle("Error")
                .setDescription("You don't have permission to kick people.")
                .setTimestamp()
                .setFooter(`Offender: ${message.author.tag}`)
            return message.channel.send(embed);    
        }
        let kuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!kuser){
            let embed = new Discord.MessageEmbed()
                .setColor(process.env.DISCORD_COLOR_DANGER)
                .setTitle("Error")
                .setDescription("Invalid user.")
                .setTimestamp()
            return message.channel.send(embed);
        }

        if (kuser == message.author.id){
            let embed = new Discord.MessageEmbed()
                .setColor(process.env.DISCORD_COLOR_DANGER)
                .setTitle("Error")
                .setDescription("You can't kick yourself.")
                .setTimestamp()
            return message.channel.send(embed);
        }

        if (kuser.hasPermission("KICK_MEMBERS")){
            let embed = new Discord.MessageEmbed()
                .setColor(process.env.DISCORD_COLOR_DANGER)
                .setTitle("Error")
                .setDescription("You can't kick a staff member.")
                .setTimestamp()
            return message.channel.send(embed);
        }

        let kreason = args.join(" ").slice(22);
        if (!kreason) kreason = "No reason provided."

        let kickembed = new Discord.MessageEmbed()
            .setDescription(`Kick Report`)
            .setAuthor(kuser.user.tag)
            .addField("Kicked By:", `<@${message.author.id}>`)
            .addField("Reason:", kreason)
            .setTimestamp()
            .setColor(process.env.DISCORD_COLOR_WARNING)

        const kickChannel = client.channels.cache.get('741414700251873303')
        if (!kickChannel) return message.channel.send("Cannot find logs channel.");
        kickChannel.send(kickembed)

        let dmembed = new Discord.MessageEmbed()
            .setTitle(`Kick Report`)
            .setDescription("**You were kicked from EXORDIUM.**")
            .addField("Kicked By:", `<@${message.author.id}>`)
            .addField("Reason:", kreason)
            .setTimestamp()
            .setColor(process.env.DISCORD_COLOR_DANGER)
            .setThumbnail(`https://avatars0.githubusercontent.com/u/56140699?s=600&v=4`)

        kuser.send(dmembed)
        message.guild.member(kuser).kick(kreason);

    }
}