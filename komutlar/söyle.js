
/* MODÜLLER */
const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const fonksiyonlar = require('../fonksiyonlar.js');
/* MODÜLLER */

exports.run = async(client, message, args) => {
var google = require("google-tts-api")
try {
if(client.player.nowPlaying(message)) return message.channel.send(new Discord.MessageEmbed() .setColor('RED') .setDescription(ayarlar.red+' Şu anda müzik **çalınıyor**.'))
} catch(err) {
  try {
let söylenecek = args.join(' ');

if(!söylenecek) return fonksiyonlar.hata('Söylenecek cümleyi gir.', message)    
if(söylenecek.length > 200) return fonksiyonlar.hata('**200** karakterden büyük kelimeler söyleyemezsin.', message)
if(['@everyone', '@here'].some(mutual => message.content.toLowerCase().includes(mutual))) return fonksiyonlar.hata('Canım, ben böyle şeyleri yemiyorum.', message)

  
if(!message.member.voice.channel) {


const dosya = google.getAudioUrl(söylenecek, {
    lang: 'tr',
    slow: false,
    host: 'https://translate.google.com/',
    timeout: 10000,
  })
const Attachment = new Discord.MessageAttachment(dosya, 'Mutual.mp3')
return message.channel.send('Söylendi, \'**'+söylenecek+'**\'', Attachment) 
}

if(args[0] === 'espri-yap') {
const smsg = await message.channel.send('Espri yükleniyor...')
require('axios').get('https://api.emirkabal.com/espri').then(async data => {
if(!data || !data.data || !data.data.mesaj) return smsg.edit('Hata oluştu, tekrar deneyin!') 
await message.member.voice.channel.join().then(connection => {
  const mesaj = data.data.mesaj.replace(/\+/, '').replace(/-/, '')
  connection.play(google.getAudioUrl(mesaj, { lang: 'tr', slow: false, host: 'https://translate.google.com' })).on('finish', async() => {
    smsg.edit('Espri yapıldı, sesten çıkılıyor...')
   setTimeout(() => { 
    message.member.voice.channel.leave()  
    }, 2500)
  })
})

})
  return;
}
  

  const msg = await message.channel.send('Söyleniyor... \'**'+söylenecek+'\'**')
await message.member.voice.channel.join().then(async connection => {
  const dosya = google.getAudioUrl(söylenecek, { lang: 'tr', slow: false, host: 'https://translate.google.com', timeout: 5000 })
  connection.play(dosya).on('finish', async() => {
    await message.member.voice.channel.leave()
const Attachment = await new Discord.MessageAttachment(dosya, 'Mutual.mp3')
  await msg.edit('Söylendi \'**'+söylenecek+'**\', sesten çıkılıyor..')
    return message.channel.send('Sesin dosya hâli:', Attachment)
  })
})
  } catch(err) {
    fonksiyonlar.hata('Bir hata oluştu.', message)
  }
}
};

exports.help = {
 name: 'söyle',
 description: 'Ses kanalındaysanız ses kanalına gelip yazılan cümleyi söyler. Değilseniz MP3 formatını atar.',
 aliases: [],
 bölüm: 'kullanıcı',
 timeout: 30
};
