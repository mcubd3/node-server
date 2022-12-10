
    navigator.serviceWorker.ready.then(registration => {
        if (registration.sync) {
            console.log('// Background Sync is supported.')
            
        } else {
            // Background Sync isn't supported.
            console.log('// Background Sync is supported. nooo')
        }
    });

