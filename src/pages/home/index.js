import React from "react";
import { Card, Layout } from "../../components";
const Home = () => {
  const cardList = [
    {
      icon: "https://ihunar.com/static/software-development-fd2689b86be84f80acea358918d09549.png",
      title: "Software Development",
      text: "Making software programs are not an easy job, but our Software developers are very experienced and familiar with all modern tools.",
    },
    {
      icon: "https://ihunar.com/static/web-60a248a5620f89fa664ec599a06b323d.png",
      title: "Web Development",
      text: "Our Flexible and Expert IT team can turn your local or international business or idea into Responsive and attractive website.",
    },
    {
      icon: "https://ihunar.com/static/software-development-fd2689b86be84f80acea358918d09549.png",
      title: "Software Development",
      text: "Making software programs are not an easy job, but our Software developers are very experienced and familiar with all modern tools.",
    },
    {
      icon: "https://ihunar.com/static/web-60a248a5620f89fa664ec599a06b323d.png",
      title: "Web Development",
      text: "Our Flexible and Expert IT team can turn your local or international business or idea into Responsive and attractive website.",
    },
    {
      icon: "https://ihunar.com/static/software-development-fd2689b86be84f80acea358918d09549.png",
      title: "Software Development",
      text: "Making software programs are not an easy job, but our Software developers are very experienced and familiar with all modern tools.",
    },
    {
      icon: "https://ihunar.com/static/web-60a248a5620f89fa664ec599a06b323d.png",
      title: "Web Development",
      text: "Our Flexible and Expert IT team can turn your local or international business or idea into Responsive and attractive website.",
    },
  ];
  return (
    <Layout>
      <h1>Home Page</h1>
      <div className="card-container">
        {cardList.map((val, index) => {
          return (
            <Card
              key={index}
              icon={val.icon}
              title={val.title}
              text={val.text}
            />
          );
        })}
      </div>
    </Layout>
  );
};
export default Home;
