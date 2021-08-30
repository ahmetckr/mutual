
/* MODÜLLER */
const Discord = require('discord.js')
const db = require('quick.db')
/* MODÜLLER */

exports.run = async(client, message, args) => {
var kişi = message.mentions.users.first() || message.guild.members.cache.get(args[0] ? args[0] : message.author.id).user || message.author
var total = db.fetch("davet.total."+message.guild.id+"."+kişi.id) || 0
var fake = db.fetch("davet.fake."+message.guild.id+"."+kişi.id) || 0
var bonus = db.fetch("davet.bonus."+message.guild.id+"."+kişi.id) || 0

message.channel.send(new Discord.MessageEmbed()
.setColor("RANDOM")
.setTimestamp()
.setThumbnail(kişi.avatarURL({dynamic:true}))
.setDescription("Bu veriler yalnızca **"+message.guild.name+"** sunucusuna ve **"+kişi.tag+"** kullanıcısına aittir. \n\n → `Total:` " + total + " \n → `Fake:` " + fake + " \n → `Bonus:` " + bonus)
)
};

exports.help = {
 name: 'davetler',
 description: 'Sunucu üzerindeki davet sayınızı gösterir. (Davet sistemi açık olması şart.)',
 aliases: ["davetler", "davets", "invites", "invite", "davet", "davet-sayısı"],
 bölüm: 'davet'
};
