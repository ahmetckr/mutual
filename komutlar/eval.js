const Discord = require("discord.js");
 const a = require('../ayarlar.json')
 const moment = require("moment");
const fonksiyonlar = require('../fonksiyonlar.js')
const db = require("quick.db")
exports.run = async (client, message, args) => {
  if(!a.sahip.includes(message.author.id)) return;
  if(!args[0]) return message.reply("Kod gir.");
  
    try {
        
        let codein = args.join(" ");
        let code = eval(codein);
      
      if(code === true) code = "Olumlu";
      if(code === false) code = "Olumsuz";
      if(code === client.token) return message.channel.send(new Discord.MessageEmbed() .setColor("RED") .setDescription("**» Sistem hatası**\n" + `\`\`\`js\nclient.token adlı bir obje bulunamadı.\n\`\`\``));
        
      if (typeof code !== 'string')
      code = require('util').inspect(code, { depth: 0 });
        let çıkış = (`\`\`\`js\n${code}\n\`\`\``);
        message.channel.send(new Discord.MessageEmbed() .setColor("GREEN") .setDescription("**» Yapılan işlem**\n" + çıkış) .setFooter((Date.now() - message.createdTimestamp).toFixed().replace('-', '')+' milisaniyede işlendi.'));
    } catch(e) {
        message.channel.send(new Discord.MessageEmbed() .setColor("RED") .setDescription("**» Discord hatası**\n" + `\`\`\`js\n${e}\n\`\`\``));
    };
};


exports.help = {
  name: 'eval',
  description: 'Bot adminlerinin bot üzerinde kod test etmesini sağlar.',
  bölüm: "sahip",
  aliases: []
};