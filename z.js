
// async function requestBackgroundSync() {
//     await self.registration.sync.register('my-tag-name');
// } 


// self.addEventListener("install", event => {
//     console.log("Service worker installed");
//  });
//  self.addEventListener("activate", event => {
//     console.log("Service worker activated");
//  });

function sendChatMessage(message) {
    return addChatMessageToOutbox(message).then(() => {
      // Wait for the scoped service worker registration to get a
      // service worker with an active state
      return navigator.serviceWorker.ready;
    }).then(reg => {
      return reg.sync.register('send-chats');
    }).then(() => {
      console.log('Sync registered!');
    }).catch(() => {
      console.log('Sync registration failed :(');
    });
  }
  sendChatMessage('ll')

  function addChatMessageToOutbox(){
  return new Promise(function(myResolve, myReject) {
    // "Producing Code" (May take some time)
    
      myResolve('jj'); // when successful
       // when error
    });
  
  }




  self.addEventListener('sync', event => {
    if (event.tag == 'send-chats') {
      event.waitUntil(
        getMessagesFromOutbox().then(messages => {
          // Post the messages to the server
          return fetch('https://mcubd.netlify.app/', {
            method: 'GET',
          }).then(() => {
            // Success! Remove them from the outbox
            return removeMessagesFromOutbox(messages);
          });
        }).then(() => {
          // Tell pages of your success so they can update UI
          return clients.matchAll({ includeUncontrolled: true });
        }).then(clients => {
          clients.forEach(client => client.postMessage('outbox-processed'))
        })
      );
    }
  });








