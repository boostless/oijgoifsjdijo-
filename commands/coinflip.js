const Discord = require("discord.js");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOOSE, {
  useNewUrlParser: true });

const Money = require("../models/money.js");

module.exports.run = async (bot, message, args)=>{

  await message.delete();
  //$flip herbas/skaicius amount
  let random = Math.floor(Math.random() * 2);
  const msg = message.content.toUpperCase();
  let suma = args[1];

  Money.findOne({
    userID: message.author.id,
   serverID: message.guild.id
  }, (err, money) => {

    let coins = money.money;
    console.log(args[1]);

    if(err) console.log(err);

    if(coins < 1) return message.reply("Tu neturi žetonu");//Ziuri ar turi zetonu

    if(coins < suma) return message.reply("Tu neturi tiek žetonu");//Ziuri ar dedi nedaugiau kiek turi

    console.log(random);

if(msg.includes("HERBAS")){
  //Herbas
  if(random == 0){
    wCoins = suma * 2;

    let winEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .addField("Laimėjai!💸", wCoins)
    .setColor("#ffc132")
    .addField("Dabar turi", money.money + wCoins);

    message.channel.send(winEmbed).then(msg => {msg.delete(5000)});
    money.money = money.money + wCoins;
    money.save();
    return;
  }else{

    let losEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .addField("Pralošei😰", suma)
    .setColor("#ffc132")
    .addField("Dabar turi", money.money - suma);

    message.channel.send(losEmbed).then(msg => {msg.delete(5000)});

    money.money = money.money - args[1];
    money.save();
    return;
  }
};

if(msg.includes("SKAICIUS")){
  money.money = money.money - suma;
  money.save();
  
  //Herbas
  if(random == 0){
    wCoins = suma * 2;

    let winEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .addField("Laimėjai!💸", wCoins)
    .setColor("#ffc132")
    .addField("Dabar turi", money.money + wCoins);

    message.channel.send(winEmbed).then(msg => {msg.delete(5000)});
    money.money = money.money + wCoins;
    money.save();
    return;
  }else{

    let losEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .addField("Pralošei😰", suma)
    .setColor("#ffc132")
    .addField("Dabar turi", money.money - suma);

    message.channel.send(losEmbed).then(msg => {msg.delete(5000)});

    money.money = money.money - args[1];
    money.save();
    return;
  }
};


  })
}

module.exports.help = {
  name: "flip"
}
