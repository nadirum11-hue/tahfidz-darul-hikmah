'use strict';
const CACHE='tahfidz-pwa-shell-v2';
const SHELL=['./','./index.html','./manifest.webmanifest','./config.js','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET')return;const url=new URL(req.url);if(url.origin!==self.location.origin)return;event.respondWith(fetch(req).then(response=>{if(response&&response.ok&&req.mode==='navigate'){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put('./index.html',copy));}return response;}).catch(()=>caches.match(req).then(hit=>hit||caches.match('./index.html'))));});
