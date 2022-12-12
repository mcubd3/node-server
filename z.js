  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

  import { getMessaging, getToken } from "https://cdnjs.cloudflare.com/ajax/libs/firebase/9.15.0/firebase-messaging.min.js";



  const firebaseConfig = {
    apiKey: "AIzaSyA5gs25IDoaJfCE5_tI7ulE8zossMcnnkY",
    authDomain: "jsprj-b0693.firebaseapp.com",
    projectId: "jsprj-b0693",
    storageBucket: "jsprj-b0693.appspot.com",
    messagingSenderId: "581883143558",
    appId: "1:581883143558:web:26fa31b2aa1b5afd19b807",
    measurementId: "G-VVQ6N17N9M"
  }; 
  
  function requestPermission() {
    console.log("Requesting permission...");

      console.log("Notification permission granted.");
      const app = initializeApp(firebaseConfig);

      const messaging = getMessaging(app);
      getToken(messaging, {
        vapidKey:
          "BCKNSY0FAgDlbgevvqBGsXdadLiRCrFR1wbWXqFYgQJOV3jX8nTSHAQzXcB91c6GGlmFwCfCcxCUK_UxDL7nTLA",
      }).then((currentToken) => {
        if (currentToken) {
          console.log("currentToken: ", currentToken);
        } else {
          console.log("Can not get token");
        }
      });
    
  }
  
  requestPermission();

