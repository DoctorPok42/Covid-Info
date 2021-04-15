# Covid-Info

Cette petite application en js est faite pour recueillir automatiquement et de manière régulière les informations sur le covid en France. Pour ensuite les sauvegardé dans un fichier `json`

# Lancer l'application
Pour faire fonctionner cette application, téléchargé-la entièrement !

Vous avez maintenant **2 possibilités** pour l'ancer l'application :
 - La méthode `Landa`, qui consiste à utiliser les 2 fichiers `start.bat` et `stop.bat` pour lancer ou arréter l'appli en double cliquant dessus.
 - La méthode `Développeur`, qui consite à éxécuter directement le fichier app.js avec votre terminal.

<hr/>

La **tache cron** (récupérer des infos sur le covid) s'éxécutera en boucle toutes les heures.

Si vous voules modifier le temps entre chaque tache je vous invite à modifier la ligne `27` et pour plus d'information je vous renvoie sur la page du module utilisé https://www.npmjs.com/package/node-cron

<hr>

Voici toutes les informations que vous pouvez collecter :

 ```{
{
  "updated": number,
  "country": string,
  "countryInfo": {
    "_id": number,
    "iso2": string,
    "iso3": string,
    "lat": number,
    "long": number,
    "flag": string
  },
  "cases": number,
  "todayCases": number,
  "deaths": number,
  "todayDeaths": number,
  "recovered": number,
  "todayRecovered": number,
  "active": number,
  "critical": number,
  "casesPerOneMillion": number,
  "deathsPerOneMillion": number,
  "tests": number,
  "testsPerOneMillion": number,
  "population": number,
  "continent": string,
  "oneCasePerPeople": number,
  "oneDeathPerPeople": number,
  "oneTestPerPeople": number,
  "activePerOneMillion": number,
  "recoveredPerOneMillion": number,
  "criticalPerOneMillion": number
}
```

Toutes ces informations sont récupérées dans un fichier en `.json` qui est nomé par la `date de l'exécution` et stocker dans le dossier `downloads`

Si vous souhaiter modifier le pays de sélection ou avoir des données globales du covid je vous invite à modifier la ligne `46` par un nouveau lien que vous pouvez générer à cette url : <a href="https://disease.sh/docs/">Générer un autre lien</a>

<hr>

# Fonctionalité Discord
Cette application peut aussi vous envoyer le fichier.json sur un channel discord !

Pour ce faire il vous suffit de crée une application discord sur le <a href="https://discord.com/developers/applications">Pannel Développeur</a>, puis ensuite de copier le TOKEN du bot et le mettre dans le fichier `config.js` à la ligne `2`<br/>
Vous pouvez aussi changer la courte phrase de la ligne `3` pour mettre quelque chose de plus personnel.

Enfin vous aurez besoin dans le fichier principale (app.js) de mettre l'id du channel discord, à la ligne `59`, sur lequel vous voulez envoyer le message.

Petite présition les messages commenceront à être envoyés dans le channel à partir de la prochaine exécution du programme par le module cron .


## ⚠️ ATTENTION ⚠️
Si vous n'utiliser pas cette fonctionalitée vous pouver suprimmer les lignes `8 à 19` et `57 à 76`

Sinon vous riquez d'avoir des erreurs.
<hr>

Les différents modules utilisé pour ce projet sont :
 - discord.js
 - fs
 - path
 - node-cron
 - nodejs-file-downloader
 - moment
