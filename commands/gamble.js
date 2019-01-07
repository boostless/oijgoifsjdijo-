const Discord = require("discord.js");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOOSE, {
  useNewUrlParser: true });//MOngoose database connect

const Money = require("../models/money.js");
let cooldown = new Set();
module.exports.run = async (bot, message, args)=>{

  await message.delete();

  if(message.channel.id !== "531499576398708736") return message.reply("Tu negali naudoti šitos komandos čia eik i gamble chaneli!");//Chekinam ar komanda rasoma i teisinga chaneli
  
  //Cooldown sistema
  if(cooldown.has(message.author.id)){
    message.channel.send("**Šita komanda gali naudoti kas 10 sekundžiu**").then(msg => {msg.delete(5000)});
    return;
  }
  cooldown.add(message.author.id);
  setTimeout(() => {
    cooldown.delete(message.author.id);
  }, 10000);


  const msg = message.content.toUpperCase();
  let randomN = Math.floor(Math.random() * 36);//Random numbers
  let suma = args[1];

  Money.findOne({
    userID: message.author.id, //Chekinam koks cia zmogus raso
  serverID: message.guild.id
  }, (err, money) => {
    if(err)console.log(err);

    let coins = money.money;

    if(!args[0]) return message.reply("juoda;j/raudona;r/zalia;z suma").then(msg => {msg.delete(5000)});//help

    if(!args[1]) return message.reply("Nenurodei sumos").then(msg => {msg.delete(5000)});//ziurim ar nuroode suma

    if(args[1] === String) return message.reply("Tu negali rašyti žodžiu").then(msg => {msg.delete(5000)});//check if zodis

    if(args[1] < 0) return message.reply("Tu negali rašyti minusinio skaičio").then(msg => {msg.delete(5000)});

    if(coins < 1) return message.reply("Tu neturi žetonu").then(msg => {msg.delete(5000)});//Ziuri ar turi zetonu

    if(coins < suma) return message.reply("Tu neturi tiek žetonu").then(msg => {msg.delete(5000)});//Ziuri ar dedi nedaugiau




    if(msg.includes("RAUDONA") || msg.includes("R"))//Raudonas isredejimas
    {
      money.money= money.money - suma;//Atemam suma kuria idejo

      if(randomN%2===0)//Chekinam ar skaicius yra lyginis
      {
        if(randomN === 0){//Checkinam ar skaicius yra 0


          let greenLos = new Discord.RichEmbed()//Embedas kuris raso kad laimejai
          .setColor("#87ef1f")
          .setAuthor(message.author.username)
          .addField("Pralošei😰", `${wCoins}, išredėjo ${randomN} 💚`)
          .addField("Dabar turi", money.money);

          message.channel.send(greenLos).then(msg => {msg.delete(7000)});


        }else{

          wCoins = suma * 2//Padauginam laimejimus

          let redWin = new Discord.RichEmbed()//Embedas kuris raso kad laimejai
          .setColor("#f44242")
          .setAuthor(message.author.username)
          .addField("Laimėjai!💸", `${wCoins}, išredėjo ${randomN} 🔴`)
          .addField("Dabar turi", money.money + wCoins);

          message.channel.send(redWin).then(msg => {msg.delete(7000)});
          money.money = money.money + wCoins;
        }
      }else{


        let blackLos = new Discord.RichEmbed()//Embedas kuris raso kad pralosei
        .setColor("#3f3f3f")
        .setAuthor(message.author.username)
        .addField("Pralošei😰", `${suma}, išredėjo ${randomN} ⚫`)
        .addField("Dabar turi", money.money);

        message.channel.send(blackLos).then(msg => {msg.delete(7000)});

      }
      money.save();
      return;

    }


    if(msg.includes("JUODA") || msg.includes("J"))//Juodas isredejimas
    {
      money.money= money.money - suma;

      if(randomN%2===0)//Chekinam ar skaicius yra lyginis
      {
        if(randomN === 0){//Checkinam ar skaicius yra 0


          let greenLos = new Discord.RichEmbed()//Embedas kuris raso kad laimejai
          .setColor("#87ef1f")
          .setAuthor(message.author.username)
          .addField("Pralošei😰", `${wCoins}, išredėjo ${randomN} 💚`)
          .addField("Dabar turi", money.money);

          message.channel.send(greenLos).then(msg => {msg.delete(7000)});


        }else{


          let redLos = new Discord.RichEmbed()//Embedas kuris raso kad laimejai
          .setColor("#f44242")
          .setAuthor(message.author.username)
          .addField("Pralošei😰", `${suma}, išredėjo ${randomN} 🔴`)
          .addField("Dabar turi", money.money);

          message.channel.send(redLos).then(msg => {msg.delete(7000)});
        }
      }else{

        wCoins = suma * 2//Padauginam laimejimus

        let blackWin = new Discord.RichEmbed()//Embedas kuris raso kad pralosei
        .setColor("#3f3f3f")
        .setAuthor(message.author.username)
        .addField("Laimėjai!💸", `${wCoins}, išredėjo ${randomN} ⚫`)
        .addField("Dabar turi", money.money + wCoins);

        message.channel.send(blackWin).then(msg => {msg.delete(7000)});

        money.money = money.money + wCoins;
      }
      money.save();
      return;
    }

    if(msg.includes("ZALIA") || msg.includes("Z")){ //checkinam ar zalias
      money.money= money.money - suma;

      if(randomN%2===0)//Chekinam ar skaicius yra lyginis
      {
        if(randomN === 0){//Checkinam ar skaicius yra 0 ir ar laimejo

          wCoins = suma * 14;

          let greenWin = new Discord.RichEmbed()//Embedas kuris raso kad laimejai
          .setColor("#87ef1f")
          .setAuthor(message.author.username)
          .addField("😱Laimėjai!😱", `${wCoins}, išredėjo ${randomN} 💚`)
          .addField("Dabar turi", money.money + wCoins);

          message.channel.send(greenWin).then(msg => {msg.delete(7000)});
          money.money = money.money + wCoins;
        }else{


          let redLos = new Discord.RichEmbed()//Embedas kuris raso kad laimejai
          .setColor("#f44242")
          .setAuthor(message.author.username)
          .addField("Pralošei😰", `${suma}, išredėjo ${randomN} 🔴`)
          .addField("Dabar turi", money.money);

          message.channel.send(redLos).then(msg => {msg.delete(7000)});
        }
      }else{

        let blackWin = new Discord.RichEmbed()//Embedas kuris raso kad pralosei
        .setColor("#3f3f3f")
        .setAuthor(message.author.username)
        .addField("Pralošei😰", `${suma}, išredėjo ${randomN} ⚫`)
        .addField("Dabar turi", money.money);

        message.channel.send(blackWin).then(msg => {msg.delete(7000)});

      }
      money.save();
      return;
    }






  })

}

module.exports.help = {
  name: "gamble"
}
