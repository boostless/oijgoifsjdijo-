const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  let sicon = message.guild.displayIconURL;
     let serverembed = new Discord.RichEmbed()
     .setDescription("Serverio informacija")
     .setColor("#4f80ff")
     .setThumbnail(sicon)
     .addField("Serverio Pavadinimas", message.guild.name)
     .addField("Sukurtas", message.guild.createdAt)
     .addField("Tu prisijungei", message.member.joinedAt)
     .addField("Išviso musu yra", message.guild.memberCount);
     message.channel.send(serverembed).then(msg => {msg.delete(3000)})
}

module.exports.help = {
  name: "serverinfo"
}
