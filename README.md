# Zonlijn

Een Nederlandstalige web-app die laat zien wanneer het licht en donker wordt en hoeveel een zonnepaneleninstallatie naar verwachting produceert.

## Starten

Open `index.html` direct in een browser, of start een lokale webserver:

```powershell
python -m http.server 8000
```

Open daarna `http://localhost:8000`.

## Berekening

De app gebruikt de breedtegraad voor de daglichtlijn. De opbrengst is een indicatieve schatting op basis van het totale piekvermogen, dakrichting, schaduw en een gemiddelde Nederlandse opbrengst van 875 kWh per kWp per jaar.

De app kan als statische website worden gepubliceerd, bijvoorbeeld via Vercel.
