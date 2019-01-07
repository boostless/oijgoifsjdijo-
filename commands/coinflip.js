const Discord = require("discord.js");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOOSE, {
  useNewUrlParser: true });

  const Money = require("../models/money.js");
    let cooldown = new Set();
  module.exports.run = async (bot, message, args)=>{
    
    
    if(message.channel.id !== "531499576398708736") return message.reply("Tu negali naudoti šitos komandos čia eik i gamble chaneli!").then(msg => {msg.delete(5000)});//Chekinam ar komanda rasoma i teisinga chaneli

    if(cooldown.has(message.author.id)){
      message.channel.send("**Šita komanda gali naudoti tik kas 15 sekundžiu**").then(msg => {msg.delete(5000)});
      message.delete();
      return;
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 15000);


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

      if(err) console.log(err);

      if(!args[0]) return message.reply("herbas/skaicius suma").then(msg => {msg.delete(5000)});//help

      if(!args[1]) return message.reply("Nenurodei sumos").then(msg => {msg.delete(5000)});//ziurim ar nuroode suma

      if(args[1] === String) return message.reply("Tu negali rašyti žodžiu").then(msg => {msg.delete(5000)});//check if zodis

      if(args[1] < 0) return message.reply("Tu negali rašyti minusinio skaičio").then(msg => {msg.delete(5000)});

      if(coins < 1) return message.reply("Tu neturi žetonu").then(msg => {msg.delete(5000)});//Ziuri ar turi zetonu

      if(coins < suma) return message.reply("Tu neturi tiek žetonu").then(msg => {msg.delete(5000)});//Ziuri ar dedi nedaugiau kiek turi




  if(msg.includes("HERBAS") || msg.includes("H")){
    //Herbas
    money.money = money.money - suma;

    if(random == 0){
      wCoins = suma * 2;

      let winEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.username)
      .addField("Laimėjai!💸", wCoins)
      .setColor("#ffc132")
      .addField("Dabar turi", money.money + wCoins);

      message.channel.send(winEmbed).then(msg => {msg.delete(7000)});
      money.money = money.money + wCoins;

    }else{

      let losEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.username)
      .addField("Pralošei😰", suma)
      .setColor("#ffc132")
      .addField("Dabar turi", money.money);

      message.channel.send(losEmbed).then(msg => {msg.delete(7000)});

 
      
    }
   money.save();
    return;

  };

  if(msg.includes("SKAICIUS") || msg.includes("S")){
    money.money = money.money - suma;


    //Herbas
    if(random == 0){
      wCoins = suma * 2;

      let winEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.username)
      .addField("Laimėjai!💸", wCoins)
      .setColor("#ffc132")
      .addField("Dabar turi", money.money + wCoins);

      message.channel.send(winEmbed).then(msg => {msg.delete(7000)});
      money.money = money.money + wCoins;

    }else{

      let losEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.username)
      .addField("Pralošei😰", suma)
      .setColor("#ffc132")
      .addField("Dabar turi", money.money);

      message.channel.send(losEmbed).then(msg => {msg.delete(7000)});



    }
    money.save();
    return;
  };


    })

  }

  module.exports.help = {
    name: "flip"
  }
