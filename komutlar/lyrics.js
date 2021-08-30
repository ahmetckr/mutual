
/* MODÜLLER */
const Discord = require('discord.js')
const lyricsFinder = require('lyrics-finder');
const fonksiyonlar = require('../fonksiyonlar.js')
const ayarlar = require('../ayarlar.json')
/* MODÜLLER */

exports.run = async(client, message, args) => {
if(!args[0]) {
try {
let şarkı = await client.player.nowPlaying(message)
args[0] = şarkı.name;
} catch(err) {
return fonksiyonlar.sendEmbed(ayarlar.red+' Şarkı ismi gir.', { channel: message.channel, color: 'RED'})
}
}
const msg = await message.channel.send(new Discord.MessageEmbed() .setColor('ORANGE') .setDescription(ayarlar.bekle+' Şarkı aranıyor...'))
 const sözler = await lyricsFinder('', args.join(' '))
  if(!sözler) return msg.edit(new Discord.MessageEmbed() .setColor('RED') .setDescription(ayarlar.red+' Şarkı bulunamadı.'))
  
  for (var i = 1; sözler.length > 1024*(i-1); i++) {
  if(i == 1) {
  msg.edit(new Discord.MessageEmbed() .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true})) .setTimestamp() .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true})) .setColor('GREEN') .setDescription(sözler.substr(1024*(i-1), 1024*i)))
  } else {
    msg.channel.send(new Discord.MessageEmbed() .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true})) .setTimestamp() .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true})) .setColor('GREEN') .setDescription(sözler.substr(1024*(i-1), 1024*i)))
  }
  }

};

exports.help = {
 name: 'lyrics',
 description: 'Şarkı sözlerini arar.',
 aliases: ['sözler'],
 bölüm: 'müzik'
};
