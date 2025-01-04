import React, { useEffect, useState } from "react";
import { Card, Layout } from "../../components";
import { getDatabase, ref, onValue,get } from "firebase/database";

const Home = () => {
  const db = getDatabase();
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
        // Reference to the "blogs" data
        const starCountRef = ref(db, 'blogs/');
        const snapshot = await get(starCountRef);

        if (!snapshot.exists()) {
          console.log('No blogs found');
          setLoading(false);
          return;
        }

        // Prepare an array to hold blog data with user info
        let newBlogs = [];

        // Iterate over the blogs data
        const blogsData = snapshot.val();  // This is an object, not an array
        for (const blogId in blogsData) {
          const data = blogsData[blogId];  // Each blog's data
          const userRef = ref(db, 'users/' + data?.uid);
          const userRes = await get(userRef);

          if (userRes.exists()) {
            const userData = {
              name: userRes.val()?.name,
              photoURL: userRes.val()?.photoURL,
            };

            // Combine blog and user data
            newBlogs.push({ ...data, ...userData });
          }
        }

        setBlogs(newBlogs);
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  console.log("blogs",blogs)
  return (
    <Layout>
      <Card loading={loading} data={blogs} />
    </Layout>
  );
};
export default Home;
