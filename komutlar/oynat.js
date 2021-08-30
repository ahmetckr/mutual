
/* MODÜLLER */
const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
/* MODÜLLER */

exports.run = async(client, message, args) => {
  if(!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed() .setColor('RED') .setDescription(ayarlar.red+' Ses kanalında bulunman gerekiyor.'));
  if(!args[0]) return message.channel.send(new Discord.MessageEmbed() .setColor('RED') .setDescription(ayarlar.red+' Şarkı ismi girmen gerek.'))
  
          if(client.player.isPlaying(message)) {
            let müzik = await client.player.addToQueue(message, args.join(' '));
            if(müzik) return message.channel.send(new Discord.MessageEmbed() .setColor('GREEN') .setDescription('**' + müzik.name+ '** adlı müzik **sıraya eklendi**.'));
            return;
        } else {
            let müzik = await client.player.play(message, {
            search: args.join(' '),
            requestedBy: message.author.tag
        });
 
            if(müzik)
                message.channel.send(new Discord.MessageEmbed() .setColor('GREEN') .setDescription('**' + müzik.name+ '** adlı müzik **çalınıyor**.'));
            return;
        }
};

exports.help = {
 name: 'oynat',
 description: 'Bulunduğunuz ses kanalında müzik oynatır.',
 aliases: ['çal'],
 bölüm: 'müzik'
};
