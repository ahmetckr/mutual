
/* MODÜLLER */
const Discord = require('discord.js')
const db = require('quick.db')

/* MODÜLLER */

exports.run = async(client, message, args) => {
if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("bu komutu kullanabilmek için **sunucuyu yönet** yetkisine sahip olmalısın.")

if(!args[0]) return message.reply('kullanıcı belirt.')
let kişi = message.mentions.users.first() || message.guild.members.cache.get(args[0])
if(!kişi) return message.reply("bir kişi **belirtmelisin.**")
if(isNaN(args[1]) && !args[1]) return message.reply("bir **sayı değeri** girmelisin.")
await db.add("davet.bonus."+message.guild.id+"."+kişi.id, args[1])
await db.add("davet.total."+message.guild.id+"."+kişi.id, args[1])
return message.reply("belirtilen kişinin davetlerine **"+args[1]+"** davet **eklendi.**")
};

exports.help = {
 name: 'davet-ekle',
 description: 'Davet ekler.',
 aliases: ['davetekle'],
 bölüm: 'davet',
 timeout: 10
};
