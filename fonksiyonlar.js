const Discord = require('discord.js')
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json')
client.token = ayarlar.token;
module.exports = {
async sendEmbed(mesaj, { channel, color, title, author, fields, footer, image, thumbnail, timestamp, split, thenDelete}) {
 if(!channel) throw new Error('Kanal verisi gir!');
  if(!mesaj) throw new Error('Mesaj verisi gir!');
  
  
const embed = new Discord.MessageEmbed();
if(fields) {
fields.forEach((f) => embed.addField(f));
};
if(timestamp) {
embed.setTimestamp();
};
  
  if(!color) color = '';
  if(!title) title = '';
  if(!author) author = ['', ''];
  if(!footer) footer = ['', ''];
  if(!image) image = '';
  if(!thumbnail) thumbnail = '';
  if(!timestamp) timestamp = '';
  if(!thenDelete) thenDelete = false;
if(split) {
  for (var i = 1; mesaj.length > 1024*(i-1); i++) {
  if(i == 1) {
  const msg = await channel.send(embed .setTitle(title) .setColor(color) .setAuthor(author[0], author[1]) .setFooter(footer[0], footer[1]) .setImage(image) .setThumbnail(thumbnail) .setDescription(mesaj.substr(1024*(i-1), 1024*i)))
    
    if(thenDelete)  msg.delete({ timeout: thenDelete})
  } else {    
  const msg = await channel.send(embed .setTitle(title) .setColor(color) .setAuthor(author[0], author[1]) .setFooter(footer[0], footer[1]) .setImage(image) .setThumbnail(thumbnail) .setDescription(mesaj.substr(1024*(i-1), 1024*i)))
  
  if(thenDelete) msg.delete({ timeout: thenDelete})
  }
  }
} else {
const msg = await channel.send(embed .setTitle(title) .setColor(color) .setAuthor(author[0], author[1]) .setFooter(footer[0], footer[1]) .setImage(image) .setThumbnail(thumbnail) .setDescription(mesaj));
if(thenDelete) msg.delete({ timeout: thenDelete})
}
},

  async sendSplit(content, msg) {
    for (var i = 1; content.length > 1024*(i-1); i++) {
  if(i == 1) {
  msg.channel.send(content.substr(1024*(i-1), 1024*i))
  } else {
    msg.channel.send(content.substr(1024*(i-1), 1024*i))
  }
  }
  },
  async hata(content, msg) {
    if(!content) throw Error('Hata mesajını girmedin!');
    if(!msg) throw Error('Mesaj verisini girmedin!');
    
    msg.channel.send(new Discord.MessageEmbed()
.setColor('RED')
.setDescription(ayarlar.red + ' '+content)
)
  },
  
  async getUser(id) {
    try {
return await client.users.fetch(id)
    } catch(err) {
      return undefined;
    }
  },
  
  async includesCharacter(text) {
    let turkishCharactersArray = ['ğ', 'ş', 'ı', 'ü', 'ö', 'ç']
    
    return turkishCharactersArray.includes(text.toLowerCase())
  }
  
}