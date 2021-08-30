
/* MODÜLLER */
const Discord = require('discord.js')
const fonksiyonlar = require('../fonksiyonlar.js')
/* MODÜLLER */

exports.run = async(client, message, args) => {
if(!client.mutes.has(message.guild.id)) {
await client.mutes.set(message.guild.id, new Discord.Collection())
}
  
const rol = await message.guild.roles.cache.find(mutual => mutual.name === 'Mutual • Susturulmuş')

if(!db.get('mute.'+message.guild.id) || !rol) {
if(rol) {
await db.set('mute.'+message.guild.id+'.rol', rol.id)
} else {
const rol = await message.guild.roles.create({ data: { name: 'Mutual • Susturulmuş', color: '#808080', permissions: []}})

await message.guild.channels.cache.forEach(kanal => kanal.createOverwrite(rol, {
                SEND_MESSAGES: false,
                MANAGE_MESSAGES: false,
                READ_MESSAGES: false,
                ADD_REACTIONS: false
}))
return await fonksiyonlar.hata('Rol oluşturulmamış, oluşturuldu. Tekrar komutu çalıştırın.', message)
}
}
  
  
if(!args[0]) return fonksiyonlar.hata('Kullanıcı etiketle', message)
if(!message.mentions.members.first()) return fonksiyonlar.hata('Kullanıcı etiketle', message)
if(!args[1]) return fonksiyonlar.hata('Süre bilgisi gir. `1yıl, 5ay, 3gün, 1saat, sınırsız`', message)

let member = await message.mentions.members.first();
let süre = await args[1].replace(/yıl/, 'y').replace(/ay/, 'm').replace(/gün/, 'd').replace(/saat/, 'h').replace(/dakika/, 'm').replace(/saniye/, 's')
const süreTimestamp = await require('ms')(süre);
  
await db.set('mute.'+message.guild.id+'.'+message.author.id, { zaman: Date.now(), hedefzaman: süreTimestamp })
if(süre.toLowerCase() !== 'sınırsız') {
setTimeout(async() => {
await member.roles.remove(rol)
await db.delete('mute.'+message.guild.id+'.'+message.author.id)
}, require('ms')(süre))
};

await member.roles.add(rol)
return fonksiyonlar.sendEmbed(`**${member.user.tag}** adlı üye **${args[1]}** süreliğine susturuldu.`, { channel: message.channel, color: 'GREEN'})
};

exports.help = {
 name: 'sustur',
 description: 'Kullanıcıyı süreli/süresiz susturur.',
 aliases: ['mute'],
 bölüm: 'yetkili',
 timeout: 30
};
