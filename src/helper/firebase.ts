import { initializeApp, credential } from "firebase-admin";

var serviceAccount = require("./../../cert/firebase.json");
export function initFirebase() {
    initializeApp({
        credential: credential.cert(serviceAccount),
        databaseURL: "https://twitchpoints-288ff-default-rtdb.firebaseio.com"
      });
}
