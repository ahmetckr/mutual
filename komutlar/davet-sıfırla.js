
/* MODÜLLER */
const Discord = require('discord.js')
const db = require('quick.db')
const fonksiyonlar = require('../fonksiyonlar.js')
const ayarlar = require("../ayarlar.json")
/* MODÜLLER */

exports.run = async(client, message, args) => {
if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("bu komutu kullanabilmek için **yönetici** yetkisine sahip olmalısın.")
const filter = (reaction, user) => {
return [ayarlar.evetID, ayarlar.hayır].includes(reaction.emoji.id) && user.id === message.author.id;
};
var kişi = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!kişi) return message.reply("bir kişi belirtmelisin.")

message.channel.send(new Discord.MessageEmbed()
.setColor("YELLOW")
.setThumbnail(message.guild.iconURL({dynamic:true}))
.setTimestamp()
.setDescription(ayarlar.bekle + " <@"+kişi.id+"> kişinin bulunan **bütün** `total | fake | bonus` davetlerini silmek üzeresin. Bu işlemi onaylıyorsan aşağıda verilen emojiye tıkla. \n\n → 20 saniye içerisinde emojiye tıklanmazsa işlem iptal edilecek.")
).then(async s => {
await s.react(ayarlar.evetID)

s.awaitReactions(filter, {max: 1,time: 35000,errors: ['time']}).then(async collected => {
const reaction = collected.first();
  
if(reaction.emoji.id == ayarlar.evetID) {
await db.delete("davet.total."+message.guild.id+"."+kişi.id)
await db.delete("davet.fake."+message.guild.id+"."+kişi.id)
await db.delete("davet.bonus."+message.guild.id+"."+kişi.id)
await s.reactions.removeAll()
return s.edit(new Discord.MessageEmbed()
.setColor("GREEN")
.setTimestamp()
.setDescription(ayarlar.onay + " <@"+kişi.id+"> kişisinin bütün davet verileri **silindi.**")
)
} 

}).catch(err => s.delete({timeout: 1}))
})
};

exports.help = {
 name: 'davet-sıfırla',
 description: 'Davet sıfırlar.',
 aliases: ["davetsıfırla"],
 bölüm: 'davet'
};
