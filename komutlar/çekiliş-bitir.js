
/* MODÜLLER */
const Discord = require('discord.js')
const fonksiyonlar = require('../fonksiyonlar.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db');
/* MODÜLLER */

exports.run = async(client, message, args) => {
if(!message.member.hasPermission('MANAGE_GUILD')) return fonksiyonlar.hata('Bu komutu kullanabilmek için **Sunucuyu Yönet** yetkisine ihtiyacın var.', message);
  
if(!args[0]) return fonksiyonlar.hata('Kanal etiketle.', message)
if(!args[1]) return fonksiyonlar.hata('Çekiliş ID gir.', message)

if(!message.mentions.channels.first()) return fonksiyonlar.hata('Kanal etiketle.', message)
if(message.mentions.channels.first().type !== 'text') return fonksiyonlar.hata('**Yazı** kanalı etiketle.', message)
if(!message.mentions.channels.first().permissionsFor(client.user.id).toArray().find(mutual => mutual == 'SEND_MESSAGES')) return fonksiyonlar.hata('Bu kanala yazı yazma yetkim yok.', message)
if(!message.mentions.channels.first().permissionsFor(client.user.id).toArray().find(mutual => mutual == 'ADD_REACTIONS')) return fonksiyonlar.hata('Bu kanala tepki ekleme yetkim yok.', message)

const msg = await message.guild.channels.cache.get(`${message.mentions.channels.first().id}`).messages.fetch(`${args[1]}`)
try {
  let kazanan = false;
const reaction = await msg.reactions.cache.first();
     const users = (await reaction.users.fetch()).filter((u) => !u.bot);
if(users.length < 1) {
kazanan = false;
} else kazanan = users.random()
  
if(!kazanan) {
await fonksiyonlar.sendEmbed('Çekiliş sonuçlandı! Kazanan: '+kazanan.tag+'')
msg.edit('Malesef, çekilişe katılan olmadı.', 
new Discord.MessageEmbed() .setColor('BLUE') .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true})) .setDescription(`
        
__**MUTUAL ÇEKİLİŞ SİSTEMİ**__

• Kazanan → **Yok**
• Çekiliş sahibi → <@!${message.author.id}> | \`${message.author.tag}\`
  
${message.guild.name.replace(/`/, '')} ~ Mutual
`))
  return;
};
msg.edit('<@!'+kazanan.id+'>', 
new Discord.MessageEmbed() .setColor('BLUE') .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true})) .setDescription(`

__**MUTUAL ÇEKİLİŞ SİSTEMİ**__

• Kazanan → **${kazanan.tag}**
• Çekiliş sahibi → <@!${message.author.id}> | \`${message.author.tag}\`

${message.guild.name.replace(/`/, '')} ~ Mutual
`))
await db.delete('cekilis.'+msg.id+'.sartlar.sunucu', 'Geçildi.')
await db.delete('cekilis.'+msg.id+'.sartlar.rol', 'Geçildi.')
await db.delete('cekilis.'+msg.id+'.sartlar.davet', 'Geçildi.')  

await fonksiyonlar.sendEmbed('Çekiliş sonuçlandı! Kazanan: **'+kazanan.tag+'**', { channel: message.channel, color: 'GREEN'})
} catch(err) {
return fonksiyonlar.hata('Mesaj bulunamadı.', message)  
}
  
};

exports.help = {
 name: 'çekiliş-bitir',
 description: 'Oluşturulan çekilişi bitirir.',
 aliases: ['giveaway'],
 bölüm: 'yetkili',
 timeout: 15
};
