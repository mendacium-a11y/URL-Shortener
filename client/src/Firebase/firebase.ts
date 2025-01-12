import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import conf from "../Conf/conf.ts"  

// WEBAPPS FIREBASE COFIGURATION
const firebaseConfig = {
  apiKey: conf.firebaseApiKey,
  authDomain: conf.firebaseAuthDomain,
  projectId: conf.firebaseProjectId,
  storageBucket: conf.firebaseStorageBucket,
  messagingSenderId: conf.firebaseMessagingSenderId,
  appId: conf.firebaseAppId,
};

// INITIALIZE FIREBASE APP
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };
