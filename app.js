const Discord = require("discord.js"),
  cron = require("node-cron"),
  Downloader = require("nodejs-file-downloader");

const client = new Discord.Client();
client.config = require("./config");

client.login(client.config.TOKEN);

client.on("ready", () => {
  console.log("Le bot est lancé !");
  client.user.setPresence({
    activity: { name: "Les infos sur le covid", type: "WATCHING" },
    status: "idle",
  });
});

// définition de la date actuelle
const datetime = new Date();
let datefinal =
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

cron.schedule("00 */1 * * *", async () => {
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
    .setTimestamp();

  client.channels.cache.get("828995325922377779").send(embed);
});
