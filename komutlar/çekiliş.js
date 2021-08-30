
/* MODÜLLER */
const Discord = require('discord.js')
const fonksiyonlar = require('../fonksiyonlar.js')
const ayarlar = require('../ayarlar.json')
/* MODÜLLER */

exports.run = async(client, message, args) => {
if(!message.member.hasPermission('MANAGE_GUILD')) return fonksiyonlar.hata('Bu komutu kullanabilmek için **Sunucuyu Yönet** yetkisine ihtiyacın var.', message);
  
if(!args[0]) return fonksiyonlar.hata('Kanal etiketle.', message)
if(!args[1]) return fonksiyonlar.hata('Çekiliş ödülünü gir.', message)

if(!message.mentions.channels.first()) return fonksiyonlar.hata('Kanal etiketle.', message)
if(message.mentions.channels.first().type !== 'text') return fonksiyonlar.hata('**Yazı** kanalı etiketle.', message)
if(!message.mentions.channels.first().permissionsFor(client.user.id).toArray().find(mutual => mutual == 'SEND_MESSAGES')) return fonksiyonlar.hata('Bu kanala yazı yazma yetkim yok.', message)
if(!message.mentions.channels.first().permissionsFor(client.user.id).toArray().find(mutual => mutual == 'ADD_REACTIONS')) return fonksiyonlar.hata('Bu kanala tepki ekleme yetkim yok.', message)
await message.mentions.channels.first().send(new Discord.MessageEmbed() .setColor('BLUE') .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true})) .setDescription(`

__**MUTUAL ÇEKİLİŞ SİSTEMİ**__

• Ödül → **${args.slice(1).join(' ')}**
• Katılmak için ${ayarlar.mutual} tepkisine basın.
• Çekiliş sahibi → <@!${message.author.id}> | \`${message.author.tag}\`

${message.guild.name.replace(/`/, '')} ~ Mutual
`)
).then(mutual => mutual.react(ayarlar.mutualID) && mutual.edit(
new Discord.MessageEmbed() .setColor('BLUE') .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true})) .setDescription(`

__**MUTUAL ÇEKİLİŞ SİSTEMİ**__

• Ödül → **${args.slice(1).join(' ')}**
• Katılmak için ${ayarlar.mutual} tepkisine basın.
• Çekiliş sahibi → <@!${message.author.id}> | \`${message.author.tag}\`

${message.guild.name.replace(/`/, '')} ~ Mutual`) .setFooter('Çekilişi bitirmek için: m!çekiliş-bitir <#'+mutual.channel+ '> '+mutual.id)))
return message.channel.send(new Discord.MessageEmbed() .setColor('GREEN') .setDescription(ayarlar.onay + ' Çekiliş başlatıldı!'))
};

exports.help = {
 name: 'çekiliş',
 description: 'Çekiliiş oluşturur.',
 aliases: ['giveaway'],
 bölüm: 'yetkili',
 timeout: 30
};
