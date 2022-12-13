// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  // databaseURL: 'https://project-id.firebaseio.com',
  apiKey: "AIzaSyA5gs25IDoaJfCE5_tI7ulE8zossMcnnkY",
  authDomain: "jsprj-b0693.firebaseapp.com",
  projectId: "jsprj-b0693",
  storageBucket: "jsprj-b0693.appspot.com",
  messagingSenderId: "581883143558",
  appId: "1:581883143558:web:26fa31b2aa1b5afd19b807",
  measurementId: "G-VVQ6N17N9M"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();