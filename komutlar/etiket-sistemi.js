
/* MODÜLLER */
const Discord = require('discord.js')
const db = require('quick.db')

const ayarlar = require('../ayarlar.json')
/* MODÜLLER */

exports.run = async(client, message, args) => {  
if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
.setColor("RANDOM")
.setAuthor(client.user.username, client.user.avatarURL())
.setThumbnail(message.author.avatarURL({dynamic:true}))
.setFooter(client.user.username, message.author.avatarURL({dynamic:true}))
.setDescription("**"+ayarlar.prefix+"etiket-sistemi sınır - Etiket sistemi sınırını ayarlarsınız. \n\n "+ayarlar.prefix+"etiket-sistemi aç - Etiket sistemini açarsınız. \n\n "+ayarlar.prefix+"etiket-sistemi kapat - Etiket sistemini kapatırsınız. **")
)
if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(new Discord.MessageEmbed() .setColor('RED') .setDescription(ayarlar.red + ' Bu komutu kullanabilmek için, **Mesajları Yönet** yetkisine ihtiyacın var.'))
const data = await db.get('etiket-sınır.'+message.guild.id)
if(args[0] === 'sınır') {
if(!data) return message.channel.send(new Discord.MessageEmbed() .setColor('RED') .setDescription(ayarlar.red + ' Etiket sistemi kapalı, sistemi aktif ettikten sonra sınır ayarlayabilirsin.'))
if(!args[1]) return message.channel.send(new Discord.MessageEmbed() .setColor('RED') .setDescription(ayarlar.red + ' Sınır sayısı girmen gerek.'))
if(isNaN(args[1])) return message.channel.send(new Discord.MessageEmbed() .setColor('RED') .setDescription(ayarlar.red + ' Sınır sayısı girmen gerek.'))
if(args[1] > 50 || args[1] < 2) return message.channel.send(new Discord.MessageEmbed() .setColor('RED') .setDescription(ayarlar.red + ' **2-50** arasında bir sayı girmen gerek.'))

await db.set('etiket-sınır.'+message.guild.id, args[1])
return message.channel.send(new Discord.MessageEmbed() .setColor('GREEN') .setDescription(ayarlar.onay + ' Etiket sınırı, **'+args[1]+'** olarak belirlendi.'))
}

if(args[0] === "aç") {
if(data) return message.channel.send(new Discord.MessageEmbed() .setColor('RED') .setDescription(ayarlar.red + ' Etiket sistemi zaten açık.'))
await db.set("etiket-sınır."+message.guild.id, 3)
return message.channel.send(new Discord.MessageEmbed() .setColor("GREEN") .setDescription(ayarlar.onay + " Etiket sistemi aktif hale getirildi ve sınır **3** olarak ayarlandı, bu sınırı değiştirmek istiyorsanız **"+ayarlar.prefix+"etiket-sistemi sınır** komutunu kullanabilirsiniz."))
}

if(args[0] === "kapat") {
if(!data) return message.channel.send(new Discord.MessageEmbed() .setColor('RED') .setDescription(ayarlar.red + ' Etiket sistemi zaten kapalı.'))
await db.delete("etiket-sınır."+message.guild.id)
return message.channel.send(new Discord.MessageEmbed() .setColor("GREEN") .setDescription(ayarlar.onay + " Etiket sistemi kapatıldı."))
}

};

exports.help = {
 name: 'etiket-engel',
 description: 'Mesajda maksimum etiketlenebilecek kullanıcı/rol sayısını ayarlarsınız.',
 aliases: ["etiketengel", "etiketsistemi", "etiket-sistemi"],
 bölüm: 'sistemler'
};
