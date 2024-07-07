console.log('Service Worker script loaded.');

const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

const PRECACHE_URLS = [
  '/index.html',
  '/nested/moments.html',
  '/node_modules/jquery/dist/jquery.min.js',
  '/src/assets/style.css',
  '/src/Nav.js',
  '/src/script.js',
  '/lib/img/01.06.-04.06.22/01.06._AtomUhr.jpg',
  '/lib/img/01.06.-04.06.22/01.06._Zimmerkarte.jpg',
  '/lib/img/01.06.-04.06.22/01.06._BesterAsiate.jpeg',
  '/lib/img/01.06.-04.06.22/01.06._PartyBoot.jpg',
  '/lib/img/01.06.-04.06.22/01.06._Schloss.jpg',
  '/lib/img/01.06.-04.06.22/01.06._KoelnMerch.jpg',
  '/lib/img/01.06.-04.06.22/01.06._Minigolf.jpg',
  '/lib/img/01.06.-04.06.22/01.06._Wir.jpg',
  '/lib/img/01.06.-04.06.22/01.06._Heimreise.jpg',
  '/lib/img/01.06.-04.06.22/01.06._Tattoo.jpg',
  '/lib/img/01.07.22/01.07.22_3_SidoBecher.jpg',
  '/lib/img/01.07.22/01.07.22_VideoSido.mp4',
  '/lib/img/01.07.22/01.07.22_Wir.jpg',
  '/lib/img/02.12.23/02.12.23_SingenTassen.jpg',
  '/lib/img/02.12.23/02.12.23_Wir.jpg',
  '/lib/img/05.11.22/05.11.22_CoolesMonster.jpg',
  '/lib/img/05.11.22/05.11.22_JasminMitDickemPinguin.jpg',
  '/lib/img/05.11.22/05.11.22_NetteMonsterGruppe.jpg',
  '/lib/img/05.11.22/05.11.22_PhilippUndSpongebob.jpg',
  '/lib/img/06.08.22/06.08.22_Fahrt_zum_CSD.jpeg',
  '/lib/img/06.08.22/06.08.22_Jasmin_Traumfrau_CSD.jpg',
  '/lib/img/06.08.22/06.08.22_WirCSD.jpg',
  '/lib/img/07.05.22/07.05._ErstesMalStadion.jpeg',
  '/lib/img/07.05.22/07.05._StadionJubel.mp4',
  '/lib/img/07.05.22/07.05._StadionPlatzsturm.mp4',
  '/lib/img/08.08.21/08.08._Esel.jpg',
  '/lib/img/08.08.21/08.08._TierparkSchild.jpg',
  '/lib/img/08.08.21/08.08._Wir.jpg',
  '/lib/img/08.08.22/08.08.2022_DeinGeschenkanmich.jpeg',
  '/lib/img/08.08.22/08.08.2022_GeilesEssen.jpg',
  '/lib/img/08.08.23/08.08.23_DieBeidenRinge.jpg',
  '/lib/img/08.08.23/08.08.23_JasminEsel.jpg',
  '/lib/img/08.08.23/08.08.23_JasminJunaHandPfote.jpg',
  '/lib/img/08.08.23/08.08.23_SuperMarioFilm.jpg',
  '/lib/img/08.08.23/08.08.23_Traumambiente.jpg',
  '/lib/img/08.08.23/08.08.23_TraumambienteMitJuna.jpg',
  '/lib/img/08.08.23/08.08.23_WhatsappBuch.jpg',
  '/lib/img/09.12.23/09.12.23_SchoeneBaeumeBurg.jpg',
  '/lib/img/09.12.23/09.12.23_TolleStolbergerStadt.jpg',
  '/lib/img/09.12.23/09.12.23_Wir.jpg',
  '/lib/img/11.06.22/11.06._BusPhantasialand.jpg',
  '/lib/img/11.06.22/11.06._SlushEis.jpg',
  '/lib/img/11.06.22/11.06._WirChiapas.jpg',
  '/lib/img/12.02.24/12.02.24_JasminFaengt.jpg',
  '/lib/img/12.02.24/12.02.24_Karnevalszug.jpg',
  '/lib/img/12.02.24/12.02.24_WasTutJunaDa.jpg',
  '/lib/img/12.02.24/12.02.24_Wir.jpg',
  '/lib/img/14.08.21/14.08._Blumen.jpeg',
  '/lib/img/14.08.21/14.08._Essen.jpg',
  '/lib/img/14.10.21/14.10._KatzisBaum.jpeg',
  '/lib/img/14.10.21/14.10._KatzisBoden.jpeg',
  '/lib/img/15.06.24/15.06.24_Drinks.jpg',
  '/lib/img/15.06.24/15.06.24_WirPfarrfest.jpg',
  '/lib/img/15.06.24/15.06.24_WirBalkon.jpg',
  '/lib/img/16.05.22/16.05._NikBack.jpg',
  '/lib/img/16.05.22/16.05._NikCaddy.jpeg',
  '/lib/img/25.02.23/25.02.23_JunaNikJasmin.jpg',
  '/lib/img/25.02.23/25.02.23_JunaUndNik1.jpg',
  '/lib/img/25.02.23/25.02.23_JunaUndNik2.jpg',
  '/lib/img/25.02.23/25.02.23_BestätigungBesitzJuna.jpeg',
  '/lib/img/25.02.23/25.02.23_BusverbindungzuHurensohn.jpg',
  '/lib/img/25.03.23/25.03.23_DanielPhilippTransporter.jpg',
  '/lib/img/25.03.23/25.03.23_HomePicture.jpg',
  '/lib/img/25.03.23/25.03.23_NikSallyErkunden.jpg',
  '/lib/img/25.03.23/25.03.23_NikSallyUnterBett.jpg',
  '/lib/img/26.08.23/26.08.23_CutestesPaarEver.jpeg',
  '/lib/img/26.08.23/26.08.23_JasminPhilippRing.jpeg',
  '/lib/img/26.08.23/26.08.23_KuchenFastKostenlos.jpeg',
  '/lib/img/28.08.21/28.08._Umzugswagen.jpeg',
  '/lib/img/28.08.21/28.08._Alte_Wohnung.jpeg',
  '/lib/img/30.07.21/30.07._Chat.jpg',
  '/lib/img/favicon.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(PRECACHE)
            .then(cache => {
                return Promise.all(
                    PRECACHE_URLS.map(url => {
                        return cache.add(url).catch(err => {
                            console.error('Failed to cache', url, err);
                        });
                    })
                );
            })
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [PRECACHE];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
            caches.match(event.request).then(response => {
                return response || fetch(event.request).then(fetchResponse => {
                    return caches.open(RUNTIME).then(cache => {
                        cache.put(event.request, fetchResponse.clone());
                        return fetchResponse;
                    });
                });
            }).catch(() => {
                return caches.match('/index.html');
            })
        );
    }
});