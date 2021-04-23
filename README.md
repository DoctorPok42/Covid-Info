# Covid-Info

Cette petite application en js est faite pour recueillir automatiquement et de manière régulière les informations sur le covid en France. Pour ensuite les sauvegardé dans un fichier `json`

# Lancer l'application
Pour faire fonctionner cette application, téléchargé-la entièrement !

Puis à l'aide d'un terminal éxecuter le fichier apps.

La tache cron (récupérer des infos sur le covid) s'éxécutera en boucle tous les jours à 14h30.

Si vous voules modifier le temps entre chaque tache je vous invite à modifier la ligne 34 et pour plus d'information je vous renvoie sur la page du module utilisé https://www.npmjs.com/package/node-cron

<hr/>

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

Toutes ces informations sont récupérées dans un fichier en `.json` qui est nomé par la `date de l'exécution` et stocké dans le dossier `downloads`

Si vous souhaitez modifier le pays de sélection ou avoir des données globales du covid je vous invite à modifier la ligne `46` par un nouveau lien que vous pouvez générer à cette url : <a href="https://disease.sh/docs/">Générer un autre lien</a>


Les différents modules utilisés pour ce projet sont :
 - fs
 - path
 - node-cron
 - nodejs-file-downloader
