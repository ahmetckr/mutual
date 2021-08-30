
/* MODÜLLER */
const Discord = require('discord.js')
const db = require('quick.db')
const fonksiyonlar = require('../fonksiyonlar.js')
/* MODÜLLER */

exports.run = async(client, message, args) => {
if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("bu komutu kullanabilmek için **sunucuyu yönet** yetkisine sahip olmalısın.")

  let logVeri = db.fetch("davet-log."+message.guild.id)
if(!args[0]) return message.reply("bir seçenek belirtmelisin. `ayarla | sıfırla`");
if(!args[1] && args[1] !== 'ayarla' && args[1] !== 'sıfırla') return message.reply('lütfen bir seçenek belirt. `ayarla | sıfırla`'); 

if(args[1] === 'ayarla') {
if(logVeri) return message.reply("sistem daha önceden **ayarlanmış.** <#"+logVeri+">")
if(!args[2]) return message.reply(' bir davet kanalı belirt.');
let davetKanal = message.mentions.channels.first() || message.guild.channels.find(a => a.name === args[2]) || message.guild.channels.cache.get(args[2]);
if(!davetKanal) return message.reply('davet kanalını bulamadım.');

await db.set('davet-log.'+message.guild.id, davetKanal.id)
return fonksiyonlar.sendEmbed('Davet kanalı **ayarlandı.** Kanal: <#'+davetKanal+'>', { channel: message.channel, color: 'GREEN', title: 'Başarılı.'})
} else {
if(!logVeri) return message.reply("sistem daha önceden **ayarlanmamış.**")
await db.delete("davet-log."+message.guild.id)
return message.reply("davet sistemi **sıfırlandı.**")
};
};

exports.help = {
 name: 'davet-log',
 description: 'Davet log kanalını ayarlar.',
 aliases: ['davetlog'],
 bölüm: 'davet'
};
