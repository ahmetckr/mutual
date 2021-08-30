
/* MODÜLLER */
const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
/* MODÜLLER */

exports.run = async(client, message, args) => {
  try {
        let songs = client.player.shuffle(message);
    if(!songs) return message.channel.send(new Discord.MessageEmbed() .setColor('RED') .setDescription(ayarlar.red+' Birden fazla veya müzik **bulunmuyor**.'))
    return message.channel.send(new Discord.MessageEmbed() .setColor('RED') .setDescription(' Oynatma listesi karıştırıldı.'))
  } catch(err) {
    return message.channel.send(new Discord.MessageEmbed() .setColor('RED') .setDescription(ayarlar.red+' Bu sunucuda şu anda müzik çalınmıyor.'))
  }
};

exports.help = {
 name: 'karıştır',
 description: 'Oynatma listesindeki müzikleri karıştırır.',
 aliases: ['shuffle'],
 bölüm: 'müzik'
};
