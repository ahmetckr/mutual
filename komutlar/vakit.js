const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json')
const fetch = require('node-fetch')
exports.run = async (client, message, args) => {

if(!args[0]) return message.channel.send('Şehir ismi gir.')

// VERİ ÇEKME
const log = await fetch("https://api.collectapi.com/pray/all?data.city="+args[0].toLowerCase(), { 
method: "GET",
headers: { 
"Content-type": "application/json",
"Authorization": "apikey 4W9BlzkJc9PcoS4eh9AOs5:3AGCdj238G8hkEJt8EXvPl"
}
});

//VERİ AYIRMA
const datas = await log.json()
const dataIftar = await datas.result.filter(ezan => ezan.vakit === 'Akşam');


//İftar MS Bulma
const kesikZamanIftar = await (dataIftar[0].saat).split(':');
const zmni = new Date()
zmni.setHours(kesikZamanIftar[0])
zmni.setMinutes(kesikZamanIftar[1])
zmni.setSeconds("0");

const zamanIftar = zmni.getTime()

//Iftara yakınlık öğrenme
const smdi = new Date()
smdi.setHours(smdi.getHours()+3)
const simdi = smdi.getTime();
const bitisT = zamanIftar-simdi;

//Eğer bittiği timesta
if(bitisT > 0) {
//Iftar tarafı

const saatIftar = Math.floor((bitisT % (1000*60*60*24))/(1000*60*60))
const dakikaIftar = Math.floor((bitisT % (1000*60*60))/(1000*60))
const saniyeIftar = Math.floor((bitisT % (1000*60))/1000)

const displaySaatIftar = ("0"+saatIftar).slice(-2)
const displayDakikaIftar = ("0"+dakikaIftar).slice(-2)
const displaySaniyeIftar = ("0"+saniyeIftar).slice(-2)

const embed = new Discord.MessageEmbed()
.setTitle('NAMAZ VAKITLERİ')
.setColor('BLUE')
.setDescription(`
» İftara **${displaySaatIftar}** sa, **${displayDakikaIftar}** dk, **${displaySaniyeIftar}** sn kaldı.
`)
.setThumbnail(message.guild.iconURL({ dynamic: true}))
.setFooter('Bu bilgiler '+(args[0] ? args[0] : 'İstanbul')+' için geçerlidir.')
datas.result.forEach((namaz) => {
embed.addField(`• ${(namaz.vakit === 'Akşam' ? '**Akşam**' : namaz.vakit)}`, `${namaz.vakit === 'Akşam' ? '**'+namaz.saat+'**' : namaz.saat}`, true)
})
return message.channel.send(embed);

} else {

//Sahur bulma
const dataSahur = await datas.result.filter(ezan => ezan.vakit === 'İmsak');

//Sahur ms bulma
const kesikZamanSahur = await (dataSahur[0].saat).split(':');
const zmn = new Date()
zmn.setHours(kesikZamanSahur[0])
zmn.setMinutes(kesikZamanSahur[1])
zmn.setSeconds("0");

const zamanSahur = zmn.getTime();

const simdis = new Date().getTime()
const bitisSahur = zamanSahur-simdis;

const saatSahur = Math.floor((bitisSahur % (1000*60*60*24))/(1000*60*60))
const dakikaSahur = Math.floor((bitisSahur % (1000*60*60))/(1000*60))
const saniyeSahur = Math.floor((bitisSahur % (1000*60))/1000)

const displaySaatSahur = ("0"+saatSahur).slice(-2)
const displayDakikaSahur = ("0"+dakikaSahur).slice(-2)
const displaySaniyeSahur = ("0"+saniyeSahur).slice(-2)

const embed = new Discord.MessageEmbed()
.setTitle('NAMAZ VAKITLERİ')
.setColor('BLUE')
.setDescription(`
» Sahura **${displaySaatSahur}** sa, **${displayDakikaSahur}** dk, **${displaySaniyeSahur}** sn kaldı.
`)
.setThumbnail(message.guild.iconURL({ dynamic: true}))
.setFooter('Bu bilgiler '+(args[0] ? args[0] : 'İstanbul')+' için geçerlidir.')

datas.result.forEach((namaz) => {
embed.addField(`• ${(namaz.vakit === 'İmsak' ? '**İmsak**' : namaz.vakit)}`, `${namaz.vakit === 'İmsak' ? '**'+namaz.saat+'**' : namaz.saat}`, true)
})

return message.channel.send(embed);
}

}
exports.help = {
  name: 'vakit',
  aliases: ['iftarakalan', 'sahurakalan', 'namazvakitleri'],
  description: 'İftara kalan süre!.',
  bölüm: 'kullanıcı'
  }