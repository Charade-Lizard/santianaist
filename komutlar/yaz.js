const Discord = require('discord.js');

exports.run = (client, message, args) => {
  if (message.author.id !== "725260677836439583") return;
  let mesaj = args.slice(0).join(' ');
if (mesaj.length < 1) return message.reply('Yazmam için herhangi bir şey yazmalısın.');
  message.delete();
  message.channel.send(mesaj);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yaz', 'botyaz', 'bot-yaz', 'bota-yazdır'],
  permLevel: 4
};

exports.help = {
  name: 'yaz',
  description: '{Yönetici komutu}',
  usage: 'yaz {Yazdıracağınız mesaj}'
};