const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`); 
}, 280000);

const db = require('quick.db')
const fs = require('fs')
const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const client = new Discord.Client();
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
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
    props.help.aliases.forEach(alias => {   
    bot.aliases.set(alias, props.help.name);
    })
  });


    setTimeout(function(){ 
      console.log("I should be up and running!"); 
    }, 1000)
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity(`${bot.guilds.size} servers | -help`, {type: "Watching"});

});

bot.on('guildMemberAdd', member => {
  
  console.log('User ' + member.user.username + '#' + member.user.discriminator + ' has joined the server!')

  var role = member.guild.roles.find('name', 'Members');
  
  member.addRole(role)
});

bot.on("message", async message => {
  
  if(message.author.bot)return;
  if(message.channel.type === "dm")return;
  let prefixes = JSON.parse(fs.readFileSync("./commands/events/prefixes.json"));
  
  
  if(!prefixes[message.guild.id]){
		prefixes[message.guild.id] = {
			prefixes: "-"
		}
	}
  
  if(message.author.bot) return;
  let ids = ("385067115226595339")
  if (message.author.id === ids) return  
  let prefix = prefixes[message.guild.id].prefixes || "-"
  let args = message.content.slice(prefix.length).trim().split(' ');
  let cmd = args.shift().toLowerCase();
  let command; 
  if (!message.content.startsWith(prefix)) return;
  if(bot.commands.has(cmd)) {
    command = bot.commands.get(cmd);
  } else {
    command = bot.commands.get(bot.aliases.get(cmd));
  }
  
  if (command) command.run(bot,message,args);
  
  //let commandfile = bot.commands.get(command.slice(prefix.length));
  //if(commandfile) commandfile.run(bot,message,args);
  var author = message.author;
})

bot.on("message", (message) => {
    let ids = ["198439918647771136", "644811269123211272", "547907138840690695","","588197117869162506","656310275171024896","172664698091601920","681001419880398866","418211560213970945","569308933030805504","691793056306823199","555892702844157972"]
  if (ids.includes(message.author.id)) {
  if (!message.content.includes("-DadDelete-")) return; {
    message.delete();
  }
}
});

bot.on("message", (message) => {
    let ids = ["198439918647771136", "644811269123211272", "547907138840690695","","588197117869162506","656310275171024896","172664698091601920","681001419880398866","418211560213970945","569308933030805504","691793056306823199","555892702844157972"]
  if (ids.includes(message.author.id)) {
  if (!message.content.includes("-daddelete-")) return; {
    message.delete();
  }
}
});
 
bot.on("message", (message) => {
    let ids = ["198439918647771136", "644811269123211272", "547907138840690695","","588197117869162506","656310275171024896","172664698091601920","681001419880398866","418211560213970945","569308933030805504","691793056306823199","446416793557270539","555892702844157972"]
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
if(message.channel.type === "dm") return;
  




  db.add(`messages_${message.guild.id}_${message.author.id}`, 1)

  let messagefetch = db.fetch(`messages_${message.guild.id}_${message.author.id}`)



  let messages;

 if (messagefetch == 25) messages = 25; //Level 1

  else if (messagefetch == 65) messages = 65; // Level 2
  else if (messagefetch == 115) messages = 115; // Level 3
  else if (messagefetch == 200) messages = 200; // Level 4
  else if (messagefetch == 300) messages = 300; // Level 5
  else if (messagefetch == 450) messages = 450; // Level 6
  else if (messagefetch == 600) messages = 600; // Level 7
  else if (messagefetch == 800) messages = 800; // Level 8
  else if (messagefetch == 1025) messages = 1025; // Level 9
  else if (messagefetch == 1265) messages = 1265; // Level 10



  if (!isNaN(messages)) {

    db.add(`level_${message.guild.id}_${message.author.id}`, 1)

    let levelfetch = db.fetch(`level_${message.guild.id}_${message.author.id}`)

    

 
   message.channel.send(`Congratulations  ${message.author} On Reaching Level ${levelfetch} `)

  }



}) 
 
  
  bot.deletedMessages = new Discord.Collection()
bot.on("messageDelete", msg => bot.deletedMessages.set(msg.channel.id, msg))
  
  bot.deletedMessages = new Discord.Collection()
  bot.on("messageDelete", msg => {
  bot.deletedMessages.set(msg.id, msg)
  console.log(`Totally ${bot.deletedMessages.size} deleted messages stored!`)
})
  


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
    bot.channels.get("709483048000815126").send(`I have joined a new server named **${guild.name}** (${guild.id})`);
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") bot.channels.get("707071555641016371").send(`**${message.author.username}#${message.author.discriminator} (ID: ${message.author.id})**: ${message.content}`) 
})

bot.login(config.token);
