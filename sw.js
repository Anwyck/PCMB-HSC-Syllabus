// Bump the version number whenever you upload a new html file
const CACHE="pcmb-v2";
const FILES=["./","index.html","manifest.json","icon-192.png","icon-512.png","icon-maskable-512.png","ebi.html","ebi-manifest.json","ebi-icon-192.png","ebi-icon-512.png","ebi-icon-maskable-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.allSettled(FILES.map(f=>c.add(f)))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
// Serve from cache first (works offline), refresh the cache in the background
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>{const net=fetch(e.request).then(r=>{if(r&&r.ok){const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp))}return r}).catch(()=>hit);return hit||net}))});
