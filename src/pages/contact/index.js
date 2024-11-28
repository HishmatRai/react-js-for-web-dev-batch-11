import React from "react";
import { Layout, Card2 } from "../../components";
const Contact = () => {
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
      <h1>Contact Page</h1>
      <Card2 data={cardList} />
    </Layout>
  );
};
export default Contact;
