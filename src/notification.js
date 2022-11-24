import { initializeApp } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyDgivdNAC3csZDiT3L080OWZPHSWP3X_YU',
  authDomain: 'pingifbulk-notification-demo.firebaseapp.com',
  projectId: 'pingifbulk-notification-demo',
  storageBucket: 'pingifbulk-notification-demo.appspot.com',
  messagingSenderId: '731166185949',
  appId: '1:731166185949:web:391a295c2338495740be34',
  measurementId: 'G-1DW69YWW3L'
}

function requestPermission () {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.')
      // Initialize Firebase
      const app = initializeApp(firebaseConfig)

      // Initialize Firebase Cloud Messaging and get a reference to the service
      const messaging = getMessaging(app)
      getToken(messaging, { vapidKey: 'BOJ1gqO_hMfb54SkZhvAkxi-Za6nDorwt0O1MkAAMzRN_Hc5WKOMDYsAgg8srB1dwMS4qVvW_kfV7J_89ix6AgE' }).then((currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          // ...
          console.log(currentToken)
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.')
          // ...
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err)
        // ...
      })
    } else {
      console.log('Do not have permission!')
    }
  })
}

requestPermission()
