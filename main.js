/* MODÜLLER */
const Discord = require('discord.js')
const { Client, Collection } = require('discord.js')
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION','USER'] });
const fs = require('fs')
const moment = require('moment')
const http = require('http');
const express = require('express');
const app = express();
const ayarlar = require("./ayarlar.json")
const db = require('quick.db')
const fonksiyonlar = require('./fonksiyonlar.js')
moment.locale('tr');

/* MODÜLLER */


/* ÇALIŞTIRMA KODLARI */

 client.login(ayarlar.token);

moment.locale("tr")

/* */
global.commands = new Collection();
global.aliases = new Collection();
client.mutes = new Collection()
const gecikmeler = new Collection();

fs.readdir('./komutlar', (err, files) => {
  if (err) console.error(err);
  console.log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
   if(!f.endsWith('.js')) return
    let props = require(`./komutlar/${f}`);
   if(!props.help) return 
    console.log(`Yüklenen komut: { ${props.help.name} }`);
    global.commands.set(props.help.name, props);
    props.help.aliases.forEach(aliases => {
      global.aliases.set(aliases, props.help.name);
    });
  });
}); 

global.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      global.commands.set(command, cmd);
      cmd.help.aliases.forEach(alias => {
        global.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.on('message', async message => {
if(!message.guild || message.author.bot) return;
  
let p = ayarlar.prefix;
if(!message.content.startsWith(p)) return;

let command = message.content.split(" ")[0].slice(p.length);
let params = message.content.split(" ").slice(1);
  

let cmd;

if (global.commands.has(command)) {
cmd = global.commands.get(command);
} else if (global.aliases.has(command)) {
cmd = global.commands.get(global.aliases.get(command));
}

if(cmd) {
if(!gecikmeler.has(cmd.help.name)) {
  gecikmeler.set(cmd.help.name, new Collection())
}
  
const beklemeDataları = gecikmeler.get(cmd.help.name);
const bekleme = (cmd.help.timeout || 5)*1000

if(beklemeDataları.has(message.author.id) && !ayarlar.sahip.includes(message.author.id)) {
const kalanZaman = beklemeDataları.get(message.author.id) + bekleme
if(kalanZaman > Date.now()) {
let kalanSaniye = (kalanZaman - Date.now())/1000
return fonksiyonlar.hata('Bu komutu kullanabilmeniz için **'+kalanSaniye.toFixed(2)+'** saniye beklemeniz gerek.', message)
}  
}
// BAKIM

if(!ayarlar.sahip.includes(message.author.id)) {
  
if(db.get('bakım.bot')) { 
return fonksiyonlar.hata('Üzgünüz, Mutual şu anda bakımda. Lütfen daha sonra tekrar deneyiniz.\n\n• Sebep → **'+db.get('bakım.bot').sebep+'**\n• Geçen süre → **'+moment.duration(Date.now() - db.get('bakım.bot').zaman).format('Y [yıl], M [ay], D [gn], H [sa], m [dk], s [sn]')+'**', message)  

} else if(db.get('bakım.'+cmd.help.name)) {
  
return fonksiyonlar.hata('Üzgünüz, **'+cmd.help.name+'** komutu şu anda bakımda. Lütfen daha sonra tekrar deneyiniz.\n\n• Sebep → **'+db.get('bakım.'+cmd.help.name).sebep+'**\n• Geçen süre → **'+moment.duration(Date.now() - db.get('bakım.'+cmd.help.name).zaman).format('Y [yıl], M [ay], D [gn], H [sa], m [dk], s [sn]')+'**', message)  

}
}


  
  
await cmd.run(client, message, params)

  beklemeDataları.set(message.author.id, Date.now())
  setTimeout(() => {
    beklemeDataları.delete(message.author.id)
  }, bekleme)
 // KOMUT LOG 
if(!ayarlar.sahip.includes(message.author.id)) {
return client.channels.cache.get(ayarlar.log).send(new Discord.MessageEmbed() .setColor('#faf5f5') .setDescription(`

__**MUTUAL KOMUT LOG**__

• Kullanılan komut → **${cmd.help.name}**
• Komutu kullanan  → **${message.author.tag}** [${message.author.id}]
• Komut kanalı     → **${message.channel.name}** [${message.channel.id}]
• Komut sunucusu   → **${message.guild.name}** [${message.guild.id}]

• Mesaj
\`\`\`js
${message.content}
\`\`\`
`))
};
  
};
  
});

client.on('ready', async() => {
console.log(client.user.username+', artık aktif hizmete hazırım!')
client.user.setActivity('m!yardım | '+client.guilds.cache.size + ' sunucu', { type: 'WATCHING'})
  
setTimeout(async() => {
let veri = await db.fetch("reboot")
if(veri) {
client.channels.cache.get(veri.kanal).messages.fetch(veri.mesajid).then(mete => mete.edit(new Discord.MessageEmbed() .setColor("GREEN") .setDescription(ayarlar.onay+" Bot yeniden **başlatıldı**, yeniden başlatma işleminden sonraki ve önceki ping değeri **"+client.ws.ping+"** milisaniye. / **"+veri.oping+"** milisaniye.")))
db.delete("reboot")
}
}, 1500)
})

const { Player } = require("discord-music-player");
const player = new Player(client, {
  leaveOnEmpty: true,
  quality: 'low',
  volume: 100,
  timeout: 0
});
client.player = player;
client.player.on('queueEnd', (message, queue) =>
        message.channel.send(new Discord.MessageEmbed() .setColor('RED') .setDescription("Çalınması gereken **"+queue.songs.length+"** şarkıyı çaldım, sırada şarkı olmadığı için kanaldan **ayrıldım.**")));
client.player.on('songChanged', (message, newSong, oldSong) => {
  message.channel.send(new Discord.MessageEmbed() .setColor('GREEN') .setDescription('**' + newSong.name+ '** adlı müzik **çalınıyor**.'));
})
client.on('disconnect', async() => {
await db.set('kesinti', Date.now())
return console.log('Ufak bir bağlantı kesintisi yaşanıyor..')
})

client.on('reconnect', async() => {
await fonksiyonlar.sendEmbed('Ufak bir kesinti yaşadım. Kesinti süresi: **'+moment.duration(Date.now() - db.get('kesinti')).format('Y [yıl], M [ay], D [gn], H [sa], m [dk], s [sn]')+'**', { channel: client.channels.cache.get(ayarlar.log), color: 'GREEN'})
return db.delete('kesinti')
})
/* ÇALIŞTIRMA KODLARI */

/* SİSTEMLER */

client.on("messageReactionAdd", async(reaction, user) => {
let mesaj = await db.fetch("destek-mesaj."+reaction.message.guild.id)
let rol = await db.fetch("destek-rol."+reaction.message.guild.id)
let kategori = await db.fetch("destek-kategori."+reaction.message.guild.id)

let embed = new Discord.MessageEmbed()
.setColor("YELLOW")
.setThumbnail(user.avatarURL({dynamic:true}))
.setTimestamp()
.setDescription("<@"+user.id+">, yetkili ekibimiz (<@&"+rol+">) en kısa sürede sizinle ilgilenecektir. \n\n → Destek talebinizi kapatmak için **"+ayarlar.prefix+"destek-kapat** yazmanız yeterli olacaktır.")

if(!mesaj) return
if(!rol) return
if(!kategori) return
let kanal = reaction.message.guild.channels.cache.find(a => a.name === "destek-"+user.id)
if(reaction.message.id == mesaj) {
reaction.users.remove(user.id)
if(kanal) return reaction.message.channel.send("<@"+user.id+">, zaten bir destek talebin bulunuyor, lütfen oradan devam et. <#"+kanal.id+">").then(x => x.delete({timeout:5000}))
const x = await reaction.message.guild.channels.create("destek-"+user.id, {
  type: 'text',
  parent: kategori,
  permissionOverwrites: [{
    id: reaction.message.guild.roles.everyone.id,
    deny: ['SEND_MESSAGES', 'VIEW_CHANNEL']
  },
  {
    id: reaction.message.guild.roles.cache.get(rol).id,
    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
  },
  {
    id: user.id,
    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
  }]
})

  
x.send("<@"+user.id+"> | <@&"+rol+">", embed).then(s => s.react(ayarlar.mutualID))


}

})

client.on("message", async(message) => {
if(!message.guild) return
if(message.author.bot) return
if(!message.channel.name.startsWith("destek-")) return
if(message.content !== ayarlar.prefix+"destek-kapat") return
message.channel.send("Bu destek talebi <@"+message.author.id+"> isimli yetkili tarafından kapatıldı.").then(x => {
setTimeout(() => {
message.channel.delete()
},2500)
})

})

client.on("guildMemberAdd", async(member) => {
if(member.user.bot) {
if(!db.fetch("otorolbot."+member.guild.id)) return
await member.guild.members.cache.get(member.id).roles.add(db.fetch("otorolbot."+member.guild.id))
} else {
if(!db.fetch("otorolkullanıcı."+member.guild.id)) return
await member.guild.members.cache.get(member.id).roles.add(db.fetch("otorolkullanıcı."+member.guild.id))
}
})

const wait = require("util").promisify(setTimeout);
const invites = {};

client.on("ready", () => {
wait(1000);
client.guilds.cache.filter(a => a.member(client.user.id).hasPermission('MANAGE_GUILD')).forEach(g => {
g.fetchInvites().then(s => {
invites[g.id] = s;
});
});
});



client.on("guildMemberAdd", async(member) => {
if(member.user.bot) return
if(!member.guild) return
  
const log = db.fetch("davet-log."+member.guild.id)
if(!log) return

await member.guild.fetchInvites().then(async guildInvites => {
const ei = invites[member.guild.id];
const invite = guildInvites.find(i => !ei.get(i.code) || ei.get(i.code).uses < i.uses);
const inviter = client.users.cache.get(invite.inviter.id);

if(!inviter) {
return member.guild.channels.cache.get(log).send(new Discord.MessagEmbed()
.setColor("RED")
.setDescription(ayarlar.red2 + "<@"+member.user.id+"> kişisi sunucumuza **katıldı** ancak kimin davet ettiğini **bulamadım.**")
)

}

let total = db.fetch("davet.total."+member.guild.id+"."+invite.inviter.id) || 0
let fake = db.fetch("davet.fake."+member.guild.id+"."+invite.inviter.id) || 0 
let bonus = db.fetch("davet.bonus."+member.guild.id+"."+invite.inviter.id) || 0 

let user = client.users.cache.get(member.id)

if(member.user.createdTimestamp < 259200000) {
await db.add("davet.fake."+member.guild.id+"."+invite.inviter.id, 1)
await db.add("davet.total."+member.guild.id+"."+invite.inviter.id, 1)
await db.set("davet-sorgu."+member.guild.id+"."+member.id, { davetçi: invite.inviter.id, zaman: Date.now(), tür:"fake"})
member.guild.channels.cache.get(log).send(new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(ayarlar.onay2 + " <@"+member.user.id+"> kişisi <@"+invite.inviter.id+"> kişisinin davet ile sunucumuza **katıldı.** Ancak bu kişinin hesabı **3 günden önce** açıldığı için fake hesap sayıldı ve toplam davet sayısı **"+(total+1)+"** olarak güncellendi. `"+(fake+1)+" fake | "+bonus+" bonus`")
)
return
}

await db.add("davet.total."+member.guild.id+"."+invite.inviter.id, 1)
await db.set("davet-sorgu."+member.guild.id+"."+member.id, { davetçi: invite.inviter.id, zaman: Date.now(), tür:"güvenli"})

member.guild.channels.cache.get(log).send(new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(ayarlar.onay2 + " <@"+member.user.id+"> kişisi <@"+invite.inviter.id+"> kişisinin daveti ile sunucumuza **katıldı.** <@"+invite.inviter.id+"> kişisinin davet sayısı **"+(total+1)+"** olarak güncellendi. `"+fake+" fake | "+bonus+" bonus`")
)
})

})

client.on('guildMemberRemove', async(member) => {
if(member.user.bot) return
if(!member.guild) return
  
const log = db.fetch("davet-log."+member.guild.id)
if(!log) return

let inviter = await db.get("davet-sorgu."+member.guild.id+"."+member.id)
if(!inviter && !member.guild.members.cache.get(inviter.davetçi)) {
return member.guild.channels.cache.get(log).send(new Discord.MessagEmbed() .setColor("RED") .setDescription(ayarlar.red2 + "<@"+member.user.id+"> kişisi sunucumuza **ayrıldı** ancak kimin davet ettiğini **bulamadım.**"))
}
let total = await db.fetch("davet.total."+member.guild.id+"."+inviter.davetçi) || 0
let fake = await db.fetch("davet.fake."+member.guild.id+"."+inviter.davetçi) || 0 
let bonus = await db.fetch("davet.bonus."+member.guild.id+"."+inviter.davetçi) || 0 


if(inviter.tür === "fake") {
db.add("davet.fake."+member.guild.id+"."+inviter.davetçi, -1)
db.add("davet.total."+member.guild.id+"."+inviter.davetçi, -1)
} 
if(inviter.tür === "güvenli")  db.add("davet.total."+member.guild.id+"."+inviter.davetçi, -1)

member.guild.channels.cache.get(log).send(new Discord.MessageEmbed()
.setColor("RED")
.setDescription(ayarlar.red2+ " <@"+member.user.id+"> kişisi sunucumuzdan **ayrıldı.** <@"+inviter.davetçi+"> kişisinin daveti ile katılmıştı. <@"+inviter.davetçi+"> kişisinin daveti **"+(total-1)+"** olarak güncellendi. `"+fake+" fake | "+bonus+" bonus`")
);

});


client.on('message', async(message) => {
if(!message.mentions) return;
if(!message.guild) return
if(message.author.bot) return

const data = await db.get('etiket-sınır.'+message.guild.id)
if(!data) return
if(message.member.hasPermission('ADMINISTRATOR')) return;
let etiket = message.mentions.users || message.mentions.roles;
if(((message.mentions.users.size + message.mentions.roles.size)) >= data) {
if(message.deletable) message.delete();
message.channel.send(new Discord.MessageEmbed()
.setColor('RED')
.setDescription(ayarlar.red + ' Etiket sınırını aştın. Mesajın toplamda **'+(message.mentions.users.size + message.mentions.roles.size)+'** etiket içerdiği için mesaj engellendi.')
.setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true}))
.setTimestamp()
.setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true}))
).then(c => c.delete({ timeout: 5000}));
} else return;
})


client.on('message', async(message) => {
if(!message.guild) return;
if(!db.get('reklamengel.'+message.guild.id)) return;
let reklamcı = 'discord.gg/'
let uzunluk = 11;
const arrayContentMessage = await message.content.split(' ')
if(!arrayContentMessage.some(ahmetj => ahmetj.includes(reklamcı))) return;
if(arrayContentMessage.some(ahmetj => ahmetj.includes(reklamcı))) {
if(!arrayContentMessage.some(ahmetj => ahmetj.startsWith(reklamcı))) {
if(!arrayContentMessage.some(ahmetj => ahmetj.startsWith('https://'+reklamcı))) {
if(!arrayContentMessage.some(ahmetj => ahmetj.startsWith('http://'+reklamcı))) return
else uzunluk = 18;
} else uzunluk = 19;
}
};

let adsIndex = await arrayContentMessage.find(c => c.includes(reklamcı))
const inviteCode = await adsIndex.slice(uzunluk);
if(inviteCode.length < 1) return;
  
const guildHaveInvite = await message.guild.fetchInvites().then(ahmetjss => ahmetjss.array().find(c => c.code === inviteCode));
if(guildHaveInvite) return;
if(message.member.hasPermission('ADMINISTRATOR')) return;

await message.delete().catch((err) => fonksiyonlar.hata('Mesajı silemedim. Hata: '+err, message))
return fonksiyonlar.sendEmbed('Reklam girişimi **engellendi**.', {
channel: message.channel,
color: 'RED',
footer: [message.author.tag, message.author.displayAvatarURL({ dynamic: true})],
timestamp: true,
thenDelete: 5000
})
})

client.on('ready', async() => {


if(!db.get('mute.')) return;

Object.keys(db.has('mute.') ? db.get('mute') : []).forEach(guildID => {
if(!client.guilds.cache.get(guildID).member(client.user.id).hasPermission('MANAGE_ROLES')) return;
  
Object.keys(db.has('mute.'+guildID) ? db.get('mute.'+guildID) : []).forEach(userID => {

setTimeout(async() => {

const guild = await client.guilds.cache.get(guildID)
const rol = await db.get('mute.'+guild.id+'.rol')
const member = await guild.members.cache.get(userID)
if(!member) return;
member.roles.remove(rol)
await db.delete('mute.'+guildID+'.'+userID)

}, (db.get('mute.'+guildID+'.'+userID+'.zaman')+(db.get('mute.'+guildID+'.'+userID+'.hedefzaman')))  -  Date.now() )

})

})



});


client.on('guildCreate', async(guild) => {
return fonksiyonlar.sendEmbed(`

• **${guild.name}** sunucusuna eklendim.

» Artık **${client.users.cache.size}** kullanıcı, **${client.guilds.cache.size}** sunucuyum.

- | Sunucu sahibi → **${(client.users.cache.get(guild.ownerID) ? client.users.cache.get(guild.ownerID).tag : 'Anonim#0000')}** [**${guild.ownerID}**]
- | Sunucu üye sayısı → **${guild.members.cache.size}**
- | Sunucu ID → **${guild.id}**
- | Tarih → **${moment().add(3, 'hour').format('DD/MM/YYYY HH:mm:ss')}**
`, {
channel: client.channels.cache.get(ayarlar.log),
color: 'GREEN',
timestamp: true,
author: [(client.users.cache.get(guild.ownerID) ? client.users.cache.get(guild.ownerID).tag : 'Anonim#0000'), (client.users.cache.get(guild.ownerID) ? client.users.cache.get(guild.ownerID).displayAvatarURL({ dynamic: true}) : 'https://upload.wikimedia.org/wikipedia/commons/9/97/Anonim.png')],
footer: [client.user.username, client.user.displayAvatarURL({ dynamic: true})]
})
})


client.on('guildDelete', async(guild) => {
return fonksiyonlar.sendEmbed(`

• **${guild.name}** sunucusundan atıldım.

» Artık **${client.users.cache.size}** kullanıcı, **${client.guilds.cache.size}** sunucuyum.

- | Sunucu sahibi → **${(client.users.cache.get(guild.ownerID) ? client.users.cache.get(guild.ownerID).tag : 'Anonim#0000')}** [**${guild.ownerID}**]
- | Sunucu üye sayısı → **${guild.members.cache.size}**
- | Sunucu ID → **${guild.id}**
- | Tarih → **${moment().add(3, 'hour').format('DD/MM/YYYY HH:mm:ss')}**
`, {
channel: client.channels.cache.get(ayarlar.log),
color: 'RED',
timestamp: true,
author: [(client.users.cache.get(guild.ownerID) ? client.users.cache.get(guild.ownerID).tag : 'Anonim#0000'), (client.users.cache.get(guild.ownerID) ? client.users.cache.get(guild.ownerID).displayAvatarURL({ dynamic: true}) : 'https://upload.wikimedia.org/wikipedia/commons/9/97/Anonim.png')],
footer: [client.user.username, client.user.displayAvatarURL({ dynamic: true})]
})
})


client.on('messageReactionAdd', async(reaction, user) => {
  if(reaction.emoji.id !== ayarlar.mutualID) return;
  if(user.bot) return;
  let data = await db.get('cekilis.'+reaction.message.id);
  if(!data) return

  let sartlar = [];
  if(data.sartlar.sunucu !== 'Geçildi.') {
    let guild = await client.guilds.cache.get(data.sartlar.sunucu.guildID);
    if(!guild.members.cache.get(user.id)) {
 sartlar.push('**'+guild.name + '** sunucusuna katıl.')
    }
  }
  if(data.sartlar.rol !== 'Geçildi.') {
    let rol = await reaction.message.guild.roles.cache.get(data.sartlar.rol);
    
    if(!rol.members.has(user.id)) sartlar.push('**'+rol.name+'** rolüne sahip ol.')
  }
  if(data.sartlar.davet !== 'Geçildi') {
    let davetMiktar = await data.sartlar.davet;
    let toplamDavet = await db.get("davet.total."+reaction.message.guild.id+"."+user.id) || 0
    
    
    if(davetMiktar > toplamDavet) sartlar.push('**'+(davetMiktar - toplamDavet)+'** davet yapman gerekli.')
    
  }
 if(sartlar.length > 0) { 
   reaction.users.remove(user.id)
  return user.send(
      new Discord.MessageEmbed()
      .setColor('RED')
      .setDescription(`

       • Bu [çekilişe](${reaction.message.url}) katılabilmen için gerekli şartları karşılamıyorsun.

       __**ŞARTLAR**__
       ${sartlar.map(sart => '- '+sart).join('\n')}
      `)
      .setTitle('❌ Katılım reddedildi!')
)
 } else {
 return user.send(
      new Discord.MessageEmbed()
      .setColor('GREEN')
      .setDescription(`

       • Bu [çekilişe](${reaction.message.url}) katıldın!
       
       
      `)
)  
 }
  
})
/* SİSTEMLER */

