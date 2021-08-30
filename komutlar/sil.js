const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require("../ayarlar.json")
const fonksiyonlar = require('../fonksiyonlar.js')
exports.run = async(client, message, args) => {
if(!message.member.hasPermission("MANAGE_MESSAGES")) return fonksiyonlar.hata("Bu komutu kullanabilmek için **mesajları yönet** yetkisine sahip olmalısın.", message)
if(!message.guild.member(client.user.id).hasPermission("MANAGE_MESSAGES")) return fonksiyonlar.hata("Bu komutu kullanabilmek için **mesajları yönet** yetkisine sahip olmam gerek.", message)
if(!args[0] && isNaN(args[0])) return fonksiyonlar.hata('Bir **sayı** belirt.', message);

let sayı = args[0]
if(!sayı || isNaN(sayı) || sayı <= 0 || sayı > 100) return fonksiyonlar.hata("Lütfen **0 - 100** arası bir sayı **belirt**.", message)
  
message.channel.bulkDelete(sayı).then(s => {
return fonksiyonlar.sendEmbed(`${ayarlar.onay} Silinmesi istenen **${sayı}** mesajdan **${s.size}** mesaj **silindi.**`, { channel: message.channel, color: 'GREEN', thenDelete: 6000})
}).catch((err) => {
return fonksiyonlar.hata('Bir hata oluştu, lütfen destek sunusuna gelip bildirin.', message)
})
};


exports.help = {
  name: 'sil',
  description: 'Belirtilen miktarda mesaj siler.',
  aliases: [],
  bölüm: 'yetkili'
}