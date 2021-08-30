
/* MODÜLLER */
const Discord = require('discord.js')
const yts = require('yt-search')
const fonksiyonlar = require('../fonksiyonlar.js')
const ayarlar = require('../ayarlar.json')
const tiktok = require('tiktok-scraper')
const moment = require('moment')
require('moment-duration-format')
const Parser = require('rss-parser')
/* MODÜLLER */

exports.run = async(client, message, args) => {
  
  try {
const seçenekler = ['youtube', 'tiktok', 'discord'];
  
if(!args[0] || !seçenekler.includes(args[0].toLowerCase())) return fonksiyonlar.hata('Lütfen hangi platformda aradığınızı belirtin. `YouTube`, `TikTok`, `Dìscord`', message)
  
if(args[0].toLowerCase() === 'youtube') {
if(!args[1]) return fonksiyonlar.hata('**YouTube** platformunda aradağınız **kullanıcı hesabının adı**nı belirtin.', message)

const msg = await message.channel.send(new Discord.MessageEmbed() .setColor('ORANGE') .setDescription(ayarlar.bekle + ' Arama işlemi yapılıyor...'))  
  const aramaİşlem = await yts(args.slice(1).join(' '))
  let aramaSonuç = aramaİşlem.accounts;
if(aramaSonuç.length < 0) return msg.edit(new Discord.MessageEmbed() .setColor('RED') .setDescription(ayarlar.red + ' Hesap bulunamadı.'))
else aramaSonuç = aramaSonuç[0];
const parser = new Parser()
  let id = aramaSonuç.url.toString().slice(28)
  let datas = ".";
const data = await parser.parseURL('https://www.youtube.com/feeds/videos.xml?channel_id='+id).catch(err => {
  datas = null;
})
const sonVideo = data ? data.items[0] : null;
  return await msg.edit(new Discord.MessageEmbed() .setColor('RANDOM') .setThumbnail(aramaSonuç.image ? aramaSonuç.image: null) .setTitle(aramaSonuç.name) .setURL(aramaSonuç.url) .setDescription(`
  
  • Kanal ismi → **${aramaSonuç.name}**
  • Kanal profili → [**Tıkla ve Git**](${aramaSonuç.url})
  
  • Mevcut abone sayısı → **${aramaSonuç.subCountLabel == undefined ? 'Abonelik gözükme kapalı.' : aramaSonuç.subCountLabel}**
  • Mevcut video sayısı → **${aramaSonuç.videoCountLabel}**
  
  • Son video → **${aramaSonuç.videoCountLabel == 0 ? 'Kanalda video yok' : ( datas === null ? 'Videolara erişilemedi.' : '['+sonVideo.title+']('+sonVideo.link+')')}**
  `)
)

} else if(args[0].toLowerCase() === 'tiktok') {
  if(!args[1]) return fonksiyonlar.hata('**TikTok** platformunda aradağınız **kullanıcı hesabının adı**nı belirtin.', message)
  
  const msg = await message.channel.send(new Discord.MessageEmbed() .setColor('ORANGE') .setDescription(ayarlar.bekle + ' Arama işlemi yapılıyor...'))
  
  const user = await tiktok.getUserProfileInfo(args[1], {})
  await msg.edit(new Discord.MessageEmbed() .setColor('RANDOM') .setTitle(user.user.nickname).setDescription(`
  
  • Profil → **[@${user.user.uniqueId}](https://www.tiktok.com/@${user.user.uniqueId})**
  • Nick → **${user.user.uniqueId}**
  • Açıklama → **${user.user.signature ? user.user.signature : 'Açıklama yok'}**
  • Oluşum tarihi → **${moment.duration(user.user.createTime).format('Y [yıl], M [ay], D [gn], H [sa], m [dk]')}**
  
  • Profil Fotoğrafı → **[Tıkla ve Git](${user.user.avatarLarger})**
  • Takipçi sayısı → **${user.stats.followerCount}**
  • Takip ettiği kişi sayısı → **${user.stats.followingCount}**
  • Beğeni sayısı → **${user.stats.heartCount}**
  `)
.setThumbnail(user.user.avatarLarger)                
)  
  
} else if(args[0].toLowerCase() === 'discord') {
if(!args[1]) return fonksiyonlar.hata('**Discord** platformunda aradağınız **kullanıcı hesabının adı ve etiketi**ni belirtin.', message)
if(isNaN(args[1])) return fonksiyonlar.hata('Sadece **ID** ile kullanıcı aratabilirim. Eğer kendi kullanıcı bilgilerinizi yada etiketlediğiniz kişinin bilgilerini istiyor iseniz; `m!kullanıcı-bilgi` komutunu deneyin.', message)

const msg = await message.channel.send(new Discord.MessageEmbed() .setColor('ORANGE') .setDescription(ayarlar.bekle + ' Arama işlemi yapılıyor...'))
const kullanıcı = await fonksiyonlar.getUser(args[1])
  
if(!kullanıcı) return msg.edit(new Discord.MessageEmbed() .setColor('RED') .setDescription(ayarlar.red+' Kullanıcıyı bulamadım. Eğer kendi kullanıcı bilgilerinizi yada etiketlediğiniz kişinin bilgilerini istiyor iseniz; `m!kullanıcı-bilgi` komutunu deneyin.'))
return msg.edit(new Discord.MessageEmbed() .setColor('BLUE') .setDescription(`

• Kullanıcı adı → **${kullanıcı.username}**
• Kullanıcı etiketi → **${kullanıcı.discriminator}**
• Kullanıcı hesap oluşturma → **${moment.duration(Date.now() - kullanıcı.createdTimestamp).format('Y [yıl], M [ay], D [gn], H [sa] m [dk]')} önce**

• Kullanıcı profil → **[Tıkla ve Git](${kullanıcı.displayAvatarURL({ dynamic: true})})**
• Ortak sunucu sayısı [BOT] → **${client.guilds.cache.filter(a => a.member(kullanıcı.id)).size}**
• Ortak sunucu sayısı [SEN] → **${client.guilds.cache.filter(a => a.member(message.author.id) && a.member(kullanıcı.id)).size}**
NOT: *Ortak sunucularınız doğru olmayabilir, çünkü botun olduğu sunuculardan sorgulatıyoruz.*
`) .setFooter('Daha detaylı bilgi için; m!kullanıcı-bilgi (@kullanıcı)') .setTitle(kullanıcı.tag) .setURL('https://discord.com/users/'+kullanıcı.id) .setThumbnail(kullanıcı.displayAvatarURL({ dynamic: true})))

} else return; 
  } catch(err) {
    console.log(err)
    return fonksiyonlar.hata('Beklenmeyen bir hata oluştu.', message)
  }
};

exports.help = {
 name: 'hesap-bilgi',
 description: 'Sosyal medya hesaplarını bulur, veri çeker ve size sonucu iletir.',
 aliases: ['youtube-bilgi', 'tiktok-bilgi'],
 bölüm: 'kullanıcı',
 timeout: 15
};
