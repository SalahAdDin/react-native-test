import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRT7L_xSjzSFHU65ItULAoClIw9DPvMsY",
  authDomain: "localhost",
  projectId: "1078652919507",
  databaseURL: "https://alternanova-250e3.firebaseio.com",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "alternanova-250e3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
