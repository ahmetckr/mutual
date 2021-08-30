const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')


exports.run = async(client, message, args) => {
let kişi = message.mentions.members.first() || message.guild.members.cache.get(args[0])

if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("bu komutu kullanabilmek için **administrator** yetkisine **sahip olmalısın.**")
if(!message.guild.members.cache.get(client.user.id).hasPermission("ADMINISTRATOR")) return message.reply("bu komutu kullanabilmek için **administrator** yetkisine **sahip olmalıyım.**")

if(!message.member.voice.channel) return message.reply("bir ses kanalında **bulunmalısın.**")
  
if(!kişi && !args[0]) return message.reply("bir kişi ya da bir kanal **belirtmelisin.**")
if(kişi) {
if(!kişi.voice.channel) return message.reply("belirttiğiniz kişi bir sesli kanalda **bulunmuyor.**")
if(kişi.voice.channel.id == message.member.voice.channel.id) return message.reply("belirttiğiniz kişiyle **aynı odadasınız.**")
message.member.voice.setChannel(kişi.voice.channel.id)
return message.reply("belirttiğiniz kişinin kanalına **gittiniz.**")
}

let check = message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find(a => a.name === args[0]);
if(!check) return message.reply("bir kanal **belirtmelisin.**")
if(check.type !== "voice") return message.reply("belirttiğin kanal bir **ses kanalı olmalı.**")
if(check.id == message.member.voice.channel.id) return message.reply("zaten **belirttiğiniz odadasınız.**")
message.member.voice.setChannel(check.id)
return message.reply("belirttiğiniz kanala **gittiniz.**")
}

exports.help = {
  name: 'git',
  description: 'Belirttiğiniz kişinin kanalına / belirttiğiniz kanala gidersiniz.',
  aliases: [],
  bölüm: "yetkili",
};