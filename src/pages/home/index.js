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

const Home = () => {
  const db = getDatabase();
  const firestore = getFirestore();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const starCountRef = ref(db, "blogs/");
  //   onValue(starCountRef, (snapshot) => {
  //     let newBlogs = [];
  //     snapshot.forEach((value) => {
  //       const data = value.val();

  //       const userRef = ref(db, "users/" + data?.uid);
  //       onValue(userRef, (userRes) => {
  //         let userData = {};
  //         userData.name = userRes.val()?.name;
  //         userData.photoURL = userRes.val()?.photoURL;

  //         newBlogs.push({ ...data, ...userData });
  //       });
  //     });
  //     setBlogs([...newBlogs]);
  //     setLoading(false);
  //     console.log("----blogs-------------------->",blogs)
  //   });
  // }, [loading]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const starCountRef = ref(db, "blogs/");
        // const snapshot = await get(starCountRef);
        // if (!snapshot.exists()) {
        //   console.log("No blogs found");
        //   setLoading(false);
        //   return;
        // }
        // let newBlogs = [];
        // const blogsData = snapshot.val(); // This is an object, not an array
        // for (const blogId in blogsData) {
        //   const data = blogsData[blogId]; // Each blog's data
        //   const userRef = ref(db, "users/" + data?.uid);
        //   const userRes = await get(userRef);
        //   if (userRes.exists()) {
        //     const userData = {
        //       name: userRes.val()?.name,
        //       photoURL: userRes.val()?.photoURL,
        //     };
        //     newBlogs.push({ ...data, ...userData });
        //   }
        // }
        // setBlogs(newBlogs);
        // const q = query(collection(firestore, "blogs"));
        // const unsubscribe = onSnapshot(q, (querySnapshot) => {
        //   const newBlogs = [];
        //   querySnapshot.forEach((blogRes) => {
        //     const userData = {};
        //     const unsub = onSnapshot(
        //       doc(firestore, "users", blogRes.data().uid),
        //       (userRes) => {
        //         userData.name = userRes.data()?.name;
        //         userData.photoURL = userRes.data()?.photoURL;
        //       }
        //     );
        //     console.log("user data userData: ", userData);
        //     // console.log("blogRes.data()-------",blogRes.data())
        //     // console.log("userData-------",userData)
        //     newBlogs.push([...blogRes.data(), ...userData]);
        //   });
        //   setBlogs([...newBlogs]);
        //   // console.log("newBlogs ", newBlogs);
        // });
        const q = query(collection(firestore, "blogs"));
        const unsubscribe =await onSnapshot(q, (querySnapshot) => {
          const newBlogs = [];
          const userUnsubs = [];
          querySnapshot.forEach(async(blogRes) => {
            const userData = {}; // Object to store user data
            const unsub =await onSnapshot(
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

          // You can unsubscribe when needed:
          // return () => {
          //   unsubscribe();
          //   userUnsubs.forEach(unsub => unsub());
          // };
        });

        // Unsubscribe from the blog snapshot listener when necessary
        // unsubscribe();
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("blogs", blogs);
  return (
    <Layout>
      <Card loading={loading} data={blogs} />
    </Layout>
  );
};
export default Home;
