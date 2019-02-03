const Discord = require("discord.js");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOOSE, {
  useNewUrlParser: true });//MOngoose database connect


  const Money = require("../models/money.js");
    let cooldown = new Set();


module.exports.run = async (bot, message, args)=>{

  await message.delete();

  const msg = message.content.toUpperCase();

  let dj = message.guild.roles.find(role => role.name === "DJ");
  let member = message.guild.roles.find(role => role.name === "Member+");
  let vip = message.guild.roles.find(role => role.name === "VIP");
  //Chekinam ar nieko nera parasyta
if(!args[0])
{
let buyMenuembed = new Discord.RichEmbed()
.setColor("#ffc132")
.setTitle("*Parduotuve*")
.setDescription("Kainos")
.addField("DJ", "1000 Žetonu", true)
.addField("Member+", "2000 Žetonu", true)
.addField("VIP", "4000 Žetonu", true);

message.channel.send(buyMenuembed).then(msg => {msg.delete(8000)});
}

//DJ rolas nusipirkimas
  if(msg.includes("DJ"))
  {
    if(message.member.roles.has(dj.id)) //Chekinam ar jau yra nuspirkes sita role
    {
    message.reply("Tu jau esi nusipirkes DJ rola!").then(msg => {msg.delete(5000)});
    return;
  }
    Money.findOne({
      userID: message.author.id,
      serverID: message.guild.id
    }, (err, money) => {
      if(err) console.log(err);


      let coins = money.money;

      let sumadj = 1000 * 1;

      if(args[1] === String) return message.reply("Tu negali rašyti žodžiu").then(msg => {msg.delete(5000)});//check if zodis

      if(args[1] < 0) return message.reply("Tu negali rašyti minusinio skaičio").then(msg => {msg.delete(5000)});

      if(coins < 1) return message.reply("Tu neturi žetonu").then(msg => {msg.delete(5000)});//Ziuri ar turi zetonu

      if(coins < 1000) return message.reply("Tu neturi tiek žetonu").then(msg => {msg.delete(5000)});//Ziuri ar dedi nedaugiau

      money.money = money.money - sumadj

      let djEmbed = new Discord.RichEmbed()
      .setTitle("Sekmingai nusipirkai DJ rola!")
      .setDescription(message.author)
      .setColor("#389937")
      .setFooter(`Dabar turi ${money.money} žetonu`, message.author.displayAvatarURL);
      message.channel.send(djEmbed).then(msg => {msg.delete(5000)})
      message.member.addRole(dj);
      money.save();

    })
  }

  //Member+ rolas nusipirkimas
    if(msg.includes("MEMBER+"))
    {
      if(message.member.roles.has(member.id)) //Chekinam ar jau yra nuspirkes sita role
      {
      message.reply("Tu jau esi nusipirkes Member+ rola!").then(msg => {msg.delete(5000)});
      return;
    }
      Money.findOne({
        userID: message.author.id,
        serverID: message.guild.id
      }, (err, money) => {
        if(err) console.log(err);


        let coins = money.money;

        let sumamem = 2000 * 1;

        if(args[1] === String) return message.reply("Tu negali rašyti žodžiu").then(msg => {msg.delete(5000)});//check if zodis

        if(args[1] < 0) return message.reply("Tu negali rašyti minusinio skaičio").then(msg => {msg.delete(5000)});

        if(coins < 1) return message.reply("Tu neturi žetonu").then(msg => {msg.delete(5000)});//Ziuri ar turi zetonu

        if(coins < 2000) return message.reply("Tu neturi tiek žetonu").then(msg => {msg.delete(5000)});//Ziuri ar dedi nedaugiau

        money.money = money.money - sumamem

        let memEmbed = new Discord.RichEmbed()
        .setTitle("Sekmingai nusipirkai Member+ rola!")
        .setDescription(message.author)
        .setColor("#fcbf44")
        .setFooter(`Dabar turi ${money.money} žetonu`, message.author.displayAvatarURL);
        message.channel.send(memEmbed).then(msg => {msg.delete(5000)})
        message.member.addRole(member);
        money.save();

      })
    }

    //Vip rolas nusipirkimas
      if(msg.includes("VIP"))
      {
        if(message.member.roles.has(vip.id)) //Chekinam ar jau yra nuspirkes sita role
        {
        message.reply("Tu jau esi nusipirkes VIP rola!").then(msg => {msg.delete(5000)});
        return;
      }
        Money.findOne({
          userID: message.author.id,
          serverID: message.guild.id
        }, (err, money) => {
          if(err) console.log(err);


          let coins = money.money;

          let sumavip = 4000 * 1;

          if(args[1] === String) return message.reply("Tu negali rašyti žodžiu").then(msg => {msg.delete(5000)});//check if zodis

          if(args[1] < 0) return message.reply("Tu negali rašyti minusinio skaičio").then(msg => {msg.delete(5000)});

          if(coins < 1) return message.reply("Tu neturi žetonu").then(msg => {msg.delete(5000)});//Ziuri ar turi zetonu

          if(coins < 4000) return message.reply("Tu neturi tiek žetonu").then(msg => {msg.delete(5000)});//Ziuri ar dedi nedaugiau

          money.money = money.money - sumavip;

          let memEmbed = new Discord.RichEmbed()
          .setTitle("Sekmingai nusipirkai VIP rola!")
          .setDescription(message.author)
          .setColor("#f4e542")
          .setFooter(`Dabar turi ${money.money} žetonu`, message.author.displayAvatarURL);
          message.channel.send(memEmbed).then(msg => {msg.delete(5000)})
          message.member.addRole(vip);
          money.save();

        })
      }

}


module.exports.help = {
  name: "buy"
}
