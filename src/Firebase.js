import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyArUYAaqQ5jSDdujgxR8n9E4_IH0zjzpzw",
  authDomain: "weloapp-a6d0f.firebaseapp.com",
  projectId: "weloapp-a6d0f",
  storageBucket: "weloapp-a6d0f.appspot.com",
  messagingSenderId: "793731022121",
  appId: "1:793731022121:web:95cc048fdc709c8ac58b38",
  measurementId: "G-VZRB0YEDFR"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
const messaging = getMessaging(firebaseApp);

export { messaging };
