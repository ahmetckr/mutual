
/* MODÜLLER */
const Discord = require('discord.js')
const fonksiyonlar = require('../fonksiyonlar.js')
const moment = require('moment')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
/* MODÜLLER */

exports.run = async(client, message, args) => {
const msg = await message.channel.send('Veriler yükleniyor, lütfen bekle...')

  
  
msg.edit('', new Discord.MessageEmbed() 
.setColor('RANDOM')
.setDescription(`

• Sunucu → **${client.guilds.cache.size}**
• Kullanıcı → **${client.guilds.cache.reduce((a, b) => b.members.cache.size + a, 0).toLocaleString().replace(/,/, '')}**
• Müzik çalma → **${client.voice.connections.size} sunucu**

• Çalışma süresi → **${require('parse-ms')(client.uptime).days}** gün **${require('parse-ms')(client.uptime).hours}** saat **${require('parse-ms')(client.uptime).minutes}** dakika
• Kullanılan bellek → **${(process.memoryUsage().heapUsed / 512 / 512).toFixed(2)} MB** (${((process.memoryUsage().heapUsed / 512 / 512)*100/(process.memoryUsage().heapTotal / 512 / 512)).toFixed(2)}%)
• Toplam komut → **${global.commands.size}**

• Toplam veri → **${db.all().length}**
• Gecikme → **${client.ws.ping}ms**
• Mesaj gecikmesi → **${(Date.now() - msg.createdTimestamp).toFixed()}ms**

${ayarlar.sahip.map(sahip => '• Geliştirici →  **<@!'+sahip+'> | '+client.users.cache.get(sahip).tag+'** ').join('\n')}

`)
.setTitle('Mutual | İstatistikler')                    
).catch((err) => msg.edit('Bir hata oluştu!'))

};

exports.help = {
 name: 'istatistik',
 description: 'Mutual botun istatistiklerini gösterir.',
 aliases: [],
 bölüm: 'kullanıcı'
};
