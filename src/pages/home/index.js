import React, { useEffect, useState } from "react";
import { Card, Layout } from "../../components";
import { getDatabase, ref, onValue } from "firebase/database";

const Home = () => {
  const db = getDatabase();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const starCountRef = ref(db, "blogs/");
    onValue(starCountRef, (snapshot) => {
      let newBlogs = [];
      snapshot.forEach((value) => {
        const data = value.val();
        const userRef = ref(db, "users/" + data.uid);
        onValue(userRef, (userRes) => {
          let userData = {};
          userData.name = userRes.val().name;
          userData.photoURL = userRes.val().photoURL;

          console.log("userData--------------", userData);
          newBlogs.push({ ...data, ...userData });
        });
      });
      setBlogs([...newBlogs]);
      console.log("newBlogs=====================>>>>>", newBlogs);
      setLoading(false);
    });
  }, [blogs]);

  console.log("blogs--------------", blogs);
  return (
    <Layout>
      <Card loading={loading} data={blogs} />
    </Layout>
  );
};
export default Home;
