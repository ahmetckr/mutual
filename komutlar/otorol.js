const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')

exports.run = async(client, message, args) => {
function hata(mesaj) { return message.channel.send(new Discord.MessageEmbed() .setColor("RED") .setDescription(mesaj) .setThumbnail(message.author.avatarURL({dynamic:true})) .setAuthor(client.user.username, client.user.avatarURL()))}
function onay(mesaj) { return message.channel.send(new Discord.MessageEmbed() .setColor("GREEN") .setDescription(mesaj) .setThumbnail(message.author.avatarURL({dynamic:true})) .setAuthor(client.user.username, client.user.avatarURL()))}
const prefix = db.fetch("prefix."+message.guild.id) || require("../ayarlar.json").prefix

if(!args[0]) return hata("**Bir kategori belirtmelisiniz.** ``"+prefix+"otorol liste | "+prefix+"otorol bot | "+prefix+"otorol kullanıcı | "+prefix+"otorol yardım | "+prefix+"otorol sıfırla``")
if(args[0] !== "liste" && args[0] !== "bot" && args[0] !== "kullanıcı" && args[0] !== "yardım" && args[0] !== "sıfırla") return hata("**Bir kategori belirtmelisiniz.** ``"+prefix+"otorol liste | "+prefix+"otorol bot | "+prefix+"otorol kullanıcı | "+prefix+"otorol yardım | "+prefix+"otorol sıfırla``")

if(args[0] === "yardım") {
return message.channel.send(new Discord.MessageEmbed() 
.setColor("RANDOM")
.setThumbnail(message.author.avatarURL({dynamic:true})) 
.setAuthor(client.user.username, client.user.avatarURL())
.setFooter(client.user.username, message.author.avatarURL({ dynamic: true}))
.setDescription("**"+prefix+"otorol yardım** - **Otorol yardım menüsünü görüntüler.** \n\n **"+prefix+"otorol liste** - **Kullanıcılar ve botlar için ayarlanmış otorol listesini gösterir.** \n\n **"+prefix+"otorol kullanıcı** - **Kullanıcılar için otorol ayarlarsınız.** \n\n **"+prefix+"otorol bot** - **Botlar için otorol ayarlarsınız.**")
)
}

if(args[0] === "liste") {
let b;
const bot = db.fetch("otorolbot."+message.guild.id)
if(bot) b = "<@&"+bot+">"
if(!bot) b = "``Ayarlanmamış``"
let a;
const kullanıcı = db.fetch("otorolkullanıcı."+message.guild.id)
if(kullanıcı) a = "<@&"+kullanıcı+">"
if(!kullanıcı) a = "``Ayarlanmamış``"
return message.channel.send(new Discord.MessageEmbed() 
.setColor("RANDOM")
.setAuthor(client.user.username, client.user.avatarURL())
.addField("Kullanıcı", a , true)
.addField("Bot", b , true)
)
}

if(args[0] === "sıfırla") {
if(!message.guild.members.cache.get(client.user.id).hasPermission("MANAGE_ROLES")) return hata("Bu komuta erişebilmek için **Rolleri Yönet** yetkisine sahip olmam gerek.")
if(!message.member.hasPermission("MANAGE_ROLES")) return hata("Bu komutu erişebilmek için **Rolleri Yönet** yetkisine sahip olmalısınız.")
await db.delete("otorolbot."+message.guild.id)
await db.delete("otorolkullanıcı."+message.guild.id)
return message.channel.send("**Sistem başarıyla sıfırlandı!**")
}

if(args[0] === "bot") {
if(!message.guild.members.cache.get(client.user.id).hasPermission("MANAGE_ROLES")) return hata("Bu komuta erişebilmek için **Rolleri Yönet** yetkisine sahip olmam gerek.")
if(!message.member.hasPermission("MANAGE_ROLES")) return hata("Bu komutu erişebilmek için **Rolleri Yönet** yetkisine sahip olmalısınız.")
if(!message.mentions.roles.first()) return hata("**Botlar için verilecek rolü etiketlemelisin!** ``"+prefix+"otorol bot @rol``")
await db.set("otorolbot."+message.guild.id, message.mentions.roles.first().id)
return onay("**Botlar için verilecek rol " + message.mentions.roles.first().name + " olarak ayarlandı!**")
}

if(args[0] === "kullanıcı") {
if(!message.guild.members.cache.get(client.user.id).hasPermission("MANAGE_ROLES")) return hata("Bu komuta erişebilmek için **Rolleri Yönet** yetkisine sahip olmam gerek.")
if(!message.member.hasPermission("MANAGE_ROLES")) return hata("Bu komutu erişebilmek için **Rolleri Yönet** yetkisine sahip olmalısınız.")
if(!message.mentions.roles.first()) return hata("**Kullanıcılar için verilecek rolü etiketlemelisin!** ``"+prefix+"otorol kullanıcı @rol``")
await db.set("otorolkullanıcı."+message.guild.id, message.mentions.roles.first().id)
return onay("**Kullanıcılar için verilecek rol " + message.mentions.roles.first().name + " olarak ayarlandı!**")
}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'otorol', 
  description: 'Sunucunuza oto-rol sistemi kurar.',
  aliases: [],
  bölüm: "yetkili"
}; 