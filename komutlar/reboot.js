const Discord = require('discord.js');
const db = require("quick.db");
const moment = require("moment");
const ayarlar = require("../ayarlar.json")
const fonksiyonlar = require('../fonksiyonlar.js')
moment.locale("tr");
exports.run = async (client, message, args) => {

if(!ayarlar.sahip.includes(message.author.id)) return
let cmd;
if (global.commands.has(args[0])) {
cmd = global.commands.get(args[0]);
} else if (global.aliases.has(args[0])) {
cmd = global.commands.get(global.aliases.get(args[0]));
}
  
if(!cmd) {

await message.channel.send(new Discord.MessageEmbed() .setColor('GREEN') .setDescription(ayarlar.bekle+" Bot yeniden başlatılıyor, yeniden başlatılmadan önceki ping değeri **"+client.ws.ping+"** milisaniye.")).then(async mete => {
await db.set("reboot", {kanal: message.channel.id, mesajid: mete.id, oping: client.ws.ping})
await fonksiyonlar.sendEmbed('**'+message.author.tag+'** adlı sahibim botu **yeniden başlattı**.', { channel: client.channels.cache.get(ayarlar.log), color: 'GREEN'})
return process.exit()
}, 500)
} else {
await global.load(cmd.help.name)
await fonksiyonlar.sendEmbed('**'+message.author.tag+'** adlı sahibim **'+cmd.help.name+'** adlı komutu **yeniden başlattı**.', { channel: client.channels.cache.get(ayarlar.log), color: 'GREEN'})
return fonksiyonlar.sendEmbed(ayarlar.onay+' **'+args[0]+'** komutu **yeniden başlatıldı.**', { channel: message.channel, color: 'GREEN'})
}
  
}

module.exports.help = {
  name: 'reboot',
  description: 'Bot sahibinin kod botu yeniden başlatmasına yarar.',
  aliases: ["r"],
  bölüm: "sahip",
};