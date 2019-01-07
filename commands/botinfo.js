const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  let binfo = message.author;
  let bicon = bot.user.displayAvatarURL;
      let botembed = new Discord.RichEmbed()
      .setDescription("Boto Informacija")
      .setColor("#4f80ff")
      .setThumbnail(bicon)
      .addField("Boto Vardas", bot.user.username)
      .addField("Boto versija", "2.0.0");
      message.channel.send(`${binfo}, pasižiurek i savo pm nusiunčiau tau žinute :)`).then(msg => {msg.delete(5000)})
      message.delete(100);
      message.author.send(botembed);
}

module.exports.help = {
  name: "botinfo"
}
