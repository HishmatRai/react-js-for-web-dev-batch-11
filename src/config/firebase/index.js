import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAXh_uKuL_Wb2c32CsxTFfJCmyXZoIsDpU",
  authDomain: "web-development-batch-11.firebaseapp.com",
  databaseURL: "https://web-development-batch-11-default-rtdb.firebaseio.com",
  projectId: "web-development-batch-11",
  storageBucket: "web-development-batch-11.firebasestorage.app",
  messagingSenderId: "1039406671182",
  appId: "1:1039406671182:web:13d4479f8d9330cc922a1f",
  measurementId: "G-VSSBL2TF2S",
};
const firebase = initializeApp(firebaseConfig);
export default firebase;
