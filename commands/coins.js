const Discord = require("discord.js");
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://jonas68824:vakaris12@testingofficerbot-tlndb.mongodb.net/officerbot", {
  useNewUrlParser: true });//MOngoose database connect

  const Money = require("../models/money.js");

module.exports.run = async (bot, message, args)=>{

  await message.delete();


  Money.findOne({
    userID: message.author.id,
    serverID: message.guild.id
  }, (err, money) => {
    if(err) console.log(err);
    let coinEmbed = new Discord.RichEmbed()
    .setTitle("💰")
    .setThumbnail(message.author.displayAvatarURL)
    .setColor("#ffc132")

    if(!money){
      coinEmbed.addField("Žetonai", "0", true);
      return message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
    }else{
      coinEmbed.addField("Žetonai", money.money, true);
      return message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
    }
  })


}

module.exports.help = {
  name: "coins"
}
