
/* MODÜLLER */
const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
/* MODÜLLER */

exports.run = async(client, message, args) => {
try {
if(args[0] === 'temizle') {
await client.player.clearQueue(message);
return message.channel.send(new Discord.MessageEmbed() .setColor('GREEN') .setDescription(ayarlar.onay+' Oynatma listesi **temizlendi**'))
};
const sıra = client.player.getQueue(message)
return message.channel.send(new Discord.MessageEmbed() .setColor('BLUE') .setDescription(`

${ayarlar.müzik} | **Oynatma sırası**
${sıra.songs.map((song, i) => {
return `${i === 0 ? 'Çalınan: ' : '#'+(i+1)+' - '}  ${song.name}`
}).join('\n')}
`))
} catch(err) {
  return message.channel.send(new Discord.MessageEmbed() .setColor('RED') .setDescription(ayarlar.red + ' Şu anda müzik çalınmıyor.'))
}
};

exports.help = {
 name: 'sıra',
 description: 'Şarkı sırasını gösterir.',
 aliases: ['liste'],
 bölüm: 'müzik'
};
