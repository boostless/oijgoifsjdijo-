const Discord = require("discord.js");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOOSE, {
  useNewUrlParser: true });//MOngoose database connect
const XP = require("../models/xp.js");

module.exports.run = async (bot, message, args)=>{

  await message.delete();

  XP.findOne({
    userID: message.author.id,
    serverID: message.guild.id
  }, (err, xp) => {
    if(err) console.log(err);
    //variables
    let curxp = xp.xp;
    let curlvl = xp.level;
    let nxtLvl = curlvl * 350;
    let difference = nxtLvl - curxp;

    //Embed
    let lvlEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor("#a3ffba")
    .addField("Lygis", curlvl, true)
    .addField("XP", curxp, true)
    .setFooter(`${difference} XP liko iki kito lygio`, message.author.displayAvatarURL);

    return message.channel.send(lvlEmbed).then(msg => {msg.delete(5000)});

  })



}

module.exports.help = {
  name: "level"
}
