const http = require('http');
const express = require('express');
const app = express();
const leveling = require("./commands/events/leveling.json");
app.get("/", (request, response) => {
  console.log(Date.now() + "Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`); 
}, 280000);

const fs = require('fs')
const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const client = new Discord.Client();
bot.commands = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  
  if(jsfile.length <= 0){
    console.log("Couldn't find commands")
    return;
  }
  
  setTimeout(function(){ 
    console.log("Beginning startup"); 
  }, 0);
  
  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`)
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });


    setTimeout(function(){ 
      console.log("I should be up and running!"); 
    }, 1000)
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity("-help", {type: "Playing"});

});

bot.on('guildMemberAdd', member => {
  
  console.log('User ' + member.user.username + '#' + member.user.discriminator + ' has joined the server!')

  var role = member.guild.roles.find('name', 'Members');
  
  member.addRole(role)
});

bot.on("message", async message => {
  if(message.author.bot) return;
  let ids = ('385067115226595339')
  if (message.author.id === ids) return  
  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(command.slice(prefix.length));
  if (!message.content.startsWith(prefix)) return;
  if(commandfile) commandfile.run(bot,message,args);
  var author = message.author;
})

bot.on("message", (message) => {
    let ids = ["198439918647771136", "644811269123211272", "547907138840690695","","588197117869162506","656310275171024896","172664698091601920","681001419880398866","418211560213970945","569308933030805504","691793056306823199"]
  if (ids.includes(message.author.id)) {
  if (!message.content.includes("-DadDelete-")) return; {
    message.delete();
  }
}
});

bot.on("message", (message) => {
    let ids = ["198439918647771136", "644811269123211272", "547907138840690695","","588197117869162506","656310275171024896","172664698091601920","681001419880398866","418211560213970945","569308933030805504","691793056306823199"]
  if (ids.includes(message.author.id)) {
  if (!message.content.includes("-daddelete-")) return; {
    message.delete();
  }
}
});
 
bot.on("message", (message) => {
    let ids = ["198439918647771136", "644811269123211272", "547907138840690695","","588197117869162506","656310275171024896","172664698091601920","681001419880398866","418211560213970945","569308933030805504","691793056306823199","446416793557270539"]
  if (ids.includes(message.author.id)) {
  if (!message.content.includes("-dd-")) return; {     //Oh GG I should do that too, yes you should
    message.delete();
  }
}
});


bot.on("message", async message => {
let ids = ('385067115226595339')
if (message.author.id === ids) return 
if(message.author.bot) return;
if (!leveling[message.author.id]){
  leveling[message.author.id] = {
    messagesSent: 0,
    level: 0,
    MessagesUntilNextLevel: 10
  }
}

  leveling[message.author.id].messagesSent++;
  
  if (leveling[message.author.id].messagesSent >+ leveling[message.author.id].MessagesUntilNextLevel){
    leveling[message.author.id].level++;
    leveling[message.author.id].MessagesUntilNextLevel *= leveling.multi;
    message.channel.send("Congrats " + message.author.toString() + " on reaching level " + leveling[message.author.id].level + "!");  
  }
  
  fs.writeFileSync("./commands/events/leveling.json", JSON.stringify(leveling, null, 2), function(err){
    if (err){
      console.log(err);
    }
  });
  
  bot.deletedMessages = new Discord.Collection()
bot.on("messageDelete", msg => bot.deletedMessages.set(msg.channel.id, msg))
  
  bot.deletedMessages = new Discord.Collection()
  bot.on("messageDelete", msg => {
  bot.deletedMessages.set(msg.id, msg)
  console.log(`Totally ${bot.deletedMessages.size} deleted messages stored!`)
})
  
});

bot.on("guildCreate", guild => {
    let channelID;
    let channels = guild.channels;
    channelLoop:
    for (let c of channels) {
        let channelType = c[1].type;
        if (channelType === "text") {
            channelID = c[0];
            break channelLoop;
        }
    }

    let channel = bot.channels.get(guild.systemChannelID || channelID);
    channel.send("Thanks for inviting me into this server! The default prexfix is `-`");
});

bot.login(config.token);
