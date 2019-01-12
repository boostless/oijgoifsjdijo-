const Discord = require("discord.js");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOOSE, {
  useNewUrlParser: true });//MOngoose database connect
 const Money = require("../models/money.js");

module.exports.run = async (bot, message, args)=>{
  //$send @name amount
  let tosend = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  //gaunam zmogu kam reikia nusiusti pinigu
  if(!tosend) return message.reply("Tokio žmogaus nera").then(msg => {msg.delete(5000)}); //Chekinam ar yra toks zmogus

  if(message.author.id === tosend.id) return message.reply("Tu negali nusiusti pinigu sau")//Chekinam ar zmogus bando sau nusisiuti pingu

  let suma = args[1] * 1;

  let author = message.member.user.username;

  if(!args[1]) return message.reply("Nenurodei sumos").then(msg => {msg.delete(5000)});//ziurim ar nuroode suma

  if(args[1] < 0) return message.reply("Tu negali rašyti minusinio skaičio").then(msg => {msg.delete(5000)});


  //Numinusuojam suma kuria norim nusiusti
  Money.findOne({
    userID: message.author.id,
    serverID: message.guild.id
  }, (err, money) => {
    if(err) console.log(err);

    coins = money.money;

    if(coins < 1){
      message.reply("Tu neturi žetonu").then(msg => {msg.delete(5000)});//Ziuri ar turi zetonu
      return;
    }

    if(coins < suma){
      message.reply("Tu neturi tiek žetonu").then(msg => {msg.delete(5000)});//Ziuri ar dedi nedaugiau
      return;
    }

    money.money = money.money - suma;

    let giveEmbed = new Discord.RichEmbed()
    .setColor("#ffc132")
    .setAuthor(message.author.username)
    .addField(`Tu nusiuntei ${suma} žetonu, ${tosend.user.username}!`, `Dabar turi ${money.money - suma}`);
    message.channel.send(giveEmbed).then(msg => {msg.delete(6000)});

    money.save();

    Money.findOne({
      userID: tosend.id,
      serverID: message.guild.id
    }, (err, money) => {
      if(err) console.log(err);
      money.money = money.money + suma;

      let gaveEmbed = new Discord.RichEmbed()
      .setColor("#ffc132")
      .setAuthor(tosend.user.username)
      .addField(`${author} tau atsiunte ${suma} žetonu!💸`, `Dabar turi ${money.money + suma}`);

      message.channel.send(gaveEmbed).then(msg => {msg.delete(6000)});
      money.save();
      return;

    })
  })


  //Pridedam pinigus prie tosend zmogaus

  // Money.findOne({
  //   userID: tosend.id,
  //   serverID: message.guild.id
  // }, (err, money) => {
  //   if(err) console.log(err);
  //   money.money = money.money + suma;
  //
  //   let gaveEmbed = new Discord.RichEmbed()
  //   .setColor("#ffc132")
  //   .setAuthor(tosend.user.username)
  //   .addField(`${author} tau atsiunte ${suma} žetonu!💸`, `Dabar turi ${money.money + suma}`);
  //
  //   message.channel.send(gaveEmbed).then(msg => {msg.delete(6000)});
  //   money.save();
  //   return;
  //
  // })

}

module.exports.help = {
  name: "give"
}
