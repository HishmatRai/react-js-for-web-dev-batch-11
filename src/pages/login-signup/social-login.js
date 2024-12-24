import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const auth = getAuth();
const database = getDatabase();
const firestore = getFirestore();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
// const navigate = useNavigate();
const signUpWithGoogle = async () => {
  signInWithPopup(auth, googleProvider)
    .then(async (result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      console.log("user", user);
      set(ref(database, "users/" + user.uid), {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
      await setDoc(doc(firestore, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
      toast("Success!", { type: "success" });
      // navigate("/");
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log("errorMessage", errorMessage);
      toast(errorMessage, { type: "error" });
    });
};

const signUpWithFacebook = async () => {
  signInWithPopup(auth, facebookProvider)
    .then(async (result) => {
      const user = result.user;
      console.log("user", user);
      set(ref(database, "users/" + user.uid), {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
      await setDoc(doc(firestore, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
      toast("Success!", { type: "success" });
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log("errorMessage", errorMessage);
      toast(errorMessage, { type: "error" });
    });
};
export { signUpWithGoogle, signUpWithFacebook };
