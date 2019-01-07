const Botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const mongoose = require("mongoose");
const fs = require("fs")
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
mongoose.connect(process.env.MONGOOSE, {//Replace process.env.MONGOOSE to "<your mongoose login>"
  useNewUrlParser: true });//MongoDB data base
const Money = require("./models/money.js");
const XP = require("./models/xp.js");

fs.readdir("./commands", (err, files) => {
  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
      console.log("Neradau komandu");
      return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} užkrautas!`);
    bot.commands.set(props.help.name, props);
  });

});



bot.on("ready", async () => {
  console.log(`${bot.user.username}`);
  //Cia paraso ka botas veikia tai dabar rasys Watching Patruliuoja
  bot.user.setActivity("Patruliuoja", {type: "WATCHING"});
});

//auto role add
bot.on("guildMemberAdd", member => {
  console.log("Žmogus vardu " + member.user.username + " katik prisijunge!")

  let role = member.guild.roles.find(role => role.name === "Member");

  member.addRole(role)
});



bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type == "dm") return;

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: Botconfig.prefix
    };
  }

  let prefix = prefixes[message.guild.id].prefixes;


  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  if(prefix == cmd.slice(0,1)){
    let commandFile = bot.commands.get(cmd.slice(prefix.length));
    if(commandFile) commandFile.run(bot,message,args);
  };﻿
  const sender = message.author;
  const msg = message.content.toUpperCase();


  //chat filter
  if(msg.includes("NIGGER") || msg.includes("NIBBER") || msg.includes("NIGERIS") || msg.includes("NIBERIS") || msg.includes("NIGER") || msg.includes("NIBER") || msg.includes("N-I-B-B-E-R") || msg.includes("N-I-G-G-E-R") || msg.includes("N-I-G-E-R-I-S"))
  {
    let fUser = message.author;


    let filterEmbed = new Discord.RichEmbed()
    .setDescription("ChatFilteris")
    .setColor("#48f442")
    .addField("Panaudojo uždrausta žodi", `${fUser}`)
    .addField("Kokiam chaneli", message.channel);

    let filterchanel = message.guild.channels.find(`name`, "reportai_ismesti_banai");
    if(!filterchanel) return message.channel.send("Neradau chanelio");
    message.delete().catch(O_o=>{});

    filterchanel.send(filterEmbed);

  };


  //ping


  if (cmd == `${prefix}ping`)
  {
    message.channel.send("Pong!");
  };


  //mongoose coins
  let coinAmt = Math.ceil(Math.random() * 15) + 1;
  let baseAmt = Math.ceil(Math.random() * 15) + 1;

console.log(`${baseAmt} ; ${coinAmt}`);
  Money.findOne({
    userID: message.author.id,
    serverID: message.guild.id
  }, (err, money) => {
    if(err)console.log(err);
    if(!money){
      const newMoney = new Money ({
        userName: message.member.user.username,
        userID: message.author.id,
        serverID: message.guild.id,
        money: 0
      })

      newMoney.save().catch(err => console.log(err));
    }
    if(coinAmt === baseAmt)
    {
      let coinAdd = new Discord.RichEmbed()
      .setAuthor(message.author.username)
      .setColor("#ffc132")
      .addField("💰", `${coinAmt} žetonu pridėta!`);
      money.money = money.money + coinAmt;
      money.save().catch(err => console.log(err));
      message.channel.send(coinAdd).then(msg => {msg.delete(5000)});
    }
  })



  //mongoose xp sytem

  let xpAdd = Math.ceil(Math.random() * 7) + 5;

  XP.findOne({
    userID: message.author.id
  }, (err, xp) => {
    if(err)console.log(err);
    if(!xp){

      const newLevel = new XP ({
        userName: message.member.user.username,
        userID: message.author.id,
        serverID: message.guild.id,
        xp: xpAdd,
        level: 1
      })
      newLevel.save().catch(err => console.log(err));
    }else{
      //leveling system
      let curxp = xp.xp;
      let curlvl = xp.level;
      let nxtlvl = xp.level * 350;

      xp.xp = curxp + xpAdd;

      if(nxtlvl <= xp.xp){
        xp.level = curlvl + 1; //levelup system

        let lvlup = new Discord.RichEmbed()
        .setTitle("🚨Pasikelei Lygi!🚨")
        .setColor("#a3ffba")
        .addField("Dabar tavo lygis yra", curlvl + 1);
        message.channel.send(lvlup).then(msg => {msg.delete(5000)})
      }



      xp.save().catch(err => console.log(err));

    };
})

});


bot.login(process.env.TOKEN);//Replace process.env.TOKEN with "<yourbots token>"
