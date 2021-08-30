
/* MODÜLLER */
const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
/* MODÜLLER */

exports.run = async(client, message, args) => {
try {
const müzik = client.player.skip(message);
if(müzik) return message.channel.send(new Discord.MessageEmbed() .setColor('GREEN') .setDescription('**'+müzik.name+'** adlı şarkı geçildi.'))
    } catch(err) {
     return message.channel.send(new Discord.MessageEmbed() .setColor('RED') .setDescription(ayarlar.red + ' Şu anda müzik çalınmıyor.')) 
    }
};

exports.help = {
 name: 'geç',
 description: 'Çalınan şarkıyı geçer.',
 aliases: ['atla'],
 bölüm: 'müzik'
};
