
/* MODÜLLER */
const Discord = require('discord.js')
const yts = require('yt-search')
const moment = require('moment')
require('moment-duration-format')
const fonksiyonlar = require('../fonksiyonlar.js')
const ayarlar = require('../ayarlar.json')
/* MODÜLLER */

exports.run = async(client, message, args) => {
if(!message.member.voice.channel) return fonksiyonlar.hata('Ses kanalında bulunmuyorsun.', message)
if(!args[0]) return fonksiyonlar.hata("bir şarkı ismi belirtmelisin.", message)

const msg = await message.channel.send(new Discord.MessageEmbed() .setColor('ORANGE') .setDescription(ayarlar.bekle + ' Şarkı aranıyor...'))  
let aranacak = await yts(args[0] ? args.slice(0).join(' ') : '')
if(aranacak.videos.length < 1) return msg.edit(new Discord.MessageEmbed() .setColor('RED') .setDescription(ayarlar.red + ' Listelenecek hiç bir şarkı bulunamadı.'))

const liste = aranacak.videos.slice(0, 10).map((mutual, i) => `[**${(i+1)}**] ${mutual.title.substr(0, 90)} | ${mutual.timestamp}`)

await msg.edit(new Discord.MessageEmbed() .setColor('GREEN') .setFooter('1 ile 10 arasından bir seçim yapınız.', message.author.avatarURL({ dynamic: true})) .setTimestamp() .setDescription(liste)).then(c => {
message.channel.awaitMessages((mutual => mutual.author.id == message.author.id), { max: 1, time: 30000, errors: ['time']}).then(async sonuçlar => {
if(isNaN(sonuçlar.first().content)) return fonksiyonlar.hata('Bir sayı girmen gerekliydi.', message)
if(sonuçlar.first().content > 10 || sonuçlar.first().content < 1) return fonksiyonlar.hata('Liste dışı bir sayı girdin.', message)
try {
          if(client.player.isPlaying(message)) {
            let müzik = await client.player.addToQueue(message, aranacak.videos[(sonuçlar.first().content-1)].title);
            if(müzik) return message.channel.send(new Discord.MessageEmbed() .setColor('GREEN') .setDescription('**' + müzik.name+ '** adlı müzik **sıraya eklendi**.'));
            return;
        } else {
            let müzik = await client.player.play(message, {
            search: aranacak.videos[(sonuçlar.first().content-1)].title,
            requestedBy: message.author.tag
        });
 
            if(müzik)
                message.channel.send(new Discord.MessageEmbed() .setColor('GREEN') .setDescription('**' + müzik.name+ '** adlı müzik **çalınıyor**.'));
            return;
        }
} catch(err) {
return fonksiyonlar.hata('Bir hata oluştu.', message)
}
})
})
};

exports.help = {
 name: 'ara',
 description: 'Youtube\'da müzik aratır, seçtiğin şarkıyı ses kanalında çalar.',
 aliases: ['arat', 'bul'],
 bölüm: 'müzik'
};
