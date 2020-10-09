//Glitch için olan yer
const express = require("express");
const app = express();
const http = require("http");

app.get("/", (request, response) => {
  console.log(
    ` az önce pinglenmedi. Sonra ponglanmadı... ya da başka bir şeyler olmadı.`
  );
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

//Sabitler
const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const db = require("quick.db");
require("./util/eventLoader")(client);



var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);


client.on('message', msj =>{
if (msj.content === "xd") {
  msj.channel.send('asd')
}
});

 client.on('ready', () => {
  setInterval(() => {
    let guild = client.guilds.get("763799719365050378")
    let voiceChannels = guild.channels.filter(c => c.type === 'voice')
    let count = 0
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size
    let kız = guild.roles.find(x => x.name === `Petticoat`)
    let erkek = guild.roles.find(x => x.name === `Masculine`)
    let kayıtsız = guild.roles.find(x => x.name === `Lost Is Santiana`)
    let taglı = guild.roles.find(x => x.name === `Shiura Of Santiana`)
    let booster = guild.roles.find(x => x.name === `⚚ Santiana Rich`)
    let yetkili = guild.roles.find(x => x.name === `Nerfisia`)
    let muted = guild.roles.find(x => x.name === `Muted`)
    let jail = guild.roles.find(x => x.name === `Cezalı`)
    let yenihesap = guild.roles.find(x => x.name === `Şüpheli Hesap`)
    let say = new Discord.RichEmbed()
    .setColor(`AQUA`)
    .setThumbnail(guild.iconURL)
 .setImage(`https://giphy.com/gifs/netflix-henry-cavill-the-witcher-geralt-of-rivia-dViEHfMyu53fTx6qVf`)
    .setDescription(`
    <a:s_:764039076101488660> **Santiana :** \`${guild.members.size}\`
    <a:a_:764039075631333378> **Aktif :** \`${guild.members.filter(member => member.presence.status !== 'offline').size}\`
    <a:n_:764039075849961484> **Ses Aktifliği :** \`${count}\`

    <a:t_:764039076609261568> **Boosters :** \`${booster.members.size}\`

    <a:i_:764039076109221909> **Shiura :** \`${taglı.members.size}\`
    <a:a_:764039075631333378> **Petticoat :** \`${kız.members.size}\`
    <a:n_:764039075849961484> **Masculine :** \`${erkek.members.size}\`

    <a:a_:764039075631333378> **Lost Is Santiana :** \`${kayıtsız.members.size}\`

    <a:santiana_staff:764044342104424449> **Toplam Yetkili :** \`${yetkili.members.size}\`


    <a:santiana_cezali_supheli:764044285837967374> **Muted :** \`${muted.members.size}\`
    <a:santiana_cezali_supheli:764044285837967374> **Cezalı :** \`${jail.members.size}\`
    <a:santiana_cezali_supheli:764044285837967374> **Şüpheli Hesap :** \`${yenihesap.members.size}\`

    **                          **\`ThêÂys ❤️ Prensees\``)

    client.channels.get(`763829695074533416`).fetchMessage(`764197708050989088`).then(msg => (msg.edit(say)))
  }, 60000)
});
