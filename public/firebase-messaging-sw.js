
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyArUYAaqQ5jSDdujgxR8n9E4_IH0zjzpzw",
    authDomain: "weloapp-a6d0f.firebaseapp.com",
    projectId: "weloapp-a6d0f",
    storageBucket: "weloapp-a6d0f.appspot.com",
    messagingSenderId: "793731022121",
    appId: "1:793731022121:web:95cc048fdc709c8ac58b38",
    measurementId: "G-VZRB0YEDFR"
});

// Initialize Firebase Cloud Messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
