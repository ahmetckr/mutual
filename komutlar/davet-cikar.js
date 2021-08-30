
/* MODÜLLER */
const Discord = require('discord.js')
const db = require('quick.db')
const fonksiyonlar = require('../fonksiyonlar.js')
/* MODÜLLER */

exports.run = async(client, message, args) => {
if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("bu komutu kullanabilmek için **sunucuyu yönet** yetkisine sahip olmalısın.")

let kişi = message.mentions.users.first() || message.guild.members.cache.get(args[0])

if(!kişi) return message.reply('kişiyi bulamadım.')

if(isNaN(args[1]) && !args[1]) return message.reply('bir **sayı değeri** girmelisin.')
var veri = db.fetch("davet.bonus."+message.guild.id+"."+kişi.id) || 0
if(veri < args[1]) return message.reply("belirtilen kişinin o kadar daveti **bulunmuyor.**")
await db.subtract('davet.bonus.'+message.guild.id+"."+kişi.id, args[1])
return fonksiyonlar.sendEmbed('belirtilen kişinin davetlerinden **'+args[1]+'** davet **çıkarıldı**', { channel: message.channel, color: 'GREEN', title: 'Başarılı.'})

};

exports.help = {
 name: 'davet-çıkar',
 description: 'Davet çıkarır.',
 aliases: ['davetçıkar', 'davetsil', 'davet-sil'],
 bölüm: 'davet'
};
