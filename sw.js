const TILE='ync-tiles-v1',APP='ync-app-v1';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(u.hostname==='cyberjapandata.gsi.go.jp'){
    e.respondWith(caches.open(TILE).then(c=>c.match(e.request).then(r=>r||fetch(e.request).then(n=>{if(n.ok)c.put(e.request,n.clone());return n}))));
    return;
  }
  if(u.origin===location.origin){
    e.respondWith(fetch(e.request,{cache:'no-store'}).then(n=>{const cp=n.clone();caches.open(APP).then(c=>c.put(e.request,cp));return n}).catch(()=>caches.match(e.request)));
  }
});
