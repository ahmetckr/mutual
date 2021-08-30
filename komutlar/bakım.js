
/* MODÜLLER */
const Discord = require('discord.js')
const fonksiyonlar = require('../fonksiyonlar.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
/* MODÜLLER */

exports.run = async(client, message, args) => {
if(!ayarlar.sahip.includes(message.author.id)) return;

if(!args[0]) return fonksiyonlar.hata('Lütfen bir **sebep** yada **komut ismi** gir.', message)
  let cmd;
if (global.commands.has(args[0])) {
cmd = global.commands.get(args[0]);
} else if (global.aliases.has(args[0])) {
cmd = global.commands.get(global.aliases.get(args[0]));
}
  if(cmd) {
    
  if(db.get('bakım.'+cmd.help.name)) {
    
  await db.delete('bakım.'+cmd.help.name)
  return fonksiyonlar.sendEmbed(ayarlar.onay+' **'+cmd.help.name+'** adlı komutun bakımı **kapalı**.', { channel: message.channel, color: 'GREEN'})
  return fonksiyonlar.sendEmbed('**'+message.author.tag+'** adlı sahibim **'+cmd.help.name+'** adlı komutun bakım modunu **kapattı**', { channel: client.channels.cache.get(ayarlar.log), color: 'GREEN'})
    
  } else {
  
    await db.set('bakım.'+cmd.help.name, { sebep: args[1] ? args.slice(1).join(' ') : 'Belirtilmedi', zaman: Date.now()})
    await fonksiyonlar.sendEmbed(ayarlar.onay+' **'+cmd.help.name+'** adlı komutun bakımı **aktif**.', { channel: message.channel, color: 'GREEN'})
    return fonksiyonlar.sendEmbed('**'+message.author.tag+'** adlı sahibim **'+cmd.help.name+'** adlı komutun bakım modunu **açtı**', { channel: client.channels.cache.get(ayarlar.log), color: 'GREEN'})
  
  }
  
  } else {
  
    if(db.get('bakım.bot')) {
  
      await db.delete('bakım.bot', { sebep: args[0] ? args.slice(0).join(' ') : 'Belirtmedi', zaman: Date.now()})
      await  fonksiyonlar.sendEmbed(ayarlar.onay+' Bakım modu **kapalı**.', { channel: message.channel, color: 'GREEN'})
return fonksiyonlar.sendEmbed('**'+message.author.tag+'** adlı sahibim **Bot**un bakım modunu **kapattı**', { channel: client.channels.cache.get(ayarlar.log), color: 'GREEN'})
    
    } else {
  
      await db.set('bakım.bot', { sebep: args[0] ? args.slice(0).join(' ') : 'Belirtmedi', zaman: Date.now()})
      await fonksiyonlar.sendEmbed(ayarlar.onay+' Bakım modu **aktif**.', { channel: message.channel, color: 'GREEN'})
     return fonksiyonlar.sendEmbed('**'+message.author.tag+'** adlı sahibim **Bot**un bakım modunu **açtı**', { channel: client.channels.cache.get(ayarlar.log), color: 'GREEN'})
      
    }
  };
};

exports.help = {
 name: 'bakım',
 description: 'Bot bakımını açar/kapatır',
 aliases: ['bakım-komut'],
 bölüm: 'sahip'
};
