const version = '1.05 - Blober'

self.addEventListener('install', event => {
    console.log("Log form event 'INSTALL' in SW version " + version )
    return self.skipWaiting()
})

self.addEventListener('activate', event => {
    console.log("Log form event 'ACTIVATE' in SW version " + version )
    return self.clients.claim()
})

self.addEventListener('fetch', event => {
    const requestURL = new URL(
        event.request.url
    )
})