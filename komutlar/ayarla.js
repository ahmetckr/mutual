const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const moment = require("moment")
const db = require('quick.db')
exports.run = async(client, message, args) => {

const filter = (reaction, user) => {
return [ayarlar.evetID, ayarlar.hayırID].includes(reaction.emoji.id) && user.id === message.author.id;
};

if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("bu komutu kullanabilmek için **administrator** yetkisine **sahip olmalısın.**")
if(!message.guild.members.cache.get(client.user.id).hasPermission("ADMINISTRATOR")) return message.reply("bu komutu kullanabilmek için **administrator** yetkisine **sahip olmalıyım.**")
if(!message.member.voice.channel) return message.reply("bir ses kanalında **bulunmalısın.**")
if(message.member.voice.channel.members.size <= 2) return message.reply("kanalınızda **iki üyeden fazla kişi bulunmalı.**")
if(!args[0]) return message.reply("bir seçenek **belirtmelisin.** `kulaklık | mikrofon`")
if(args[0] !== "kulaklık" && args[0] !== "mikrofon") return message.reply("bir seçenek **belirtmelisin.** `kulaklık | mikrofon`")

if(args[0] === "kulaklık") {

if(!args[1]) return message.reply("bir seçenek **belirtmelisin.** `kulaklık aç | kulaklık kapat`")

if(args[1] === "kapat") {
message.reply("kanalında bulunan bütün üyelerin kulaklıklarını **kapatmak** istiyorsanız aşağıdaki emojiler kullanın.").then(async s => {
await s.react(ayarlar.evetID)
await s.react(ayarlar.hayırID)

s.awaitReactions(filter, {max: 1,time: 15000,errors: ['time']}).then(async collected => {
const reaction = collected.first();

if(reaction.emoji.id === ayarlar.evetID) {
await message.member.voice.channel.members.forEach(a => {
a.voice.setDeaf(true)
})
await s.delete()
message.channel.send("ses kanalında bulunan bütün üyelerin kulaklıkları **kapatıldı.**")
return
}

if(reaction.emoji.id === ayarlar.hayırID) {
await s.delete()
}
  
}).catch(err => s.delete())
})
}

if(args[1] === "aç") {
message.reply("kanalında bulunan bütün üyelerin kulaklıklarını **açmak** istiyorsanız aşağıdaki emojiler kullanın.").then(async s => {
await s.react(ayarlar.evetID)
await s.react(ayarlar.hayırID)

s.awaitReactions(filter, {max: 1,time: 15000,errors: ['time']}).then(async collected => {
const reaction = collected.first();

if(reaction.emoji.id === ayarlar.evetID) {
await message.member.voice.channel.members.forEach(a => {
a.voice.setDeaf(false)
})
await s.delete()
message.channel.send("ses kanalında bulunan bütün üyelerin kulaklıkları **açıldı.**")
return
}

if(reaction.emoji.id === ayarlar.hayırID) {
await s.delete()
}
  
}).catch(err => s.delete())
})
}
};

if(args[0] === "mikrofon") {

if(!message.member.voice.channel) return message.reply("bir ses kanalında **bulunmalısın.**")

if(!args[1]) return message.reply("bir seçenek **belirtmelisin.** `mikrofon aç | mikrofon kapat`")

if(args[1] === "kapat") {
message.reply("kanalında bulunan bütün üyelerin mikrofonlarını **kapatmak** istiyorsanız aşağıdaki emojiler kullanın.").then(async s => {
await s.react(ayarlar.evetID)
await s.react(ayarlar.hayırID)

s.awaitReactions(filter, {max: 1,time: 15000,errors: ['time']}).then(async collected => {
const reaction = collected.first();

if(reaction.emoji.id === ayarlar.evetID) {
await message.member.voice.channel.members.forEach(a => {
a.voice.setMute(true)
})
await s.delete()
message.channel.send("ses kanalında bulunan bütün üyelerin mikrofonları **kapatıldı.**")
return
}

if(reaction.emoji.id === ayarlar.hayırID) {
await s.delete()
}
  
}).catch(err => s.delete())
})
}

if(args[1] === "aç") {
message.reply("kanalında bulunan bütün üyelerin mikrofonlarını **açmak** istiyorsanız aşağıdaki emojiler kullanın.").then(async s => {
await s.react(ayarlar.evetID)
await s.react(ayarlar.hayırID)

s.awaitReactions(filter, {max: 1,time: 15000,errors: ['time']}).then(async collected => {
const reaction = collected.first();

if(reaction.emoji.id === ayarlar.evetID) {
await message.member.voice.channel.members.forEach(a => {
a.voice.setMute(false)
})
await s.delete()
message.channel.send("ses kanalında bulunan bütün üyelerin mikrofonları **açıldı.**")
return
}

if(reaction.emoji.id === ayarlar.hayırID) {
await s.delete()
}
  
}).catch(err => s.delete())
})
}
}
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
  
exports.help = {
  name: 'ayarla',
  bölüm: "yetkili",
  description: 'Seslide bulunan bütün kişilerin mikrofonlarını/kulaklıklarını açar/kapatır.',
  aliases: []
};