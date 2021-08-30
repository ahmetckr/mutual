
/* MODÜLLER */
const Discord = require('discord.js')
const fonksiyonlar = require('../fonksiyonlar.js')
/* MODÜLLER */

exports.run = async(client, message, args) => {
if(!message.channel.nsfw) return fonksiyonlar.hata('Bu komut **NSFW** modunda çalışmak zorundadır. +18 Sitelerde kullanılırsa diye böyle bir işlem yaptık.', message)
if(!args[0]) return fonksiyonlar.hata('URL girmen gerek.', message)

if(!args[0].startsWith(('http' || 'https')) || args[0] === ('http' || 'https')) return fonksiyonlar.sendError('Lütfen http yada https ile başlayan bir url gir.', message)
const dosya = 'https://api.apiflash.com/v1/urltoimage?url='+args[0]+'&accept_language=tr&access_key=f6acb5f7236c4d988f462e4c04bcbc4c';
client.sendMessage(message.from.id, dosya, { replyToMessage: message.from.id})
};

exports.help = {
 name: 'url-resim',
 description: 'Girdiğiniz url sitesine girer resim alıp size gösterir.',
 aliases: ['url-to-image']

};
