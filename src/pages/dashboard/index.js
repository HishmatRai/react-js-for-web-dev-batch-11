import React, { useEffect, useState } from "react";
import { Card, Layout } from "../../components";
import { getDatabase, ref, onValue, get } from "firebase/database";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const auth = getAuth();
  const firestore = getFirestore();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(
          collection(firestore, "blogs"),
          where("uid", "==", user.uid)
        );
        const unsubscribe = await onSnapshot(q, (querySnapshot) => {
          const newBlogs = [];
          const userUnsubs = [];
          console.log("querySnapshot", querySnapshot.empty);
          if (!querySnapshot.empty) {
            querySnapshot?.forEach(async (blogRes) => {
              const userData = {}; // Object to store user data
              const unsub = await onSnapshot(
                doc(firestore, "users", blogRes.data().uid),
                (userRes) => {
                  userData.name = userRes.data()?.name;
                  userData.photoURL = userRes.data()?.photoURL;
                  newBlogs.push({
                    ...blogRes.data(),
                    ...userData,
                  });
                  if (newBlogs.length === querySnapshot.size) {
                    setBlogs(newBlogs);
                  }
                }
              );
              userUnsubs.push(unsub);
              setLoading(false);
            });
          } else {
            setLoading(false);
          }
        });
      } else navigate("/");
    });
  }, []);

  // console.log("blogs", blogs);

  return (
    <Layout>
      <Card loading={loading} data={blogs} edit={true} />
    </Layout>
  );
};
export default Dashboard;
