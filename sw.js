
'use strict';
/* global caches, Request, fetch, require, console, importScripts, Response */
var staticCacheName = 'pta-static-v5';
var allCaches = [
  staticCacheName
];

var urlsToPrefetch = [
  '/',
  '/sw.js',
  '/css/styles.css',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/index.html',
  '/restaurant.html',
  'https://maps.gstatic.com/mapfiles/transparent.png',
  'https://csi.gstatic.com/csi?v=2&s=mapsapi3&v3v=30.5&action=map2&firstmap=true&hdpi=true&mob=false&staticmap=false&size=592x1117&hadviewport=true&libraries=places&e=10_1_0,10_2_0&rt=visreq.193',
  'https://csi.gstatic.com/csi?v=2&s=mapsapi3&v3v=30.5&action=apiboot2&libraries=places&e=10_1_0,10_2_0&rt=main.8',
  'https://csi.gstatic.com/csi?v=2&s=mapsapi3&v3v=30.5&action=apiboot2&libraries=places&e=10_1_0,10_2_0&rt=firstmap.85',
  'https://csi.gstatic.com/csi?v=2&s=mapsapi3&v3v=30.5&action=map2&firstmap=true&hdpi=true&mob=false&staticmap=false&size=592x1117&hadviewport=true&libraries=places&e=10_1_0,10_2_0&rt=visreq.120'
  // 'https://maps.googleapis.com/maps/api/js'
];

self.addEventListener('install', function(event) {
  console.log('install event');
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToPrefetch).then(function() {
        console.log('All resources have been fetched and cached.');
      });
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('pta-') &&
                 !allCaches.includes(cacheName);
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request).then((response) => {
        var resp = response.clone()
		    var req = event.request.clone();
        caches.open(staticCacheName).then(function(cache) {
          cache.put(req, resp);
        });
        return response;
      });
    })
  );
});
