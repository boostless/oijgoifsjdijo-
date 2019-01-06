const Discord = require("discord.js");
const fs = require("fs");


module.exports.run = async (bot, message, args)=>{
  const msg = message.content.toUpperCase();
  let uAdd = message.member;
  let sCoins = coins[message.author.id].coins;
  let viprole = message.guild.roles.find(role => role.name === "VIP");
  let djrole = message.guild.roles.find(role => role.name === "DJ");
  let memrole = message.guild.roles.find(role => role.name === "Member+");

 if(!args[0] || args[0 == "help"]){
   let shopEmbed = new Discord.RichEmbed()
   .setTitle("**Parduotuvė**")
   .setColor("#fcc45d")
   .addField("🤑Kainos🤑" , `Tu dabar turi ${sCoins} žetonu`)
   .addField("Member+", "150", true)
   .addField("DJ", "250", true)
   .addField("VIP", "500", true);
   message.channel.send(shopEmbed).then(msg => {msg.delete(6000)});
   return;
 }

  if(msg.includes("VIP")){
    if(sCoins >= 500){
      coins[message.author.id] = {
        coins: sCoins - 500
      };
      uAdd.addRole(viprole).catch(console.error);
      return;
    };
  message.reply("tu neturi pakankamai žetonu!").then(msg =>{msg.delete(5000)});
 }

 if(msg.includes("DJ")){
   if(sCoins >= 250){
     coins[message.author.id] = {
       coins: sCoins - 250
     };
     uAdd.addRole(djrole).catch(console.error);
     return;
   };
 message.reply("tu neturi pakankamai žetonu!").then(msg =>{msg.delete(5000)});
}

if(msg.includes("MEMBER+")){
  if(sCoins >= 150){
    coins[message.author.id] = {
      coins: sCoins - 150
    };
    uAdd.addRole(memrole).catch(console.error);
    return;
  };
message.reply("tu neturi pakankamai žetonu!").then(msg =>{msg.delete(5000)});
}

fs.writeFile("./coins.json", JSON.stringify(coins), (err) =>{
  if(err) console.log(err);
});

}

module.exports.help = {
  name: "buy"
}
