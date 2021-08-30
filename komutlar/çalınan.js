
/* MODÜLLER */
const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const { Player, Utils } = require('discord-music-player');
const moment = require('moment')
require('moment-duration-format')
const createBar = require('string-progressbar');
/* MODÜLLER */

exports.run = async(client, message, args) => {
try {
let şarkı = await client.player.nowPlaying(message)
let ms = await Utils.TimeToMilliseconds(şarkı.duration);
  
console.log(ms)
const kalan = Date.now()-ms
        const progressBar = client.player.createProgressBar(message, { timecodes: true })
  if(!progressBar) progressBar = 'Şarkı çalmamakta.'
return message.channel.send(new Discord.MessageEmbed() .setColor('BLUE') .setDescription(`

» Şu anda çalınan şarkı: **${şarkı.name}**

• Şarkı süresi: **${şarkı.duration}**

${progressBar}
`) .setThumbnail(şarkı.thumbnail))
} catch(err) {
  return message.channel.send(new Discord.MessageEmbed() .setColor('RED') .setDescription(ayarlar.red+' Bu sunucuda şu anda müzik çalınmıyor.'))
}
};

exports.help = {
 name: 'çalınan',
 description: 'Çalınan müziği gösterir.',
 aliases: ['np', 'oynatılan'],
 bölüm: 'müzik'
};
