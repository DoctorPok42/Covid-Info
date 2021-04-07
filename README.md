# Covid-Info
<br/>
Cette petite application en js est faite pour recueillir des informations sur le covid en France, tel que :
<br/>

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
