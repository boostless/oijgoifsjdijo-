const Discord = require("discord.js");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOOSE, {
  useNewUrlParser: true });

  const Money = require("../models/money.js");

module.exports.run = async (bot, message, args)=>{

  await message.delete();

  let kiek = args[1];

  let togive = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Tu nesi dievas");
  if(message.member.hasPermission("ADMINISTRATOR")){//Chekinam ar kas nori nusiusti yra adminas
    Money.findOne({
      userID: togive.id,
      serverID: message.guild.id
    }, (err, money) => {

    pCoins = kiek * 1;
      let giveEmbed = new Discord.RichEmbed()
      .setTitle("**Dievai**")
      .setColor("#ffc132")
      .addField(`Tau ${togive.user.username}, davė ${args[1]} žetonu`, "😮");
      money.money = money.money + pCoins;
      money.save();

      message.channel.send(giveEmbed).then(msg => {msg.delete(5000)});
    })
  }

}

module.exports.help = {
  name: "set"
}

