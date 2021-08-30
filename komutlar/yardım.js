
/* MODÜLLER */
const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json'), emojiler = require('../ayarlar.json')
const fonksiyonlar = require('../fonksiyonlar.js')
/* MODÜLLER */

exports.run = async(client, message, args) => {
  let cmd;
if (global.commands.has(args[0])) {
cmd = global.commands.get(args[0]);
} else if (global.aliases.has(args[0])) {
cmd = global.commands.get(global.aliases.get(args[0]));
}
  if(cmd) {
    if(cmd.help.name === 'yardım') return fonksiyonlar.sendEmbed('**:)**', { channel: message.channel, color: 'RED', author: [message.author.tag, message.author.displayAvatarURL({ dynamic: true})]})
    return message.channel.send(new Discord.MessageEmbed()
.setColor('#ebf5fa')
.setDescription(`

• | Komut adı: **${cmd.help.name}**
• | Komut açıklaması: **${cmd.help.description ? cmd.help.description : 'yok'}**
• | Komut bölümü: **${cmd.help.bölüm}**
• | Komut yan kullanımları: ${cmd.help.aliases.length < 1 ? '**yok**' : cmd.help.aliases.map(c => '**'+c+'**').join(',')}
`)
.setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true}))
.setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true}))
.setTimestamp()
)
  } else {
return message.channel.send(new Discord.MessageEmbed()
.setColor('#ebf5fa')
.setDescription(`

${emojiler.mutual} | Yardım menüme hoşgeldin, **${message.author.username}**
:white_small_square: | Aşağıdan komutlarıma ulaşabilirsin. [**${global.commands.size}**]

${emojiler.kullanıcı} | Kullanıcı Komutları [**${global.commands.filter(mutual => mutual.help.bölüm === 'kullanıcı').size}**]
${global.commands.filter(mutual => mutual.help.bölüm === 'kullanıcı').map(cmd => '`'+cmd.help.name+'`').join(' ❙ ')}

${emojiler.admin} | Yetkili Komutları [**${global.commands.filter(mutual => mutual.help.bölüm === 'yetkili').size}**]
${global.commands.filter(mutual => mutual.help.bölüm === 'yetkili').map(cmd => '`'+cmd.help.name+'`').join(' ❙ ')}

${emojiler.davet} | Davet Komutları [**${global.commands.filter(mutual => mutual.help.bölüm === 'davet').size}**]
${global.commands.filter(mutual => mutual.help.bölüm === 'davet').map(cmd => '`'+cmd.help.name+'`').join(' ❙ ')}

${emojiler.müzik} | Müzik Komutları (BETA) [**${global.commands.filter(mutual => mutual.help.bölüm === 'müzik').size}**]
${global.commands.filter(mutual => mutual.help.bölüm === 'müzik').map(cmd => '`'+cmd.help.name+'`').join(' ❙ ')}

${emojiler.sistemler} | Sistem Komutları [**${global.commands.filter(mutual => mutual.help.bölüm === 'sistemler').size}**]
${global.commands.filter(mutual => mutual.help.bölüm === 'sistemler').map(cmd => '`'+cmd.help.name+'`').join(' ❙ ')}

${emojiler.owner} | Kurucu Komutları [**${global.commands.filter(mutual => mutual.help.bölüm === 'sahip').size}**]
${global.commands.filter(mutual => mutual.help.bölüm === 'sahip').map(cmd => '`'+cmd.help.name+'`').join(' ❙ ')}

» Bağlantılar
[Destek Sunucusu](${ayarlar.desteksunucusu}) • [Sunucuna Ekle](${ayarlar.sunucunaekle})
`)
.setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true}))
.setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true}))
.setTimestamp()
)
  }
};

exports.help = {
 name: 'yardım',
 description: 'Komutları gösteren bir menü',
 aliases: ['komutlar', 'help'],
 bölüm: 'kullanıcı'
};
