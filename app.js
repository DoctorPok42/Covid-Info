const Discord = require("discord.js"),
  fs = require("fs"),
  path = require('path'),
  cron = require("node-cron"),
  Downloader = require("nodejs-file-downloader"),
  moment = require('moment');

const client = new Discord.Client();
client.config = require("./config");

client.login(client.config.TOKEN);

client.on("ready", () => {
  console.log("Le bot est lancé !");
  client.user.setPresence({
    activity: { name: client.config.ACTIVITY, type: "WATCHING" },
    status: "idle",
  });
});

// Création du dossier downloads si il n'existe pas
if (!fs.existsSync(path.join(__dirname, './downloads/'))) {
  fs.promises.mkdir('./downloads/', { recursive: true }).catch(console.error);
  console.log("Fichier downloads crée !")
}

cron.schedule("00 */1 * * *", async () => {

  // définition de la date actuelle
  const datetime = new Date();
  var datefinal =
  datetime.getDate() +
  "-" +
  (datetime.getMonth() + 1) +
  "-" +
  datetime.getFullYear() +
  "-" +
  datetime.getHours() +
  "H" +
  (datetime.getMinutes() + 1);
  // Ce bout de code ci dessous peut être ajouter au reste pour avoir les minutes et secondes en plus
  //  + datetime.getMinutes() + ":" + datetime.getSeconds()


  const downloader = new Downloader({
    url:
      "https://disease.sh/v3/covid-19/countries/France?yesterday=true&twoDaysAgo=true&strict=true", //url du fichier, pour le personaliser -> https://disease.sh/docs/#/
    directory: "./downloads/", // dossier de stockage
    fileName: `${datefinal}.json`, // nom du fichier (la date actuelle)
  });
  try {
    await downloader.download();
    console.log("Fichier Télécharger !\n" + datefinal);
  } catch (error) {
    console.log("Téléchargement échoué\n" + datefinal, error);
  }

  // Envoie du fichier sur un channel Discord [OPTIONAL]
  const dos = require(`./downloads/${datefinal}.json`);
  const ch = message.guilds

  const embed = new Discord.MessageEmbed()
    .setAuthor(`${client.user.username}`, client.user.avatarURL())
    .setColor("#39A275")
    .setThumbnail(dos.countryInfo.flag)
    .setTitle(`Les news du covid en ${dos.country} aujourd'hui !`)
    .addField("Cas", dos.todayCases, true)
    .addField("Morts", dos.todayDeaths, true)
    .addField("Active", dos.active, true)
    .addField("Soigné", dos.todayRecovered, true)
    .addField("Réanimation", dos.critical, true)
    .addField("Tests", dos.tests, true)
    .addField("Population", dos.population, true)
    .addField("Update", moment(dos.updated).fromNow())
    .setTimestamp();

  client.channels.cache.get("CHANNEL ID").send(embed);
});
