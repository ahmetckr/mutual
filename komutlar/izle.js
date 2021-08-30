const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json')
const fetch = require('node-fetch')
const fonksiyonlar = require('../fonksiyonlar.js');

exports.run = async (client, message, args) => {

 if(!args[0]) return fonksiyonlar.hata('Kanal ID belirtmen gerekiyor.', message);

 let channel = await client.channels.cache.get(args[0]);

 if(!channel) return message.channel.send("Kanal bulunamadı.");
 if(channel.type !== "voice") return message.channel.send("Bu kanal ses kanalı değil.");

const izleID = [{ name: 'YouTube', code: '755600276941176913'}, { name: 'Poker Night', code: '755827207812677713'}, { name: 'Betrayal.io', code: '773336526917861400'}, { name: 'Fishington.io', code: '814288819477020702'}];
let izlencekData = null;

if(args[1] === 'yt') izlencekData = await izleID.findIndex(data => data.name === 'YouTube');
if(args[1] === 'pn') izlencekData = await izleID.findInxex(data => data.name === 'Poker Night');
if(args[1] === 'bio') izlencekData = await izleID.findIndex(data => data.name === 'Betrayal.io');
if(args[1] === 'fio') izlencekData = await izleID.findIndex(data => data.name === 'Fishington.io');

if(args[1] !== 'yt' && args[1] !== 'pn' && args[1] !== 'bio' && args[1] !== 'fio') return message.channel.send(new Discord.MessageEmbed() .setTitle('❌ Bilinmeyen Kod!') .setColor('RED') .setDescription('» İçeriğe erişmek için aşağıdaki kodlardan birini kullanabilirsiniz.\n\n__**KODLAR**__:\n**YouTube** → yt\n**Poker Night** → pn\n**Betrayal.io** → bio\n**Fishington.io** → fio'));

if(!izleID[izlencekData]) return message.channel.send(new Discord.MessageEmbed() .setColor('RED') .setTitle('❌ Olamaz, bir hata oluştu!') .setDescription('» İzlenecek servisin kodu bulunamadı.\n\n**Lütfen, destek sunucumuza gelerek hatayı bildirin!**'));
fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
 method: "POST",
 body: JSON.stringify({
  max_age: 86400,
  max_uses: 0,
  target_application_id: izleID[izlencekData].code,
  target_type: 2,
  temporary: false,
  validate: null
 }),
 headers: {
  "Authorization": `Bot ${client.token}`,
  "Content-Type": "application/json"
}
}).then(res => res.json())
.then(async invite => {
 await message.channel.send(new Discord.MessageEmbed()
    .setTitle("🎉 Parti Başladı!")
    .setDescription(`
» Hey, **${message.member.displayName}** parti başlattı!
• Sende katılmak mı istiyorsun ? 

🥳 __**PARTİ BİLGİLERİ**__:
» Parti Sahibi: **${message.member.displayName}**
» Parti İçeriği: **${izleID[izlencekData].name}**
» Parti Kanalı: **${channel.name}**
» Katılmak için [tıkla](https://discord.gg/${invite.code})!
`)
   .setColor("#ff00c8")
   )
    return;
})
};

exports.help = {
name: 'izle',
aliases: ['youtube-izle', 'oyna'],
description: 'YouTube gibi platformları ses kanalında izlemenize yarar.',
bölüm: 'kullanıcı'
};
