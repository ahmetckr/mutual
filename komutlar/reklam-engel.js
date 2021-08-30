
/* MODÜLLER */
const Discord = require('discord.js')
const db = require('quick.db')
const fonksiyonlar = require('../fonksiyonlar.js')
/* MODÜLLER */

exports.run = async(client, message, args) => {
if(!message.member.hasPermission('MANAGE_GUILD')) return fonksiyonlar.hata('Bu komuta erişmek için **Sunucuyu Yönet** yetkisine ihtiyacınız var.', message)
if(!message.guild.member(client.user.id).hasPermission('MANAGE_GUILD')) return fonksiyonlar.hata('Bu komuta erişmek için **Sunucuyu Yönet** yetkisine ihtiyacım var.', message)
if(!args[0]) return fonksiyonlar.hata('Lütfen bir seçenek belirtin. / `aç`, `kapat`', message)
  
const data = await db.has('reklamengel.'+message.guild.id)
if(args[0] === 'aç') {

if(data) return fonksiyonlar.hata('Zaten reklam engel sisteminiz **açık** durumda. Kapatmak isterseniz; `m!reklamengel kapat`')
await db.set('reklamengel.'+message.guild.id, true)
return fonksiyonlar.sendEmbed('Reklam engelleme sistemi **aktif** duruma getirildi.', { channel: message.channel, color: 'GREEN', author: [client.user.username, client.user.displayAvatarURL({ dynamic: true})]})

} else if(!args[0] === 'kapat') {

if(!data) return fonksiyonlar.hata('Zaten reklam engel sisteminiz **kapalı** durumda. Açmak isterseniz; `m!reklamengel aç`')
await db.delete('reklamengel.'+message.guild.id)
return fonksiyonlar.sendEmbed('Reklam engelleme sistemi **kapalı** duruma getirildi.', { channel: message.channel, color: 'GREEN', author: [client.user.username, client.user.displayAvatarURL({ dynamic: true})]})
} else return fonksiyonlar.hata('Lütfen bir seçenek belirtin. / `aç`, `kapat`', message)
};

exports.help = {
 name: 'reklam-engel',
 description: 'Sunucunuza atılan discord sunucu davetlerini engeller.',
 aliases: ['reklamengel'],
 bölüm: 'sistemler',
 timeout: 7
};
