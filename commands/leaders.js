const Discord = require("discord.js");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOOSE, {
  useNewUrlParser: true });//MongoDB connect
 const Money = require("../models/money.js");

module.exports.run = async (bot, message, args)=>{
  //Grab all of the exemptUsers
  Money.find({
    serverID: message.guild.id
  }).sort([
    ['money', 'descending']
  ]).exec((err, res) => {
    if(err) console.log(err);



    let embed = new Discord.RichEmbed()
    .setTitle("Žetonu lyderiu lenta")
    if(res.length === 0){//zero
      embed.setColor("#f44242");
      embed.addField("Nerasta žmonių!")
    }else if(res.length < 10)//Less then 10
    {
      embed.setColor("#41f4ac");
      for(i = 0; i < res.length; i++){
        let member = message.guild.members.get(res[i].userID) || "User Left";
        if(member === "User Left"){
          embed.addField(`${i + 1}. ${member}`, `**Žetonai**: ${res[i].money}`);
        }else{
          embed.addField(`${i + 1}. ${member.user.username}`, `**Žetonai**: ${res[i].money}`);
        }
      }
    }else{//More then 10
      embed.setColor("#41f4ac");
      for(i = 0; i < 10; i++){
        let member = message.guild.members.get(res[i].userID) || "User Left";
        if(member === "User Left"){
          embed.addField(`${i + 1}. ${member}`, `**Žetonai**: ${res[i].money}`);
        }else{
          embed.addField(`${i + 1}. ${member.user.username}`, `**Žetonai**: ${res[i].money}`);
        }
    }

  }
  message.channel.send(embed).then(msg => {msg.delete(8000)});
})
}

module.exports.help = {
  name: "leaders",
  alias: "leaderboard"
}
