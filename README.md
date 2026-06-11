# EV Bespaarcheck

EV Bespaarcheck is een moderne, responsive Nederlandse calculator-website waarmee bezoekers snel inzicht krijgen in de energiekosten van elektrisch rijden.

De website berekent live:

- laadkosten per maand, per jaar en per 100 km;
- benzinekosten per jaar;
- besparing ten opzichte van benzine;
- jaarlijks stroomverbruik inclusief laadverlies;
- een schatting van het aantal laadbeurten per jaar;
- hoeveel kilometer de auto op de jaarlijkse opbrengst van zonnepanelen kan rijden;
- het totale geïnstalleerde vermogen van de zonnepanelen.

Bezoekers kunnen een elektrische auto uit de ingebouwde lokale autodatabase kiezen. Merk,
model en uitvoering worden stap voor stap geselecteerd, waarna verbruik en accucapaciteit
automatisch worden ingevuld. Deze waarden blijven handmatig aanpasbaar.

De database bevat meer dan 140 uitvoeringen, waaronder populaire Nederlandse EV's van
Tesla, Kia, Volkswagen, Volvo, Renault, Skoda, Ford, Cupra, BYD, XPeng en Leapmotor.

Staat een auto niet in de lijst, dan kan de bezoeker de autonaam, het model, de uitvoering,
het verbruik en de accucapaciteit zelf invoeren.

De website gebruikt alleen HTML, CSS en JavaScript. Er is geen backend, framework of externe API nodig.
De autodatabase staat als de array `evDatabase` bovenaan in `app.js` en kan daar eenvoudig
worden uitgebreid.

## Juridische en vertrouwenspagina's

De website bevat aparte pagina's voor privacy, contact, informatie over EV Bespaarcheck en
de disclaimer:

- `privacy.html`: legt uit dat berekeningen lokaal in de browser plaatsvinden en beschrijft
  het cookiebeleid;
- `contact.html`: bevat het contactadres voor vragen, opmerkingen en gemelde rekenfouten;
- `over.html`: legt uit wat EV Bespaarcheck doet;
- `disclaimer.html`: licht toe dat alle berekeningen indicatief zijn en geen financieel
  advies vormen.

Deze pagina's gebruiken dezelfde header, footer en vormgeving als de homepage.

## Nieuwe auto's toevoegen

Nieuwe auto's voeg je bovenaan in `app.js` toe aan de array `evDatabase`. Voeg voor iedere
uitvoering een nieuw object toe:

```js
{
  brand: "Merknaam",
  model: "Modelnaam",
  version: "Uitvoering",
  consumption: 16.5,
  battery: 60
}
```

- `consumption` is het verbruik in kWh per 100 km.
- `battery` is de accucapaciteit in kWh.

De merk-, model- en uitvoeringdropdowns worden daarna automatisch vanuit de database gevuld.

## Laadverdeling

De hoofdcalculator gebruikt een eenvoudige verdeling tussen thuisladen en snelladen. De
bezoeker kan een herkenbare voorkeuze gebruiken of de schuif aanpassen. Snelladen wordt
automatisch aangevuld, waardoor de laadverdeling altijd 100% is.

Alle berekeningen gebruiken onbewerkte decimalen. Afronding gebeurt uitsluitend bij de
weergave naar hele euro's. De zichtbare kosten voor thuisladen en snelladen tellen daardoor
altijd exact op tot de getoonde totale laadkosten.

De website bevat ook een aparte zonnepanelen-naar-rijbereikcalculator.

De rijbereikcalculator is bewust eenvoudig gehouden: de bezoeker vult het aantal panelen en
het vermogen per paneel in en kiest met een schuif hoeveel zonnestroom naar de auto gaat.
Het totale geïnstalleerde paneelvermogen wordt automatisch in kWp getoond. De gemiddelde
opbrengst en het autoverbruik worden als rustige aannames weergegeven.

### Standaardtarieven aanpassen

De standaardwaarden voor tarieven staan in `app.js` in het object `defaults`. Pas
`homePrice`, `fastPrice` en `fuelPrice` aan om de standaardtarieven te wijzigen. Pas
daarnaast de bijbehorende `value`-attributen in `index.html` aan wanneer de invoervelden
direct met dezelfde nieuwe waarden moeten starten.

## Lokaal openen

De eenvoudigste manier is om `index.html` rechtstreeks in een browser te openen.

Voor lokaal testen via een eenvoudige webserver kun je in deze map bijvoorbeeld uitvoeren:

```powershell
python -m http.server 8000
```

Open daarna `http://localhost:8000` in je browser.

## Op GitHub zetten

1. Maak op GitHub een nieuwe lege repository.
2. Open een terminal in de projectmap.
3. Voer de volgende opdrachten uit:

```powershell
git init
git add .
git commit -m "Eerste versie EV Bespaarcheck"
git branch -M main
git remote add origin https://github.com/JOUW-GEBRUIKERSNAAM/ev-bespaarcheck.git
git push -u origin main
```

Vervang de voorbeeld-URL door de URL van je eigen repository.

## Publiceren op Vercel

1. Log in op [Vercel](https://vercel.com).
2. Kies **Add New Project**.
3. Importeer de GitHub-repository.
4. Laat de frameworkkeuze op **Other** staan.
5. Er is geen build command nodig.
6. Klik op **Deploy**.

Vercel publiceert de statische bestanden automatisch. Elke nieuwe push naar de hoofdbranch kan daarna automatisch worden uitgerold.

Publiceer de bestanden `index.html`, `privacy.html`, `contact.html`, `over.html`,
`disclaimer.html`, `styles.css`, `app.js`, `favicon.svg`, `robots.txt`, `vercel.json`,
`.gitignore` en `README.md`. De lokale mappen `outputs` en `work` worden via `.gitignore`
niet gepubliceerd.

## Eigen domein en Google

1. Voeg na de eerste Vercel-publicatie je eigen domein toe via **Project Settings → Domains**.
2. Stel daarna in `index.html` een canonical URL en `og:url` in met je definitieve domein.
3. Voeg de website toe aan [Google Search Console](https://search.google.com/search-console).
4. Vraag in Search Console indexering van de homepage aan.
5. Gebruik Vercel Analytics of een vergelijkbare dienst voor echte bezoekersstatistieken.

## Disclaimer

Alle berekeningen, tarieven, autogegevens en besparingen op de website zijn indicatief.
Werkelijke resultaten kunnen afwijken en aan de informatie kunnen geen rechten worden
ontleend. EV Bespaarcheck verstrekt geen financieel, juridisch of energieadvies.
