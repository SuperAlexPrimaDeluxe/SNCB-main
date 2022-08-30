if('serviceWorker' in navigator){
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service.js')
    .then((reg) => {
      console.log('notify', 'Service writer is started @ scope' + reg.scope)
    })
    .catch( (error) => {
    console.log('alerte', 'service worker registration failed with' + error)
  })
})
}//if

//affichage Bouton d'installation
const installBtn = document.querySelector('.install')
let deferredPrompt;


window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault()
  deferredPrompt = event
  installBtn.classList.remove('hidden')
})
  installBtn.addEventListener('click', event => {
    deferredPrompt.prompt() //Déclarer l'event à la palce de window
    deferredPrompt.userChoice.then(choice => {
      if(choice === 'accepted'){
        console.log("Installation acceptée")
      }
      else {
        console.log("Installation Refusée")
      }
      deferredPrompt = null
    })
  })