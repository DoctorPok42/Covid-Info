 const fs = require("fs"),
  path = require('path'),
  cron = require("node-cron"),
  Downloader = require("nodejs-file-downloader"),

// Création du dossier downloads si il n'existe pas
if (!fs.existsSync(path.join(__dirname, './downloads/'))) {
  fs.promises.mkdir('./downloads/', { recursive: true }).catch(console.error);
  console.log("Fichier downloads crée !")
}

cron.schedule("30 14 * * *", async () => {

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
  // Ce bout de code ci dessous peut être ajouter au reste pour avoir les secondes en plus sur le nom du fichier et le reste
  //  + ":" + datetime.getSeconds()

  const downloader = new Downloader({
    url:
      "https://disease.sh/v3/covid-19/countries/France?yesterday=true&twoDaysAgo=true&strict=true",// url du fichier, pour le personaliser -> https://disease.sh/docs/#/
    directory: "./downloads/", // dossier de stockage
    fileName: `${datefinal}.json`, // nom du fichier (la date actuelle)
  });
  try {
    await downloader.download();
    console.log("Fichier Télécharger !\n" + datefinal);
  } catch (error) {
    console.log("Téléchargement échoué\n" + datefinal, error);
  }
});
