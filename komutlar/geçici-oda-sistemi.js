
/* MODÜLLER */
const Discord = require('discord.js')
const db = require('quick.db')
const fonksiyonlar = require('../fonksiyonlar.js')
/* MODÜLLER */

exports.run = async(client, message, args) => {

if(!message.member.hasPermissions('MANAGE_GUILD')) return fonksiyonlar.hata('Bu komutu kullanabilmek için **Sunucuyu Yönet** yetkisine ihtiyacınız var.')

if(!args[0]) return fonksiyonlar.hata('Lütfen bir seçenek belirtin. `aç | kapat`')

if(args[0] !== 'aç' || args[0] !== 'kapat') return fonksiyonlar.hata('Lütfen bir seçenek belirtin. `aç | kapat`')
if(args[0] === 'aç') {
const channel = await message.guild.channels.create('[M] • Geçici Oda Oluştur', { type: 'voice'}) 
await db.set('geçicioda.'+message.guild.id, channel.id)
return fonksiyonlar.sendEmbed('Geçici oda sistemi başarı ile **kuruldu**.', { channel: message.channel, color: 'GREEN'})
} else if(args[0] === 'kapat') {
  
};
  
  
};

exports.help = {
 name: 'geçici-oda-sistemi',
 description: 'Geçici oda sistemini ayarlamanıza yarayan komut.',
 aliases: ['geçici-oda', 'geçici-oda-kur'],
 bölüm: 'sistemler',
 timeout: 5
};
