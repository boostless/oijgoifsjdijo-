const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!bUser) return message.channel.send("Nerandu tokio vardo");
      let bReason = args.join(" ").slice(22);
      if(!bReason) return message.channel.send("Neparasiai priezasties");
      if(!message.member.hasPermission("MANAGE_ROLES")){
        message.delete();
        message.author.send("Net Nebandyk :)");
        return;
      } //Chekinam ar zmogus turi tam tinkama lygi kad galetu iskickinti
      if(bUser.hasPermission("MANAGE_ROLES")) return message.channel.send("Šito žmogaus negali išbaninti");


      let banEmbed = new Discord.RichEmbed()
      .setDescription("**Banas**")
      .setColor("#ff0000")
      .addField("Išbanintas žmogus", `${bUser} su ID ${bUser.id}`)
      .addField("Kieno išbanintas", `<@${message.author.id}> su ID ${message.author.id}`)
      .addField("Išbanintas iš", message.channel)
      .addField("Kada išbanintas", message.createdAt)
      .addField("Kodel išbanino", bReason);

      message.delete();//istrinam zinute

      let banChannel = message.guild.channels.find(`name`, "reportai_ismesti_banai");
      if(!banChannel) return message.channel.send("Nerandu chanelio");

      message.guild.member(bUser).ban(bReason);
      banChannel.send(banEmbed);
}

module.exports.help = {
  name: "ban"
}
