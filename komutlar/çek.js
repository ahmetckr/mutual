const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const moment = require("moment")


exports.run = async(client, message, args) => {
let kişi = message.mentions.members.first() || message.guild.members.cache.get(args[0])

if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("bu komutu kullanabilmek için **kanalları yönet** yetkisine **sahip olmalısın.**")
if(!message.guild.members.cache.get(client.user.id).hasPermission("ADMINISTRATOR")) return message.reply("bu komutu kullanabilmek için **administrator** yetkisine **sahip olmalıyım.**")

if(!message.member.voice.channel) return message.reply("bir ses kanalında **bulunmalısın.**")
if(!kişi && !args[0]) return message.reply("bir kişi ya da bir kanal **belirtmelisin.**")
if(kişi) {
if(kişi.user.bot && kişi.user.id === message.author.id) return message.reply("kendini ya da botları davet **edemezsin.**")
if(!kişi.voice.channel) return message.reply("belirttiğin kişi ses kanalında **bulunmuyor.**")
if(kişi.voice.channel.id === message.member.voice.channel.id) return message.reply("belirtilen kişi ile **aynı ses odasında bulunuyorsunuz.**")
message.channel.send(
"<@"+kişi.user.id+">",
new Discord.MessageEmbed()
.setColor("RANDOM")
.setThumbnail(kişi.user.avatarURL({dynamic:true}))
.setFooter(message.member.voice.channel.name + " | " + kişi.user.username)
.setTimestamp()
.setDescription("Hey <@"+kişi.user.id+">, bir sesli kanala katılma isteği geldi! \n\n・<@"+message.author.id+"> isimli kişi seni **"+message.member.voice.channel.name+"** kanalına çağırıyor! Katılmak istiyorsan lütfen aşağıdaki emojileri kullan.")
).then(async s => {
await s.react(ayarlar.evetID)
await s.react(ayarlar.hayırID)
const filter = (reaction, user) => {
return [ayarlar.evetID, ayarlar.hayırID].includes(reaction.emoji.id) && user.id === kişi.user.id;
};
s.awaitReactions(filter, {max: 1,time: 60000,errors: ['time']}).then(async collected => {
let reaction = collected.first()
if(reaction.emoji.id === ayarlar.evetID) {
await kişi.voice.setChannel(message.member.voice.channel.id)
await s.delete()
await message.channel.send(
new Discord.MessageEmbed()
.setColor("GREEN")
.setThumbnail(kişi.user.avatarURL({dynamic:true}))
.setFooter(message.member.voice.channel.name + " | " + kişi.user.username)
.setTimestamp()
.setDescription("Sese katılma isteği **kabul edildi.** \n\n・Sese Katılan Kişi : <@"+kişi.user.id+"> | `"+kişi.user.tag+"` \n・Ses Kanalı : **"+message.member.voice.channel.name+"** | `"+message.member.voice.channel.id+"`")
)
return
}
if(reaction.emoji.id === ayarlar.hayırID) {
await s.delete()
return message.reply("<@"+kişi.user.id+"> kişisine gönderdiğin sese çekme isteği **reddedildi.**")
}
}).catch(err => s.delete())
})
  return
}
 
let check = message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find(a => a.name === args[0]);
if(!check) return message.reply("bir kanal **belirtmelisin.**")
if(check.type !== "voice") return message.reply("belirttiğin kanal bir **ses kanalı olmalı.**")
if(check.members.size <= 1) return message.reply("belirtilen kanalda **bir üyeden fazla kişi bulunmalı.**")

const filter = (reaction, user) => {
return [ayarlar.evetID, ayarlar.hayırID].includes(reaction.emoji.id) && user.id === message.author.id;
};


message.channel.send(
new Discord.MessageEmbed()
.setColor("RANDOM")
.setThumbnail(client.user.avatarURL())
.setFooter(check.name + " | " + check.members.size)
.setTimestamp()
.setDescription("Hey! <@"+message.author.id+">, **"+check.name+"** kanalında bulunan kullanıcıları bulunduğunuz sesli kanala çekmek istediğinden **emin misin?** \n\n・Çekilecek kullanıcı sayısı: **"+check.members.size+"** \n・Çekilecek kanal ismi: **"+check.name+"**")
).then(async s => {
await s.react(ayarlar.evetID)
await s.react(ayarlar.hayırID)
s.awaitReactions(filter, {max: 1,time: 60000,errors: ['time']}).then(async collected => {
let reaction = collected.first()

if(reaction.emoji.id === ayarlar.evetID) {
await check.members.forEach(a => a.voice.setChannel(message.member.voice.channel.id))
await s.delete()
message.reply("belirtilen kanalda bulunan **"+check.members.size+"** kullanıcı **"+message.member.voice.channel.name+"** isimli sesli kanala **çekildi.**")
return
}

if(reaction.emoji.id === ayarlar.hayırID) {
await s.delete()
}

}).catch(err => s.delete())
})
}
  
exports.help = {
  name: 'çek',
  description: 'Bir odada bulunan herkesi/belirtilen kişiyi bulunduğunuz ses kanalına çeker.',
  aliases: [],
  bölüm: 'yetkili'
};