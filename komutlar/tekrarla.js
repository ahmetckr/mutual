
/* MODÜLLER */
const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
/* MODÜLLER */

exports.run = async(client, message, args) => {
  try {
    if(args[0]) {
        if(args[0] !== 'aç' && args[0] !== 'kapat') return message.channel.send(new Discord.MessageEmbed() .setColor('RED') .setDescription(ayarlar.red + ' Aç yada kapat yazman gerek.'));
      let tekrarol = client.player.setQueueRepeatMode(message, args[1] == 'aç' ? true : false);
        if(tekrarol === null) return; 
          if(args[0] === 'aç') return message.channel.send(new Discord.MessageEmbed() .setColor('GREEN') .setDescription('Oynatma listesi **tekrar edilecek**.'))
          else return message.channel.send(new Discord.MessageEmbed() .setColor('RED') .setDescription('Oynatma listesi **tekrar edilmeyecek**.'))
    } else {
         let tekrar = client.player.toggleLoop(message);
        if(tekrar === null) return;
        else if (tekrar)
            message.channel.send(new Discord.MessageEmbed() .setColor('GREEN') .setDescription('Tekrarlama modu **açıldı**.'));
        else message.channel.send(new Discord.MessageEmbed() .setColor('RED') .setDescription(' Tekrarlama modu **kapatıldı**.'));
    }
    } catch(err) {
    return message.channel.send(new Discord.MessageEmbed() .setColor('RED') .setDescription(ayarlar.red + ' Bu sunucuda müzik çalmamakta.'));
  }
};

exports.help = {
 name: 'tekrarla',
 description: 'Çalan müziği/oynatma listesini tekrar eder.',
 aliases: ['loop'],
 bölüm: 'müzik'
};
