const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')

exports.run = async(client, message, args) => {

const filter = (reaction, user) => {
return [ayarlar.evetID].includes(reaction.emoji.id) && user.id === message.author.id;
};

let  mesaj = await db.fetch("destek-mesaj."+message.guild.id)
let rol = await db.fetch("destek-rol."+message.guild.id)
let kategori = await db.fetch("destek-kategori."+message.guild.id)

if(!message.member.hasPermission("ADMINISTRATOR") && !ayarlar.sahip.includes(message.author.id)) return message.reply("bu komutu kullanabilmek için **yönetici** yetkisine sahip olmalısın.")
if(!message.guild.members.cache.get(client.user.id).hasPermission("MANAGE_CHANNELS") && !message.guild.members.cache.get(client.user.id).hasPermission("MANAGE_ROLES")) return message.reply("bu sistemi kurabilmek için **rolleri yönet** ve **kanalları yönet** yetkilerine sahip olmalıyım.")
if(mesaj && rol && kategori) return message.reply("destek kurulumu zaten gerçekleştirilmiş.")

message.channel.send(new Discord.MessageEmbed().setColor("YELLOW").setDescription(ayarlar.bekle + " Destek sistemi kurulumu için **1 rol** `destek yetkilisi`, **1 kategori** `destek talepleri` ve **1 kanal** `destek oluştur` açılacak. Kurulumu onaylıyorsan aşağıdaki emojiye tıkla. \n\n → 20 saniye içerisinde emojiye tıklanmazsa işlem geçersiz kılınacak.")).then(async s => {
await s.react(ayarlar.evetID)

s.awaitReactions(filter, {max: 1,time: 20000,errors: ['time']}).then(async collected => {
const reaction = collected.first();
if(reaction.emoji.id == ayarlar.evetID) {

await message.guild.channels.create("destek-oluştur").then(async kanal => {
await kanal.createOverwrite(message.guild.roles.everyone,{
SEND_MESSAGES: false,
READ_MESSAGES: true,
ADD_REACTIONS: false
})

kanal.send(new Discord.MessageEmbed() .setColor("GREEN") .setDescription(ayarlar.mutual + " Aşağıdaki emojiye tıklayarak bir destek talebi oluşturabilirsin. Unutma en faza **bir tane** destek talebi oluşturabilirsin. Bir destek talebine sahipsen yenisini **oluşturamazsın.**"))
.then(async x => {
await kanal.messages.cache.get(x.id).react(`${ayarlar.mutualID}`) 
await db.set("destek-mesaj."+message.guild.id, x.id) 
})
}) // kanal destek-oluştur



await message.guild.roles.create({data: { name: "Destek Ekibi", color: '#ffffff'}}).then(async b => {
 await db.set("destek-rol."+message.guild.id, b.id)

 await message.guild.channels.create("Destek Talepleri", {

type: "category",
id: message.guild.roles.everyone,
deny: ["READ_MESSAGES", "SEND_MESSAGES"]

}).then(async y => {
db.set("destek-kategori."+message.guild.id, y.id)
y.updateOverwrite(b.id, {VIEW_CHANNELS: true, SEND_MESSAGES: true})
// kategori destek-talepleri ve destek rolü
})
})



} // collected

return s.edit(new Discord.MessageEmbed().setColor("GREEN").setDescription(ayarlar.onay + " Sistem kuruldu."))
}) }) // main yazı


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'destek-kurulum',
  description: 'Destek sistemini kurarsınız.',
  aliases: ['destek'],
  bölüm: 'sistemler',
  timeout: 7
};