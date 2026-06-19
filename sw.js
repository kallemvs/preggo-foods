const CACHE = "voinko-syoda-v3";
const SHELL = ["./", "./index.html", "./manifest.webmanifest"];

// Asenna: ota uusi SW heti käyttöön ja esitallenna app shell
self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).catch(() => {}));
});

// Aktivoituessa: poista vanhat cachet ja ota nykyiset sivut hallintaan
self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;

  const accept = req.headers.get("accept") || "";
  const isHTML = req.mode === "navigate" || accept.includes("text/html");

  // HTML: verkko edellä -> uusi index.html näkyy heti seuraavalla latauksella.
  // Jos verkko ei vastaa (offline), tarjoillaan tallennettu versio.
  if (isHTML) {
    e.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put("./index.html", copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match("./index.html").then(r => r || caches.match("./")))
    );
    return;
  }

  // Muut tiedostot (ikonit, manifest yms.): cache edellä, päivitys taustalla.
  e.respondWith(
    caches.match(req).then(cached => {
      const net = fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => cached);
      return cached || net;
    })
  );
});
