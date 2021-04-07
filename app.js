const Discord = require("discord.js"),
  fs = require("fs"),
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

//L'action ci dessous s'exécutera tous les jours à midi (12h00)
cron.schedule("* 12 * * *", async () => {
  const downloader = new Downloader({
    url:
      "https://disease.sh/v3/covid-19/countries/France?yesterday=true&twoDaysAgo=true&strict=true&allowNull=true", //url du fichier, pour le personaliser -> https://disease.sh/docs/#/
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
  const buffer = fs.readFileSync(`./downloads/${datefinal}.json`);
  const attachment = new Discord.MessageAttachment(buffer, `${datefinal}.json`);
  client.channels.cache.get("CHANNELID").send(attachment);
});
