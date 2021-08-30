
/* MODÜLLER */
const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
/* MODÜLLER */

exports.run = async(client, message, args) => {
if(!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed() .setColor('RED') .setDescription(ayarlar.red+' Ses kanalında bulunmuyorsun.'))
if(!message.guild.member(client.user.id).voice.channel) return message.channel.send(new Discord.MessageEmbed() .setColor('RED') .setDescription(ayarlar.red+' Ses kanalında bulunmuyorum.'))
if(message.guild.member(client.user.id).voice.channel !== message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed() .setColor('RED') .setDescription(ayarlar.red+' Seninle aynı ses kanalında bulunmuyorum.'))

await message.member.voice.channel.leave()
return message.channel.send(new Discord.MessageEmbed() .setColor('GREEN') .setDescription(ayarlar.onay+' Görüşürüz..'))
};

exports.help = {
 name: 'ayrıl',
 description: 'Bulunduğu kanaldan ayrılır.',
 aliases: ['dc'],
 bölüm: 'müzik'
};
