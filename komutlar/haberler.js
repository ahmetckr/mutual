
/* MODÜLLER */
const Discord = require('discord.js')
const Parser = require('rss-parser')
const parser = new Parser()
/* MODÜLLER */

exports.run = async(client, message, args) => {
const haberJSON = await parser.parseURL('https://www.cnnturk.com/feed/rss/all/news');
const haber = await haberJSON.items;
  
if(args[0] === 'teknoloji') {
const haberJSONTeknoloji = await parser.parseURL('https://www.webtekno.com/rss.xml');
const haber = await haberJSONTeknoloji.items;
const haberg = haber[Math.floor(Math.random() * haber.length)]
return await message.channel.send(new Discord.MessageEmbed() .setColor('RANDOM') .setDescription(haberg.contentSnippet) .setTitle(haberg.title) .setURL(haberg.link))
}
if(args[0] === 'son-3') {
const embed =  new Discord.MessageEmbed()
.setTitle('Son 3 haber')
.setColor('RED');
const gösterilecekhaber = haber.slice(0, 3).map(c => {
embed.addField(c.title, c.contentSnippet, true);
});


await message.channel.send(embed)
} else {
const gösterilecekhaber = haber[Math.floor(Math.random() * haber.length)]
await message.channel.send(new Discord.MessageEmbed() .setColor('RANDOM') .setDescription(gösterilecekhaber.contentSnippet) .setTitle(gösterilecekhaber.title) .setURL(gösterilecekhaber.link))
}
};

exports.help = {
 name: 'haberler',
 description: 'Son güncel haberi gösterir.',
 aliases: ['haber'],
 bölüm: 'kullanıcı',
 timeout: 5
};
