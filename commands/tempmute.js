const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  //!tempmute @user 1s/m/h/d

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Nera tokio vardo");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Tu negali jo užčiaupti!");
  let muterole = message.guild.roles.find(`name`, "muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("Tu nenurodei laiko!");
  //richembed


  let muteEmbed = new Discord.RichEmbed()
  .setDescription("**Mute**")
  .setColor("#f1f441")
  .addField("Užčiauptas", `${tomute} su ID: ${tomute.id}`)
  .addField("Kas užčiaupe", `${message.author} su ID: ${message.author.id}`)
  .addField("Kiek laiko", `${(ms(ms(mutetime)))}`)
  .addField("Užčiauptas kur", message.channel);


  let mutechanel = message.guild.channels.find(channel => channel.name === "reportai_ismesti_banai");//chekinam ar yra toks chanelis
  if(!mutechanel) return message.channel.send("Neradau chanelio");

  message.delete().catch(O_o=>{});
  mutechanel.send(muteEmbed);

  await(tomute.addRole(muterole.id));

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> atčiauptas!`);
  }, ms(mutetime));


//end of module
}

module.exports.help = {
  name: "tempmute"
}
