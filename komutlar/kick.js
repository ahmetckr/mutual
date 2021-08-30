
/* MODÜLLER */
const Discord = require('discord.js')
const fonksiyonlar = require('../fonksiyonlar.js')
const moment = require('moment')
/* MODÜLLER */

exports.run = async(client, message, args) => {
if(!message.member.hasPermission('KICK_MEMBERS')) return fonksiyonlar.hata('Bu komutu kullanabilmek için `Üyeleri At` yetkisine sahip olman gerekiyor.', message)
if(!message.guild.member(client.user.id).hasPermission('KICK_MEMBERS')) return fonksiyonlar.hata('Bu komutu kullanabilmek için `Üyeleri At` yetkisine sahip olmam gerekiyor.', message)
if(!args[0]) return fonksiyonlar.hata('Bir kullanıcı belirt.', message)

let kullanıcı = await message.mentions.users.first() || client.users.fetch(args[0])

if(!kullanıcı) return fonksiyonlar.hata('Kullanıcıyı bulamadım.', message)
if(kullanıcı.id === message.author.id) return fonksiyonlar.hata('Kendini atamazsın.', message)
if(message.guild.member(kullanıcı.id)) {
if(message.guild.member(kullanıcı.id).roles.highest.position >= message.member.roles.highest.position) return fonksiyonlar.hata('Bu kullanıyıcı sunucudan atamazsın. Çünkü onun yetkisi senden üstte.', message)
if(message.guild.member(kullanıcı.id).roles.highest.position >= message.guild.member(client.user.id).roles.highest) return fonksiyonlar.hata('Bu kullanıyıcı sunucudan atamam. Çünkü onun yetkisi benden üstte.', message)
};
await message.guild.member(kullanıcı.id).kick(args[1] ? args.slice(1).join(' ') : 'Belirtilmedi')
return message.channel.send(new Discord.MessageEmbed() .setColor('RED') .setDescription(`

__**MUTUAL KULLANICI YASAKLAMA İŞLEMİ**__

• Yasaklanan kullanıcı      → **${kullanıcı.tag}** [${kullanıcı.id}]
• Yasaklanma sebebi         → **${args[1] ? args.slice(1).join(' ') : 'Belirtilmedi.'}**
• Yasaklayan yetkili        → **${message.author.tag}** [${message.author.id}]

• Sunucuda bulunuyor muydu? → **${message.guild.member(kullanıcı.id) ? 'Evet' : 'Hayır'}**
• İşlem tarihi              → **${moment().add(3, 'hour').format('DD/MM/YYYY HH:mm')}**
`))
};

exports.help = {
 name: 'kick',
 description: 'Sunucunuzdaki üyeyi sunucudan atar.',
 aliases: ['at'],
 bölüm: 'yetkili',
 timeout: 5
};
