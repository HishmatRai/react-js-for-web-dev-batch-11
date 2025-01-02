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
        newBlogs.push(data);
      });
      setBlogs([...newBlogs]);
      setLoading(false);
    });
  }, []);

  console.log("blogs--------------", blogs);
  return (
    <Layout>
      <Card loading={loading} data={blogs} />
    </Layout>
  );
};
export default Home;
