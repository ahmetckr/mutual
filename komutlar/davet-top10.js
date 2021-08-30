
/* MODÜLLER */
const Discord = require('discord.js')
const db = require('quick.db')

/* MODÜLLER */

exports.run = async(client, message, args) => {

if(!db.get("davet.bonus."+message.guild.id)) return message.reply("yılda bir gerçekleşen olay sana denk geldi! Sunucuda davet **bulunmuyor.**")

let text =  Object.keys(db.get("davet.total."+message.guild.id)).sort((a,b) => b - a).splice(0, 10).map((a, index) => "**["+(++index)+"]**" + "・Davetci → <@"+a+"> \n ・Davet sayısı → ** "+db.fetch("davet.total."+message.guild.id+"."+a)+"** `"+(db.fetch("davet.fake."+message.guild.id+"."+a) || 0)+" fake | "+(db.fetch("davet.bonus."+message.guild.id+"."+a) || 0)+" bonus`").join(" \n\n ")

let embed = new Discord.MessageEmbed()
.setDescription("**Sen de burada ismini görmek istiyorsan kendi davet linkini oluşturarak arkadaşlarını sunucuya davet edebilirsin. Unutma, yaptığın her davet ile sunucuya destek olursun!** \n\n " + text)
.setThumbnail(message.author.avatarURL({dynamic:true}))
.setColor("RANDOM")
.setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
.setTimestamp()

message.channel.send(embed)

};

exports.help = {
 name: 'davet-top10',
 description: 'Davet sıralamasını gösterir.',
 aliases: [],
 bölüm: 'davet',
 timeout: 10
};
