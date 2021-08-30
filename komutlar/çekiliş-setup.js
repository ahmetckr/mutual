const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const fonksiyonlar = require('../fonksiyonlar.js')

exports.run = async (client, message, args) => {
if(!message.member.permissions.has('MANAGE_GUILD')) return fonksiyonlar.hata('Bu komut için yeterli yetkiniz bulunmamakta. Gereken yetki: `Sunucuyu Yönet`', message)
if(!message.guild.member(client.user.id).permissions.has('MANAGE_GUILD')) return fonksiyonlar.hata('Bu komut için yeterli yetkim bulunmamakta. Gereken yetki: `Sunucuyu Yönet`', message)
  
const msg = await message.channel.send(
new Discord.MessageEmbed()
.setTitle('Mutual | Çekiliş Kurulum')
.setColor('BLUE')
.setDescription(`

» __**BİLGİLENDİRME**__:
→ Bot size sırasıyla sorular soracak. Bunlara cevap vererek çekilişi aktif edebilirsiniz. Her bir cevabınızdan sonra bottan onay mesajı bekleyin, eğer onay ya da herhangi bir mesaj göndermez ise lütfen bizle iletin.

» __**ÇEKİLİŞ BİLGİLERİ**__:
• Çekiliş Ödülü → **-**

• Kanal → **Bekleniyor.**
• Rol Şartı → **-**
• Davet Şartı → **-**
• Sunucuda bulunma şartı → **-**

» İstemediğiniz şartları **geç** diyerek geçebilirsiniz.
`)
)
const filter = m => m.author.id == message.author.id;
const collector = message.channel.createMessageCollector(filter, { time: 15000, max: 1 });

collector.on('collect', m => {
	if(m.mentions.channels.first()) {

msg.edit(new Discord.MessageEmbed()
 .setTitle('Mutual | Çekiliş Kurulum')
 .setColor('BLUE')
 .setDescription(`

» __**BİLGİLENDİRME**__:
→ Bot size sırasıyla sorular soracak. Bunlara cevap vererek çekilişi aktif edebilirsiniz. Her bir cevabınızdan sonra bottan onay mesajı bekleyin, eğer onay ya da herhangi bir mesaj göndermez ise lütfen bizle iletin.

» __**ÇEKİLİŞ BİLGİLERİ**__:
• Çekiliş Ödülü → **-**

• Kanal → **${m.mentions.channels.first().toString()}**
• Rol Şartı → **Bekleniyor.**
• Davet Şartı → **-**
• Sunucuda bulunma şartı → **-**

» İstemediğiniz şartları **geç** diyerek geçebilirsiniz.
`))
kanal = m.mentions.channels.first()
	} else {
	if(!message.guild.channels.cache.get(m.content)) return msg.edit(new Discord.MessageEmbed()
.setTitle('Mutual | Çekiliş Kurulum')
.setColor('RED')
.setDescription(`

» __**BİLGİLENDİRME**__:
→ Bot size sırasıyla sorular soracak. Bunlara cevap vererek çekilişi aktif edebilirsiniz. Her bir cevabınızdan sonra bottan onay mesajı bekleyin, eğer onay ya da herhangi bir mesaj göndermez ise lütfen bizle iletin.

» __**ÇEKİLİŞ BİLGİLERİ**__:
• Çekiliş Ödülü → **-**

• Kanal → **Bulunamadı.**
• Rol Şartı → **-**
• Davet Şartı → **-**
• Sunucuda bulunma şartı → **-**

» İstemediğiniz şartları **geç** diyerek geçebilirsiniz.
`))

let channel = message.guild.channels.cache.get(m.content);
kanal = channel;
msg.edit(new Discord.MessageEmbed()
.setTitle('Mutual | Çekiliş Kurulum')
.setColor('BLUE')
.setDescription(`

» __**BİLGİLENDİRME**__:
→ Bot size sırasıyla sorular soracak. Bunlara cevap vererek çekilişi aktif edebilirsiniz. Her bir cevabınızdan sonra bottan onay mesajı bekleyin, eğer onay ya da herhangi bir mesaj göndermez ise lütfen bizle iletin.

» __**ÇEKİLİŞ BİLGİLERİ**__:
• Çekiliş Ödülü → **-**

• Kanal → **${channel.toString()}**
• Rol Şartı → **Bekleniyor.**
• Davet Şartı → **-**
• Sunucuda bulunma şartı → **-**
`))
	}
});


collector.on('end', collected => {
if(!collected.size) return msg.edit(new Discord.MessageEmbed()  .setTitle('Mutual | Çekiliş Kurulum') .setColor('RED') .setDescription(`

» __**BİLGİLENDİRME**__:
→ Bot size sırasıyla sorular soracak. Bunlara cevap vererek çekilişi aktif edebilirsiniz. Her bir cevabınızdan sonra bottan onay mesajı bekleyin, eğer onay ya da herhangi bir mesaj göndermez ise lütfen bizle iletin.

» __**ÇEKİLİŞ BİLGİLERİ**__:
• Çekiliş Ödülü → **-**

• Kanal → **Bilgi verilmedi.**
• Rol Şartı → **-**
• Davet Şartı → **-**
• Sunucuda bulunma şartı → **-**

» Bir şey denilmedi, 15 saniye süre doldu.
`))

const collector2 = message.channel.createMessageCollector(filter, { time: 15000, max: 1 });

collector2.on('collect', m => {
	if(m.content === 'geç') {
		rol = "Geçildi."
	return msg.edit(new Discord.MessageEmbed()
 .setTitle('Mutual | Çekiliş Kurulum')
 .setColor('BLUE')
 .setDescription(`

» __**BİLGİLENDİRME**__:
→ Bot size sırasıyla sorular soracak. Bunlara cevap vererek çekilişi aktif edebilirsiniz. Her bir cevabınızdan sonra bottan onay mesajı bekleyin, eğer onay ya da herhangi bir mesaj göndermez ise lütfen bizle iletin.

» __**ÇEKİLİŞ BİLGİLERİ**__:
• Çekiliş Ödülü → **-**

• Kanal → **${kanal.toString()}**
• Rol Şartı → **Geçildi.**
• Davet Şartı → **-**
• Sunucuda bulunma şartı → **-**

» İstemediğiniz şartları **geç** diyerek geçebilirsiniz.
`))
	}
	if(m.mentions.roles.first()) {
rol = m.mentions.roles.first().toString()
msg.edit(new Discord.MessageEmbed()
 .setTitle('Mutual | Çekiliş Kurulum')
 .setColor('BLUE')
 .setDescription(`

» __**BİLGİLENDİRME**__:
→ Bot size sırasıyla sorular soracak. Bunlara cevap vererek çekilişi aktif edebilirsiniz. Her bir cevabınızdan sonra bottan onay mesajı bekleyin, eğer onay ya da herhangi bir mesaj göndermez ise lütfen bizle iletin.

» __**ÇEKİLİŞ BİLGİLERİ**__:
• Çekiliş Ödülü → **-**

• Kanal → **${kanal.toString()}**
• Rol Şartı → **${m.mentions.roles.first().toString()}**
• Davet Şartı → **Bekleniyor.**
• Sunucuda bulunma şartı → **-**

» İstemediğiniz şartları **geç** diyerek geçebilirsiniz.
`))

	} else {
	if(!message.guild.roles.cache.get(m.content)) return msg.edit(new Discord.MessageEmbed()
.setTitle('Mutual | Çekiliş Kurulum')
.setColor('RED')
.setDescription(`

» __**BİLGİLENDİRME**__:
→ Bot size sırasıyla sorular soracak. Bunlara cevap vererek çekilişi aktif edebilirsiniz. Her bir cevabınızdan sonra bottan onay mesajı bekleyin, eğer onay ya da herhangi bir mesaj göndermez ise lütfen bizle iletin.

» __**ÇEKİLİŞ BİLGİLERİ**__:
• Çekiliş Ödülü → **-**

• Kanal → **${kanal.toString()}**
• Rol Şartı → **-**
• Davet Şartı → **-**
• Sunucuda bulunma şartı → **-**

» Rol bulunamadı.
`))

let role = message.guild.roles.cache.get(m.content);
msg.edit(new Discord.MessageEmbed()
.setTitle('Mutual | Çekiliş Kurulum')
.setColor('BLUE')
.setDescription(`

» __**BİLGİLENDİRME**__:
→ Bot size sırasıyla sorular soracak. Bunlara cevap vererek çekilişi aktif edebilirsiniz. Her bir cevabınızdan sonra bottan onay mesajı bekleyin, eğer onay ya da herhangi bir mesaj göndermez ise lütfen bizle iletin.

» __**ÇEKİLİŞ BİLGİLERİ**__:
• Çekiliş Ödülü → **-**

• Kanal → **${kanal.toString()}**
• Rol Şartı → **${role.toString()}**
• Davet Şartı → **Bekleniyor.**
• Sunucuda bulunma şartı → **-**
`))
rol = role.toString()
	}
});

collector2.on('end', (collected2) => {
if(!collected2.size) return msg.edit(new Discord.MessageEmbed()
 .setTitle('Mutual | Çekiliş Kurulum')
 .setColor('BLUE')
 .setDescription(`

» __**BİLGİLENDİRME**__:
→ Bot size sırasıyla sorular soracak. Bunlara cevap vererek çekilişi aktif edebilirsiniz. Her bir cevabınızdan sonra bottan onay mesajı bekleyin, eğer onay ya da herhangi bir mesaj göndermez ise lütfen bizle iletin.

» __**ÇEKİLİŞ BİLGİLERİ**__:
• Çekiliş Ödülü → **-**

• Kanal → **${kanal}**
• Rol Şartı → **-**
• Davet Şartı → **-**
• Sunucuda bulunma şartı → **-**

» Bir şey denilmedi, 15 saniye süre doldu.
`))


const collector3 = message.channel.createMessageCollector(filter, { time: 15000, max: 1 })

collector3.on('collect', m => {
	if(m.content === 'geç') {
		davet = "Geçildi."
	return msg.edit(new Discord.MessageEmbed()
 .setTitle('Mutual | Çekiliş Kurulum')
 .setColor('BLUE')
 .setDescription(`

» __**BİLGİLENDİRME**__:
→ Bot size sırasıyla sorular soracak. Bunlara cevap vererek çekilişi aktif edebilirsiniz. Her bir cevabınızdan sonra bottan onay mesajı bekleyin, eğer onay ya da herhangi bir mesaj göndermez ise lütfen bizle iletin.

» __**ÇEKİLİŞ BİLGİLERİ**__:
• Çekiliş Ödülü → **-**

• Kanal → **${kanal.toString()}**
• Rol Şartı → **${rol}**
• Davet Şartı → **Geçildi**
• Sunucuda bulunma şartı → **-**

» İstemediğiniz şartları **geç** diyerek geçebilirsiniz.
`))
	}
	if(isNaN(m.content)) return msg.edit(new Discord.MessageEmbed()
.setTitle('Mutual | Çekiliş Kurulum')
.setColor('RED')
.setDescription(`

» __**BİLGİLENDİRME**__:
→ Bot size sırasıyla sorular soracak. Bunlara cevap vererek çekilişi aktif edebilirsiniz. Her bir cevabınızdan sonra bottan onay mesajı bekleyin, eğer onay ya da herhangi bir mesaj göndermez ise lütfen bizle iletin.

» __**ÇEKİLİŞ BİLGİLERİ**__:
• Çekiliş Ödülü → **-**


• Kanal → **${kanal.toString()}**
• Rol Şartı → **${rol}**
• Davet Şartı → **Bekleniyor.**
• Sunucuda bulunma şartı → **-**

» Davet değeri "sayı" olarak girilmedi.
`))

davet = m.content
msg.edit(
new Discord.MessageEmbed()
.setTitle('Mutual | Çekiliş Kurulum')
.setColor('BLUE')
.setDescription(`

» __**BİLGİLENDİRME**__:
→ Bot size sırasıyla sorular soracak. Bunlara cevap vererek çekilişi aktif edebilirsiniz. Her bir cevabınızdan sonra bottan onay mesajı bekleyin, eğer onay ya da herhangi bir mesaj göndermez ise lütfen bizle iletin.

» __**ÇEKİLİŞ BİLGİLERİ**__:
• Çekiliş Ödülü → **-**

• Kanal → **${kanal.toString()}**
• Rol Şartı → **${rol}**
• Davet Şartı → **${m.content}**
• Sunucuda bulunma şartı → **Bekleniyor.**

» İstemediğiniz şartları **geç** diyerek geçebilirsiniz.
`))

});

collector3.on('end', (collected3) => {
if(!collected3.size) return msg.edit(new Discord.MessageEmbed()
.setTitle('Mutual | Çekiliş Kurulum')
.setColor('BLUE')
.setDescription(`

» __**BİLGİLENDİRME**__:
→ Bot size sırasıyla sorular soracak. Bunlara cevap vererek çekilişi aktif edebilirsiniz. Her bir cevabınızdan sonra bottan onay mesajı bekleyin, eğer onay ya da herhangi bir mesaj göndermez ise lütfen bizle iletin.

» __**ÇEKİLİŞ BİLGİLERİ**__:
• Çekiliş Ödülü → **-**

• Kanal → **${kanal.toString()}**
• Rol Şartı → **${rol}**
• Davet Şartı → **${davet}**
• Sunucuda bulunma şartı → **-**

» Bir şey denilmedi, 15 saniye süre doldu.
`));

const collector4 = message.channel.createMessageCollector(filter, { time: 15000, max: 1 });

collector4.on('collect', m => {
	if(m.content === 'geç') {
		sunucu = "Geçildi."
	return msg.edit(new Discord.MessageEmbed()
      .setTitle('Mutual | Çekiliş Kurulum')
      .setColor('BLUE')
      .setDescription(`

» __**BİLGİLENDİRME**__:
→ Bot size sırasıyla sorular soracak. Bunlara cevap vererek çekilişi aktif edebilirsiniz. Her bir cevabınızdan sonra bottan onay mesajı bekleyin, eğer onay ya da herhangi bir mesaj göndermez ise lütfen bizle iletin.

» __**ÇEKİLİŞ BİLGİLERİ**__:
• Çekiliş Ödülü → **-**

• Kanal → **${kanal.toString()}**
• Rol Şartı → **${rol}**
• Davet Şartı → **${davet}**
• Sunucuda bulunma şartı → **Geçildi.**

» İstemediğiniz şartları **geç** diyerek geçebilirsiniz.
`))
	}
	if(isNaN(m.content)) return msg.edit(new Discord.MessageEmbed()
.setTitle('Mutual | Çekiliş Kurulum')
.setColor('RED')
.setDescription(`

» __**BİLGİLENDİRME**__:
→ Bot size sırasıyla sorular soracak. Bunlara cevap vererek çekilişi aktif edebilirsiniz. Her bir cevabınızdan sonra bottan onay mesajı bekleyin, eğer onay ya da herhangi bir mesaj göndermez ise lütfen bizle iletin.

» __**ÇEKİLİŞ BİLGİLERİ**__:
• Çekiliş Ödülü → **B-**

• Kanal → **${kanal.toString()}**
• Rol Şartı → **${rol}**
• Davet Şartı → **${davet}**
• Sunucuda bulunma şartı → **-**

» Sunucu ID değeri "sayı" olarak girilmedi.
`))

if(!client.guilds.cache.has(m.content)) return msg.edit(
new Discord.MessageEmbed()
.setTitle('Mutual | Çekiliş Kurulum')
.setColor('RED')
.setDescription(`

» __**BİLGİLENDİRME**__:
→ Bot size sırasıyla sorular soracak. Bunlara cevap vererek çekilişi aktif edebilirsiniz. Her bir cevabınızdan sonra bottan onay mesajı bekleyin, eğer onay ya da herhangi bir mesaj göndermez ise lütfen bizle iletin.

» __**ÇEKİLİŞ BİLGİLERİ**__:
• Çekiliş Ödülü → **-**

• Kanal → **${kanal.toString()}**
• Rol Şartı → **${rol}**
• Davet Şartı → **${m.content}**
• Sunucuda bulunma şartı → **Geçersiz kılındı.**

» Bulunmadığım sunucu girildi. O sunucuyua eklemek için \`m!davet\`
`));

sunucu =  m.content;
msg.edit(
new Discord.MessageEmbed()
.setTitle('Mutual | Çekiliş Kurulum')
.setColor('BLUE')
.setDescription(`

» __**BİLGİLENDİRME**__:
→ Bot size sırasıyla sorular soracak. Bunlara cevap vererek çekilişi aktif edebilirsiniz. Her bir cevabınızdan sonra bottan onay mesajı bekleyin, eğer onay ya da herhangi bir mesaj göndermez ise lütfen bizle iletin.

» __**ÇEKİLİŞ BİLGİLERİ**__:
• Çekiliş Ödülü → **Bekleniyor.**

• Kanal → **${kanal.toString()}**
• Rol Şartı → **${rol}**
• Davet Şartı → **${m.content}**
• Sunucuda bulunma şartı → **${client.guilds.cache.get(m.content).name}.**


`))

})

collector4.on('end', (collected4) => {
if(!collected4.size) return msg.edit(new Discord.MessageEmbed()  .setTitle('Mutual | Çekiliş Kurulum') .setColor('RED') .setDescription(`

» __**BİLGİLENDİRME**__:
→ Bot size sırasıyla sorular soracak. Bunlara cevap vererek çekilişi aktif edebilirsiniz. Her bir cevabınızdan sonra bottan onay mesajı bekleyin, eğer onay ya da herhangi bir mesaj göndermez ise lütfen bizle iletin.

» __**ÇEKİLİŞ BİLGİLERİ**__:
• Çekiliş Ödülü → **-**

• Kanal → **${kanal.toString()}**
• Rol Şartı → **${rol}**
• Davet Şartı → **${davet}**
• Sunucuda bulunma şartı → **Bilgi verilmedi.**

» Bir şey denilmedi, 15 saniye süre doldu.
`))

const collector5 = message.channel.createMessageCollector(filter, { time: 15000, max: 1})

collector5.on('collect', (m) => {
odul = m.content
msg.edit(new Discord.MessageEmbed()  .setTitle('Mutual | Çekiliş Kurulum') .setColor('GREEN') .setDescription(`

» __**BİLGİLENDİRME**__:
→ Bot size sırasıyla sorular soracak. Bunlara cevap vererek çekilişi aktif edebilirsiniz. Her bir cevabınızdan sonra bottan onay mesajı bekleyin, eğer onay ya da herhangi bir mesaj göndermez ise lütfen bizle iletin.

» __**ÇEKİLİŞ BİLGİLERİ**__:
• Çekiliş Ödülü → **${m.content}**

• Kanal → **${kanal.toString()}**
• Rol Şartı → **${rol}**
• Davet Şartı → **${davet}**
• Sunucuda bulunma şartı → **${sunucu}**

» Çekiliş başlatıldı: :tada:
`))
})

collector5.on('end', async(collected5) => {
if(!collected5.size) odul = "Bilgi verilmedi."
let suncz = null;
if(sunucu !== 'Geçildi.') {
if(client.guilds.cache.has(sunucu)) {
let guildD = await client.guilds.cache.get(sunucu)

let channel = await guildD.channels.cache.filter(channelc => channelc.type === 'text').random();
const invite = await channel.createInvite({ maxAge: 0 });

suncz = invite;
};

}
if(suncz == null) { 
return kanal.send(
new Discord.MessageEmbed()  .setTitle('Mutual | Çekiliş Kurulum') .setColor('BLUE') .setDescription(`

:tada: __**MUTUAL | ÇEKİLİŞ SİSTEMİ**__


• Ödül: **${odul}**
• Katılmak için ${ayarlar.mutual} emojisine basın.

__**ŞARTLAR**__
• Rol Şartı → **${rol === 'Geçildi.' ? 'Yok' : rol}**
• Davet Şartı → **${davet === 'Geçildi.' ? 'Yok' : davet}**
• Sunucuda bulunma şartı → **${sunucu === 'Geçildi.' ? 'Yok' : client.guilds.cache.get(sunucu).name}**

`)).then(async mss => {
await db.set('cekilis.'+mss.id+'.sartlar.sunucu', 'Geçildi.')
await db.set('cekilis.'+mss.id+'.sartlar.rol', 'Geçildi.')
await db.set('cekilis.'+mss.id+'.sartlar.davet', 'Geçildi.')  
mss.react(ayarlar.mutualID)
})
} else {
return kanal.send(`https://discord.gg/${suncz.code} sunucusuna katılmanız şart.`, new Discord.MessageEmbed()  .setTitle('Mutual | Çekiliş Kurulum') .setColor('BLUE') .setDescription(`

:tada: __**MUTUAL | ÇEKİLİŞ SİSTEMİ**__


• Ödül: **${odul}**
• Katılmak için ${ayarlar.mutual} emojisine basın.

__**ŞARTLAR**__
• Rol Şartı → **${rol === 'Geçildi.' ? 'Yok' : rol}**
• Davet Şartı → **${davet === 'Geçildi.' ? 'Yok' : davet}**
• Sunucuda bulunma şartı → **${sunucu === 'Geçildi.' ? 'Yok' : client.guilds.cache.get(sunucu).name}**

`)).then(async mss => {
await db.set('cekilis.'+mss.id+'.sartlar.sunucu', suncz)
await db.set('cekilis.'+mss.id+'.sartlar.rol', rol.replace(/<@&/, '').replace(/>/, ''))
await db.set('cekilis.'+mss.id+'.sartlar.davet', davet)
mss.react(ayarlar.mutualID)
})	
}
})


});
})
})
})
};

exports.help = {
  name: 'çekiliş-setup',
  aliases: [],
  description: 'Çekilişi adım adım kurmanızı sağlar.',
  bölüm: 'yetkili'
  }