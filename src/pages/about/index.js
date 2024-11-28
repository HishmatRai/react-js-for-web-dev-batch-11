import React from "react";
import { Layout, ChildrenComponent } from "../../components";
const About = () => {
  return (
    <Layout show={true}>
      <h1>About Page</h1>
      <ChildrenComponent title="Card 1">
        <form>
          <input type="text" placeholder="Full Name" />
        </form>
      </ChildrenComponent>
      <ChildrenComponent title="Card 2">
        <ul>
          <li>fsdf</li>
          <li>fsdf</li>
          <li>fsdf</li>
        </ul>
        <h1>fsdfd</h1>
      </ChildrenComponent>
      <ChildrenComponent title="Card 3">
        <img
          src="https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75"
          height={250}
        />
      </ChildrenComponent>
    </Layout>
  );
};
export default About;
