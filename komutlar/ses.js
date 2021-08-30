
/* MODÜLLER */
const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
/* MODÜLLER */

exports.run = async(client, message, args) => {
try {
if(isNaN(args[0])) return message.channel.send(new Discord.MessageEmbed() .setColor('RED') .setDescription(ayarlar.red + ' Ses seviyesi girmen gerekli.'))
if(args[0] > 100) return message.channel.send(new Discord.MessageEmbed() .setColor('RED') .setDescription(ayarlar.red + ' Sesi **100** seviyesinden fazla yapamazsın. *Bu özellik botun yorulmaması için yaplımıştır.*'))

let ses = client.player.setVolume(message, parseInt(args[0]))
if(!ses) return message.channel.send(new Discord.MessageEmbed() .setColor('RED') .setDescription(ayarlar.red + ' Müzik sesi ayarlanamadı.'))

return message.channel.send(new Discord.MessageEmbed() .setColor('GREEN') .setDescription(ayarlar.onay + ' Müzik sesi **%'+args[0]+'** olarak ayarlandı.'))
} catch(err) {
return message.channel.send(new Discord.MessageEmbed() .setColor('RED') .setDescription(ayarlar.red+' Bu sunucuda şu anda şarkı çalınmıyor.'));
}
};

exports.help = {
 name: 'ses',
 description: 'Müzik sesini ayarlar.',
 aliases: [],
 bölüm: 'müzik'
};
