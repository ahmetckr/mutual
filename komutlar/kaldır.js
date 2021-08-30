
/* MODÜLLER */
const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
/* MODÜLLER */

exports.run = async(client, message, args) => {
try {
  if(!args[0]) return message.channel.send(new Discord.MessageEmbed() .setColor('RED') .setDescription(ayarlar.red+' Kaldırılcak şarkı sırasını girmen gerek'));
        let müzik = parseInt(args[0])-1;
        
        let kaldırılanmüzik = client.player.remove(message, müzik);
        if(kaldırılanmüzik) return message.channel.send(new Discord.MessageEmbed() .setColor('GREEN') .setDescription(` **${müzik.name}** adlı şarkı ${args[0]}. sıradan kaldırıldı.`));
} catch(err) {
return message.channel.send(new Discord.MessageEmbed() .setColor('RED') .setDescription(ayarlar.red+' Bu sunucuda şu anda müzik çalınmıyor.'))
}
};

exports.help = {
 name: 'kaldır',
 description: 'Oynatma listesindeki müziği sıradan kaldırır.',
 aliases: ['sıradan-sil'],
 bölüm: 'müzik'
};
