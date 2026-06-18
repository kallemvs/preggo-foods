# Voinko syödä? – Raskausajan ruoka-apuri

Yhden sivun selainsovellus (PWA), jolla voi tarkistaa, voiko ruokaa syödä raskausaikana.
Data perustuu Ruokaviraston ohjeeseen *Elintarvikkeiden turvallisen käytön ohjeet* (maaliskuu 2025)
ja kattaa vain raskausaikaa koskevat rajoitukset.

## Tiedostot

- `index.html` – koko sovellus (HTML + CSS + JS + data upotettuna, ei ulkoisia riippuvuuksia)
- `manifest.webmanifest` – PWA-asetukset (nimi, ikonit, värit)
- `sw.js` – service worker, mahdollistaa offline-käytön
- `icon-192.png`, `icon-512.png`, `icon-180.png` – sovelluksen ikonit

## Vie GitHub Pagesiin

1. Luo GitHubiin uusi repo (esim. `voinko-syoda`).
2. Lisää kaikki yllä olevat tiedostot repon **juureen** (samalle tasolle, ei alikansioon).
3. Repon **Settings → Pages**: valitse *Source: Deploy from a branch*, branch `main` ja kansio `/ (root)`. Tallenna.
4. Hetken päästä sivu on osoitteessa `https://<käyttäjänimi>.github.io/voinko-syoda/`.

Service worker ja "lisää kotinäyttöön" vaativat HTTPS:n — github.io tarjoaa sen automaattisesti.

## Asennus puhelimeen

- **Android / Chrome:** sivulla näkyy "Asenna kotinäyttöön" -painike, tai selaimen valikosta *Lisää aloitusnäyttöön*.
- **iPhone / Safari:** jakopainike → *Lisää Koti-valikkoon*.

Asennettuna se avautuu omana ikkunanaan ilman selainpalkkeja ja toimii ilman verkkoyhteyttä.

## Päivittäminen

Data on taulukkona tiedoston `index.html` alussa (`const DATA = [...]`). Lisää tai muokkaa rivejä siellä.
Jos haluat että vanha versio ei jää välimuistiin asennetuilla laitteilla, nosta `sw.js`:n
`CACHE`-version numeroa (esim. `voinko-syoda-v1` → `voinko-syoda-v2`).

## Huomio

Apuri ei korvaa neuvolan tai lääkärin neuvoa. Sisältö on tiivistetty Ruokaviraston ohjeesta;
epäselvissä tilanteissa virallinen lähde on ruokavirasto.fi.
