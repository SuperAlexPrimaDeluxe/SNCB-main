const version = '1.05 - Blober'

self.addEventListener('install', event => {
    console.log("Log form event 'INSTALL' in SW version " + version )
    return self.skipWaiting()
})

self.addEventListener('activate', event => {
    console.log("Log form event 'ACTIVATE' in SW version " + version )
    return self.clients.claim()
})

/*
//Simple fetch general for install BTN - Pour la possiblités d'installer décommenter çi dessous

self.addEventListener('fetch', event => {
    const requestURL = new URL(
        event.request.url
    )
})

*/

// Définition d'un cache pour les assets
const ASSETS_CACHE_NAME= "assets"

// 2 Méthodes : getter et setter pour le cache.

const getResponseFromCache = (
    cacheName,
    request
) => {
    // on ouvre le bon cache 
    return caches.open(cacheName)
    .then( cache => {
        // on retourne le fichier correspondant à la requête
        return cache.match(request)
    })
}

const setResponseCache = (
    cacheName,
    request,
    response
) => {
    // on ouvre le bon cache
    return caches.open(cacheName)
    .then(cache => {
        return cache.put(request, response)
    })
}

// Stratégies de cache
// Méthode de stratégie cacheFirst alias priorité au cache

const getResponseFromCacheFirst = (
    cacheName,
    request
) => {
const response = getResponseFromCache(
    cacheName, request
)
.then ( response  => {
    //est-ce que la réponse existe dans le cache
    if(response) {
        // on retourne la réponse au naviguateur
        return response
    }
    // le fichier correspondant à request n'existe pas dans notre cache
    else{
        return fetch(request)
        .then (response => {
            setResponseCache(
                cacheName,
                request,
                response.clone()
            )
            // on envoie la réponse à la stratégie 
            return response
        })
    }
})
// on envoie la réponse au naviguateur
return response
}

self.addEventListener("fetch", event => {
    // chaque fois que le navigauteur va effectué une requête on va réupérer la valeur de la requête
    const requestUrl = new URL (
        event.request.url
    )
    // on intercepte la requ^te et on va appliqer la stratégie Cahcefirst
    if(requestUrl.pathname.startsWith('/assets')){
        event.respondWith(
            getResponseFromCacheFirst(ASSETS_CACHE_NAME, event.request)
        )
    }
})