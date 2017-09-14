'use strict';
/* global require, window, navigator */

window.addEventListener('load', function () {
    console.log('IndexController')
    if (!navigator.serviceWorker) {
        return;
    }

    navigator
        .serviceWorker
        .register('/sw.js')
        .then(function (reg) {
            if (!navigator.serviceWorker.controller) {
                return;
            }

            if (reg.waiting) {
                console.log('updated service worker is waiting');
                return;
            }

            if (reg.installing) {
                console.log('updated service worker is installing');
                return;
            }

            reg
                .addEventListener('updatefound', function () {
                    console.log('updated service worker found');
                });
        })
        .catch(function () {
            console.log('registration failed');
        });

    // Ensure refresh is only called once. This works around a bug in "force update
    // on reload".
    var refreshing;
    navigator
        .serviceWorker
        .addEventListener('controllerchange', function () {
            if (refreshing) {
                return;
            }
            window
                .location
                .reload();
            refreshing = true;
        });
});