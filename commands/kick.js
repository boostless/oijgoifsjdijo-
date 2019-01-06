const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!kUser) return message.channel.send("Nerandu tokio vardo");
      let kReason = args.join(" ").slice(22);
      if(!kReason) return message.channel.send("Neparasiai priezasties");
      if(!message.member.hasPermission("MANAGE_MESSAGES")){
        message.delete();
        message.author.send("Net Nebandyk :)");
        return;
      } //Chekinam ar zmogus turi tam tinkama lygi kad galetu iskickinti
      if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Šito žmogaus negali išmesti");


      let kickEmbed = new Discord.RichEmbed()
      .setDescription("**Kick**")
      .setColor("#ff9000")
      .addField("Išmestas žmogus", `${kUser} su ID ${kUser.id}`)
      .addField("Kieno išmestas", `<@${message.author.id}> su ID ${message.author.id}`)
      .addField("Išmestas iš", message.channel)
      .addField("Kada išmestas", message.createdAt)
      .addField("Kodel išmestas", kReason);
      message.delete();//istrina zinute

      let kickChannel = message.guild.channels.find(`name`, "reportai_ismesti_banai");
      if(!kickChannel) return message.channel.send("Nerandu chanelio");

      message.guild.member(kUser).kick(kReason);
      kickChannel.send(kickEmbed);
}

module.exports.help = {
  name: "kick"
}
