// 
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://st-sys.glitch.me/`);
}, 280000);

const { Client } = require("discord.js");
const { RichEmbed } = require("discord.js")
const { config } = require("dotenv");
const db = require("quick.db");
const ms = require("parse-ms")
const Discord = require("discord.js");
const discord = require("discord.js");
const Canvas = require('canvas');

const encode = require("strict-uri-encode");

    const fetch = require("node-fetch");
const moment = require("moment-timezone")
moment().tz("Asia/Riyadh").format();
const shorten = require("isgd");

    const { stripIndents } = require("common-tags");
const fs = require("fs")
const h = require('nomsy-paste');// Declares our bot,
// the disableEveryone prevents the client to ping @everyone
const client = new Client({
    disableEveryone: true
});

config({
    path: __dirname + "/.env"
})

client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);

    // Set the user presence
    client.user.setPresence({
        status: "dnd",
        game: {
            name: "S T A R T",
            type: "WATCHING"
        }
    }); 
  
 
})


//       message.channel.send(`> **${emoji("666085646103871518")} - \`Done, Successfully set a ticket logs channel to: \` ${channel}**`)


function emoji(id) {
    return client.emojis.cache.get(id);
  }


let prefix = "^"
client.on("message", async message => {
 
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
  
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
  
  // ------------------------------- profile start ----------------------------------
      
      let UserName = await db.fetch(`UserName_${message.author.id}`)
      if(UserName === null) UserName = "none"
  
   let UserAge = await db.fetch(`UserAge_${message.author.id}`)
      if(UserAge === null) UserAge = "none"
  
   let UserCountry = await db.fetch(`UserCountry_${message.author.id}`)
      if(UserCountry === null) UserCountry = "none"
  
  let UserGender = await db.fetch(`UserGender_${message.author.id}`)
      if(UserGender === null) UserGender = "none"
  
  let UserHobbies = await db.fetch(`UserHobbies_${message.author.id}`)
    if(UserHobbies === null) UserHobbies = "none"
  
  let UserBio = await db.fetch(`UserBio_${message.author.id}`)
  if(UserBio === null) UserBio = "none"

   let RegisterMode = await db.fetch(`RegisterMode_${message.author.id}`)
      if(RegisterMode === null) RegisterMode = "off"
  
  if(cmd === `register`) {
    if(RegisterMode === "on") return message.channel.send(`> **${emoji("630249377621082124")} - \`Sorry, You have already registred\`**`)
    
      var filter = m => m.author.id === message.author.id;

    let name;
    let mode;
    
     message.channel.send(`> **${emoji("689999609136676923")} - \`Please Type Your Real name now.... \`**`).then(msg => {
 
 
 
    message.channel.awaitMessages(filter, {
 
      max: 1,
 
      time: 90000,
 
      errors: ['time']
 
    })
        .then(collected => {
 
      collected.first().delete();
 
      name = collected.first().content;
 
      let age;
      
          msg.edit(`> **${emoji("689999609136676923")} - \`Please Type Your Age now.... \`**`).then(msg => {
 
    
 
          message.channel.awaitMessages(filter, {
 
            max: 1,
 
            time: 90000,
 
            errors: ['time']
 
          })
             .then(collected => {
             
           collected.first().delete();
 
            age = collected.first().content;
 
            let country;
            
            if(isNaN(age)) return message.reply(`> **${emoji("630249377621082124")} - \`Sorry, Age with numbers only !, try register again\`**`)

              msg.edit(`> **${emoji("689999609136676923")} - \`Please Type Your Country now.... \`**`).then(msg => {
 
              message.channel.awaitMessages(filter, {
 
                max: 1,
 
                time: 90000,
 
                errors: ['time']
 
              })
                
                   .then(collected => {
 
            collected.first().delete();
 
            country = collected.first().content;
 
            let gender;
                
                 msg.edit(`> **${emoji("689999609136676923")} - \`Please Type Your Gender [boy, girl] .... \`**`).then(msg => {
 
 
 
              message.channel.awaitMessages(filter, {
 
                max: 1,
 
                time: 90000,
 
                errors: ['time']
 
              })
                   
                    .then(collected => {
 
                let correct = [`boy`, `girl`]
                collected.first().delete();
 
              gender = collected.first().content;
 
                if(!correct.includes(gender)) return message.channel.send(`> **${emoji("630249377621082124")} - \`Sorry, Gender is only "boy" or "girl", please choose one !\`**`)
                            let hobbies;

                  msg.edit(`> **${emoji("689999609136676923")} - \`Now please type all your favorite hobbies.... \`**`).then(msg => {
 
 
 
              message.channel.awaitMessages(filter, {
 
                max: 1,
 
                time: 90000,
 
                errors: ['time']
 
              })
                     .then(collected => {
 
                collected.first().delete();
 
              hobbies = collected.first().content;
                
                let bio;
                  msg.edit(`> **${emoji("689999609136676923")} - \`Finally, write a description about you.... \`**`).then(msg => {
 
 
 
              message.channel.awaitMessages(filter, {
 
                max: 1,
 
                time: 90000,
 
                errors: ['time']
 
              })
                     .then(collected => {
 
                collected.first().delete();
 
              bio = collected.first().content;
 
      msg.edit(`> **${emoji("689999609136676923")} - \`Are you sure for your register?, [yes / no] \`**`);
                 message.channel.awaitMessages(response => response.content === 'yes' || 'no' && filter,{
 
        max: 1,
 
        time: 90000,
 
        errors: ['time']
 
      })
                      .then(collected => {
                   
                       if(collected.first().content === 'no') {
 
          msg.delete();
 
          message.delete();
 
              message.channel.send(`> **${emoji("666085646103871518")} - \`Register canceled\`**`)                 
          mode = false;
 
        }
                   
                      if(collected.first().content === 'yes') {
 
          if(mode === false) return;
 
          msg.edit(`> **${emoji("666085646103871518")} - \`Done, Seccessfully registred in skyhost\`**`);
 
          collected.first().delete();
                        
                          db.set(`UserName_${message.author.id}`, name)
                        db.set(`UserAge_${message.author.id}`, age)
                        db.set(`UserCountry_${message.author.id}`, country)
                        db.set(`UserGender_${message.author.id}`, gender)
                        db.set(`UserHobbies_${message.author.id}`, hobbies)
                        db.set(`UserBio_${message.author.id}`, bio)
                        db.set(`RegisterMode_${message.author.id}`, `on`)

                        
                        
                        
                      
                      }
 
                   
                 })
                
              })
                  })
              }) 
 
                  })
                
              })
                 })
              })
 
              })
          })
          })
    
    })
     })    
  }
  
  if(cmd === `wor`) {
    
  }
  
  
  if(cmd === `user-modify`) {
    if(RegisterMode === "off") return message.channel.send(`> **${emoji("630249377621082124")} - \`You're not registred !\`**`)
    
    let mods = ["name", "age", "country", "gender", "hobbies", "bio"]
    if(!args[0] || !mods.includes(args[0])) return message.channel.send(`> **${emoji("689999609136676923")} - \`Please choose one of this to modify :\`** \n > **\`${mods[0]} | ${mods[1]} | ${mods[2]} | ${mods[3]} | ${mods[4]} | ${mods[5]}\`**`)

        if(args[0] === "name") {
          
           var filter = m => m.author.id === message.author.id;
          
          let n;
 message.channel.send(`> **${emoji("689999609136676923")} - \`Please Type Your New Name Now.... \`**`).then(msg => {
 
 
 
    message.channel.awaitMessages(filter, {
 
      max: 1,
 
      time: 90000,
 
      errors: ['time']
 
    })
        .then(collected => {
 
      collected.first().delete();
 
      n = collected.first().content;
       
    db.set(`UserName_${message.author.id}`, n)
    message.channel.send(`> **${emoji("689999609136676923")} - \`Done, Successfully changed your name to: ${n}\`**`)
    })
 })
          
        }
    
     if(args[0] === "age") {
          
           var filter = m => m.author.id === message.author.id;
          
          let a;
 message.channel.send(`> **${emoji("689999609136676923")} - \`Please Type Your New Age Now.... \`**`).then(msg => {
 
 
 
    message.channel.awaitMessages(filter, {
 
      max: 1,
 
      time: 90000,
 
      errors: ['time']
 
    })
        .then(collected => {
 
      collected.first().delete();
 
      a = collected.first().content;
      
                   if(isNaN(a)) return message.reply(`> **${emoji("630249377621082124")} - \`Sorry, Age with numbers only !, try register again\`**`)

    db.set(`UserAge_${message.author.id}`, a)
    message.channel.send(`> **${emoji("689999609136676923")} - \`Done, Successfully changed your age to: ${a}\`**`)
    })
 })      
        }
   
     if(args[0] === "country") {
          
           var filter = m => m.author.id === message.author.id;
          
          let n;
 message.channel.send(`> **${emoji("689999609136676923")} - \`Please Type Your Country Now.... \`**`).then(msg => {
 
 
 
    message.channel.awaitMessages(filter, {
 
      max: 1,
 
      time: 90000,
 
      errors: ['time']
 
    })
        .then(collected => {
 
      collected.first().delete();
 
      n = collected.first().content;
       
    db.set(`UserCountry_${message.author.id}`, n)
    message.channel.send(`> **${emoji("689999609136676923")} - \`Done, Successfully changed your name to: ${n}\`**`)
    })
 })
          
        }
    
     if(args[0] === "gender") {
          
           var filter = m => m.author.id === message.author.id;
          
          let n;
 message.channel.send(`> **${emoji("689999609136676923")} - \`Please Type Your Gender Now.... \`**`).then(msg => {
 
 
 
    message.channel.awaitMessages(filter, {
 
      max: 1,
 
      time: 90000,
 
      errors: ['time']
 
    })
        .then(collected => {
 
      
                      let correct = ["boy", "girl"]
      n = collected.first().content;

if(!correct.includes(n)) return message.channel.send(`> **${emoji("630249377621082124")} - \`Sorry, Gender is only "boy" or "girl", please choose one !\`**`)
      
      collected.first().delete();
 
       
    db.set(`UserGender_${message.author.id}`, n)
    message.channel.send(`> **${emoji("689999609136676923")} - \`Done, Successfully changed your gender to: ${n}\`**`)
    })
 })
          
        }
    
     if(args[0] === "hobbies") {
          
           var filter = m => m.author.id === message.author.id;
          
          let n;
 message.channel.send(`> **${emoji("689999609136676923")} - \`Please Type Your Hobbies Now.... \`**`).then(msg => {
 
 
 
    message.channel.awaitMessages(filter, {
 
      max: 1,
 
      time: 90000,
 
      errors: ['time']
 
    })
        .then(collected => {
 
      collected.first().delete();
 
      n = collected.first().content;
       
    db.set(`UserHobbies_${message.author.id}`, n)
    message.channel.send(`> **${emoji("689999609136676923")} - \`Done, Successfully changed your Favorite Hobbies to: ${n}\`**`)
    })
 })
          
        }
    
     if(args[0] === "bio") {
          
           var filter = m => m.author.id === message.author.id;
          
          let n;
 message.channel.send(`> **${emoji("689999609136676923")} - \`Please Type Your Bio Now.... \`**`).then(msg => {
 
 
 
    message.channel.awaitMessages(filter, {
 
      max: 1,
 
      time: 90000,
 
      errors: ['time']
 
    })
        .then(collected => {
 
      collected.first().delete();
 
      n = collected.first().content;
       
    db.set(`UserBio_${message.author.id}`, n)
    message.channel.send(`> **${emoji("689999609136676923")} - \`Done, Successfully changed your Bio to: ${n}\`**`)
    })
 })
          
        }
    
    
  }
  
  if(cmd === `profile`) {
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
    if(!user) user = message.author
    
     let RegisterMode1 = await db.fetch(`RegisterMode_${user.id}`)
      if(RegisterMode1 === null) RegisterMode1 = "off"
    
    if(RegisterMode1 === "off") return message.channel.send(`> **${emoji("630249377621082124")} - \`User is not registred\`**`)
    
    let marry = await db.fetch(`marry_${user.id}`)
if(marry === null) marry = "Not Married"
    
    let marryMode = await db.fetch(`MarryMode_${user.id}`)
if(marryMode === null) marryMode = "off"
    
     let UserName1 = await db.fetch(`UserName_${user.id}`)
      if(UserName1 === null) UserName1 = "none"
  
   let UserAge1 = await db.fetch(`UserAge_${user.id}`)
      if(UserAge1 === null) UserAge1 = "none"
  
   let UserCountry1 = await db.fetch(`UserCountry_${user.id}`)
      if(UserCountry1 === null) UserCountry1 = "none"
  
  let UserGender1 = await db.fetch(`UserGender_${user.id}`)
      if(UserGender1 === null) UserGender1 = "none"
  
  let UserHobbies1 = await db.fetch(`UserHobbies_${user.id}`)
    if(UserHobbies1 === null) UserHobbies1 = "none"
  
  let UserBio1 = await db.fetch(`UserBio_${user.id}`)
  if(UserBio1 === null) UserBio1 = "none"

    let u = message.guild.members.cache.get(marry)
    
    let m;
    if(marryMode === `off`) m = "**Not Married**"
    if(marryMode === `on`) m = `**Married To: ${u}**`
    
    let c;
    if(UserGender1 === `boy`) c = `#0099ff` 
    if(UserGender1 === `girl`) c = `#ff66b3` 
  
    
    
       let embed = new Discord.MessageEmbed()
      .setTitle(`${emoji("692951927113252895")} - ${user.username}`)
      .setColor(c)
      .setThumbnail(user.avatarURL())
      .addField(`**${user.username}'s profile**`, stripIndents`
      **- Name: \`${UserName1}\`**
      **- Age: \`${UserAge1}\`**
      **- Country: \`${UserCountry1}\`**
      **- Gender: \`${UserGender1}\`**
      **- Favorite hobbies: \`${UserHobbies1}\`**
      **- User bio: \`${UserBio1}\`**
      **- Married ? :** ${m}
`,true)  
      .setImage(`https://media.giphy.com/media/fYYb9JaU2wHx7mBQdJ/giphy.gif`)
      .setFooter(`SkyHost Bot`)
      .setTimestamp()
        message.channel.send(embed);
    
    
    
  }
  
    

  if(cmd === `marry`) {
    
        let marry = message.mentions.members.first();
        if (!marry) return message.reply("Mention someone please");

         let marryMode = await db.fetch(`MarryMode_${message.author.id}`)
if(marryMode === null) marryMode = "off"
    
    let marryMode1 = await db.fetch(`MarryMode_${marry.id}`)
if(marryMode1 === null) marryMode1 = "off"
    
     let marry2 = await db.fetch(`marry_${message.author.id}`)
if(marry2 === null) marry2 = "Not Married"
    
     let marry1 = await db.fetch(`marry_${marry.id}`)
if(marry1 === null) marry1 = "Not Married"
    
    let UserGender = await db.fetch(`UserGender_${message.author.id}`)
      if(UserGender === null) UserGender = "none"
    
    let UserGender1 = await db.fetch(`UserGender_${marry.id}`)
      if(UserGender1 === null) UserGender1 = "none"
    
    if(UserGender === `girl`) return message.channel.send(`> **${emoji("630249377621082124")} - \` Umm, I think the boy should ask for a marriage, not you \`**`) // 
    if(UserGender1 === `boy`) return message.channel.send(`> **${emoji("630249377621082124")} - \` Why are you gay ? \`**`)
    if(marryMode === "on") return message.channel.send(`> **${emoji("630249377621082124")} - \`You're already married to: ${marry.name} \`**`)
    if(marryMode1 === "on") return message.channel.send(`> **${emoji("630249377621082124")} - \`This girl is married to: ${marry1.name}\`**`)

                   var filter = m => m.author.id === marry.id && m.content.startsWith(`${prefix}accept`);
                  var filter2 = m => m.author.id === marry.id && m.content.startsWith(`${prefix}deny`);
    
                  let mode1 = false
                  let mode2 = false
      message.channel.send(`> **${emoji("651250383699705867")} ${marry}, ${message.author} \`loves you a lot and wants to marry you. Do you accept?\`**`).then(msg => {
        
            message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then(collected => {
                
            }).then(collected => {
              if(mode1 === true) return;
                db.set(`marry_${message.author.id}`, marry.id)
  db.set(`marry_${marry.id}`, message.author.id)
  db.set(`MarryMode_${message.author.id}`, "on")
  db.set(`MarryMode_${marry.id}`, "on") // Live happily from now on oh
  
  
  message.channel.send(`> **${emoji("651250383699705867")} - \`Live happily from now\` ${message.author} & ${marry} **`)
              mode2 = true
            })
        
           message.channel.awaitMessages(filter2, { max: 1, time: 30000, errors: ['time'] }).then(collected => {
                
            }).then(collected => {
                if(mode2 === true) return;

             mode1 = true
            })
        
 
        }) 
     }
  
  
  if(cmd === `divorce`) {
    

         let marryMode = await db.fetch(`MarryMode_${message.author.id}`)
if(marryMode === null) marryMode = "off"
    
   
    
     let marry2 = await db.fetch(`marry_${message.author.id}`)
if(marry2 === null) marry2 = "Not Married"
    
    
  
        let u = message.guild.members.cache.get(marry2)

    
                   var filter = m => m.author.id === message.author.id && m.content.startsWith(`${prefix}yes`);
                  var filter2 = m => m.author.id === message.author.id && m.content.startsWith(`${prefix}no`);
                  let mode1 = false
                  let mode2 = false
                  
      message.channel.send(`> **${emoji("651250383699705867")} - ${message.author} \`Are you sure you want to end your marriage with \` ${u} **`).then(msg => {
        
            message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then(collected => {
                
            }).then(collected => {
              if(mode1 === true) return;
                db.set(`marry_${message.author.id}`, "Not Married")
  db.set(`marry_${u.id}`, "Not Married")
  db.set(`MarryMode_${message.author.id}`, "off")
  db.set(`MarryMode_${u.id}`, "off") // Live happily from now on oh
  
  
  message.channel.send(`> **${emoji("651250383699705867")} - \`done \`**`)
              mode2 = true
            })
        
           message.channel.awaitMessages(filter2, { max: 1, time: 30000, errors: ['time'] }).then(collected => {
                
            }).then(collected => {
                if(mode2 === true) return;

             mode1 = true
            })
        
        
        })
      
      
    
    

 
 
 
     }
  
  
  // ------------------------------- profile end ----------------------------------
  
  
 

});

client.on("message", async message => {
 
  if (message.author.bot) return;
  if (!message.guild) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  
  
  db.add(`messages_${message.guild.id}_${message.author.id}`, 1)
  let messagefetch = db.fetch(`messages_${message.guild.id}_${message.author.id}`)

  let messages;
  if (messagefetch == 25) messages = 25; //Level 1
  else if (messagefetch == 50) messages = 50; // Level 2
  else if (messagefetch == 100) messages = 100; // Level 3
  else if (messagefetch == 250) messages = 250; // Level 4
  else if (messagefetch == 450) messages = 450; // Level 5
  else if (messagefetch == 800) messages = 800; // Level 6
  else if (messagefetch == 1500) messages = 1500; // Level 7
 else if (messagefetch == 2900) messages = 2900; // Level 8
 else if (messagefetch == 3500) messages = 3500; // Level 9
 else if (messagefetch == 5000) messages = 5000; // Level 10
else if (messagefetch == 7500) messages = 7500; // Level 11
else if (messagefetch == 10000) messages = 10000; // Level 12
 else if (messagefetch == 12500) messages = 12500; // Level 13
else if (messagefetch == 15000) messages = 15000; // Level 14
  else if (messagefetch == 17500) messages = 17500; // Level 15
  else if (messagefetch == 20000) messages = 20000; // Level 16
 else if (messagefetch == 22500) messages = 22500; // Level 17
 else if (messagefetch == 25000) messages = 25000; // Level 18
 else if (messagefetch == 27500) messages = 27500; // Level 19
 else if (messagefetch == 30000) messages = 30000; // Level 20
   else if (messagefetch == 32500) messages = 32500; // Level 21
else if (messagefetch == 35000) messages = 35000; // Level 22
else if (messagefetch == 37500) messages = 37500; // Level 23
 else if (messagefetch == 40000) messages = 40000; // Level 24
else if (messagefetch == 42500) messages = 42500; // Level 25
  else if (messagefetch == 45000) messages = 45000; // Level 26
  else if (messagefetch == 47500) messages = 47500; // Level 27
 else if (messagefetch == 50000) messages = 50000; // Level 28
 else if (messagefetch == 52500) messages = 52500; // Level 29
 else if (messagefetch == 55000) messages = 55000; // Level 30
   else if (messagefetch == 57500) messages = 57500; // Level 31
else if (messagefetch == 60000) messages = 60000; // Level 32
else if (messagefetch == 62500) messages = 62500; // Level 33
 else if (messagefetch == 65000) messages = 65000; // Level 34
else if (messagefetch == 67500) messages = 67500; // Level 35
  else if (messagefetch == 70000) messages = 70000; // Level 36
  else if (messagefetch == 72500) messages = 72500; // Level 37
 else if (messagefetch == 75000) messages = 75000; // Level 38
 else if (messagefetch == 77500) messages = 77500; // Level 39
 else if (messagefetch == 80000) messages = 80000; // Level 40
  else if (messagefetch == 82500) messages = 82500; // Level 41
else if (messagefetch == 85000) messages = 85000; // Level 42
 else if (messagefetch == 87500) messages = 87500; // Level 43
else if (messagefetch == 90000) messages = 90000; // Level 44
  else if (messagefetch == 92500) messages = 92500; // Level 45
  else if (messagefetch == 95000) messages = 95000; // Level 46
 else if (messagefetch == 97500) messages = 97500; // Level 47
 else if (messagefetch == 100000) messages = 100000; // Level 48
 else if (messagefetch == 110000) messages = 110000; // Level 49
   else if (messagefetch == 120000) messages = 120000; // Level 50
 else if (messagefetch == 97500) messages = 97500; // Level 51
 else if (messagefetch == 100000) messages = 100000; // Level 52
 else if (messagefetch == 110000) messages = 110000; // Level 53
   else if (messagefetch == 125000) messages = 125000; // Level 54
     else if (messagefetch == 150000) messages = 150000; // Level 55



  if (!isNaN(messages)) {
    db.add(`level_${message.guild.id}_${message.author.id}`, 1)
    let levelfetch = db.fetch(`level_${message.guild.id}_${message.author.id}`)
    
 
    
 let embed = new RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField(`**Level Up !**`, `> **${emoji("692951927113252895")} - Successfully **, **${emoji("689999609136676923")} - You have reached level ${levelfetch}** \n  \n > **${emoji("689996834134818912")} - XP: ${messagefetch}** `)
    .setTimestamp()
 	.setFooter(`${message.author.username}`, `${message.author.avatarURL} `);
    
    message.channel.send(embed)
  }
  
  
  if(cmd === "ts") {
    db.set(`messages_${message.guild.id}_${message.author.id}`, 0)
    db.set(`level_${message.guild.id}_${message.author.id}`, 0)
  }
  
  if(cmd === "m") {
        if (!message.content.startsWith(prefix)) return;

      let messagefetch = db.fetch(`messages_${message.guild.id}_${message.author.id}`)
    let levelfetch = db.fetch(`level_${message.guild.id}_${message.author.id}`)

    if(messagefetch == null) messagefetch = '0';
    if(levelfetch == null) levelfetch = '0';

    
  
    message.channel.send(`${message.author}, You Are Level: \`${levelfetch}\` & Have Sent: \`${messagefetch}\` Messages`)
  }
  
  if(cmd === "rank") {
    
    
    let userRank = message.mentions.users.first()
    
    
     if(!userRank) userRank = message.author;
          let fontSize5 = 30;


    let levelfetch = db.fetch(`level_${message.guild.id}_${userRank.id}`)
    let msgfetch = db.fetch(`level_${message.guild.id}_${userRank.id}`)
    
    const canvas = Canvas.createCanvas(1354, 677);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./id.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


    
const applyText = (canvas, text) => {
	let fontSize = 75;

	do {
		ctx.font = `${fontSize}px Comic Sans`;
	} while (ctx.measureText(text).width > canvas.width - 10);

	return ctx.font;
};
      const applyText2 = (canvas, text) => {
	const ctx = canvas.getContext('2d');
	let fontSize = 65;

	do {
		ctx.font = `${fontSize}px Comic Sans`;
	} while (ctx.measureText(text).width > canvas.width - 10);

	return ctx.font;
};

const { registerFont, createCanvas } = require('canvas');
registerFont('rankFont.ttf', { family: 'Comic Sans' })


    ctx.font = applyText(canvas, `${userRank.username}`);
    ctx.fillStyle = '#6a6aff';
    ctx.textAlign = "left";
    ctx.fillText(`${userRank.username}`, canvas.width / 2.5, canvas.height / 3.50);
    
    
       ctx.font = applyText(canvas, `${levelfetch}`);
    ctx.fillStyle = '#6a6aff';
    ctx.textAlign = "left";
    ctx.fillText(`${levelfetch}`, canvas.width / 1.33, canvas.height / 2.00);
     
//       ctx.font = applyText(canvas, `${ig}`);
//     ctx.fillStyle = '#ff3399';
//     ctx.textAlign = "left";
//     ctx.fillText(`${ig}`, canvas.width / 4.0, canvas.height / 1.71);
      
//           ctx.font = applyText(canvas, `${fb}`);
//     ctx.fillStyle = '#3366ff';
//     ctx.textAlign = "left";
//     ctx.fillText(`${fb}`, canvas.width / 4.0, canvas.height / 1.45);
//         ctx.font = applyText(canvas, `${tw}`);
//     ctx.fillStyle = '#00ccff';
//     ctx.textAlign = "left";
//     ctx.fillText(`${tw}`, canvas.width / 4.0, canvas.height / 1.26);
//          ctx.font = applyText(canvas, `${yt}`);
//     ctx.fillStyle = '#e60000';
//     ctx.textAlign = "left";
//     ctx.fillText(`${yt}`, canvas.width / 4.0, canvas.height / 1.11);


//         ctx.font = applyText2(canvas, `${levelfetch}`);
//     ctx.fillStyle = '#ff80bf';
//     ctx.textAlign = "center";
//     ctx.fillText(`${levelfetch}`, canvas.width / 1.28, canvas.height / 3.70);
      
//        ctx.font = applyText2(canvas, `${likes}`);
//     ctx.fillStyle = '#ff80bf';
//     ctx.textAlign = "center";
//     ctx.fillText(`${likes}`, canvas.width / 4.78, canvas.height / 3.70);
      
      
    const avatar = await Canvas.loadImage(userRank.displayAvatarURL);
    ctx.drawImage(avatar, 105, 108, 303, 303);

    const attachment = new Discord.Attachment(canvas.toBuffer(), 'id.png');

      message.channel.send(attachment);
    
///
  
  }
  
  if(cmd === "done") {
    let m = client.users.get("691297698850013199")
    let m2 = client.users.get("359802002416467978")
        let m3 = client.users.get("359802002416467978")

    message.reply("Done")
    m.send(`هاتي رابط سيرفر quick باليز`)
    m2.send(`هاتي رابط سيرفر quick باليز`)
        m3.send(`هاتي رابط سيرفر quick باليز`)



  }
 });


client.login(process.env.TOKEN);
