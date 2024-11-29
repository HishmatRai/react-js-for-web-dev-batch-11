import React from "react";
import { Layout } from "../../components";
import "./index.css";
import { useNavigate } from "react-router-dom";
const News = () => {
  const navigate = useNavigate();

  const NewsList = [
    {
      title:
        "FDE abolishes Saturday holiday in Islamabad educational institutions",
      pDate: "November 29, 2024",
      url: "https://www.thenews.com.pk/assets/uploads/updates/2024-11-29/1256310_151576_schools-2_updates.jpg",
      text: "The Federal Directorate of Education (FDE) has abolished Saturday holiday for two months in Islamabad's educational institutions — from November 30 to February 1, 2025. Without referring to the PTI's three-day-long protest, a notification stated that Saturday will be observed as working day in all the educational institutions working under the ambit of the Federal Directorate of Education (FDE) to compensate the academic loss due to their frequent closure.",
    },
    {
      title: "CM Gandapur dismisses reports of dispute with Bushra Bibi",
      pDate: "November 29, 2024",
      url: "https://www.thenews.com.pk/assets/uploads/updates/2024-11-29/1256282_3726633_bushr-agnadn_updates.jpg",
      text: "The chief minister emphasised that the primary goal for him and his supporters is the release of the founder of Pakistan Tehreek-e-Insaf (PTI), adding that the cases against them are baseless. 'There are no differences between Bushra Bibi and myself,' said CM Gandapur in Peshawar. He further explained, 'Reports suggesting any discord are purely fabricated and part of a smear campaign.'",
    },
    {
      title: "Saying goodbye to November",
      pDate: "24 November, 2024",
      url: "https://www.thenews.com.pk/assets/uploads/magazine/2024-11-24/1254451_7794668_2424_magazine.jpg",
      text: "Pakistani rapper Star Shah has achieved a significant milestone. His solo song ‘No Idea’ was recently featured in a Cristiano Ronaldo tribute video on FIFA’s official TikTok account. The video celebrates Ronaldo’s journey from humble beginnings to global stardom, perfectly aligning with the song’s themes of resilience and perseverance. ‘No Idea’ is a compelling anthem of determination, inspired by Shah’s personal journey of pursuing his dreams despite societal pressures and setbacks. The song masterfully weaves Punjabi and English, narrating struggles, emotional sacrifices, and unwavering hope. Its poignant refrain, “You have no idea,” serves both as a personal declaration and a universal truth, resonating with dreamers across the globe.",
    },
  ];
  return (
    <Layout>
      <h1>News Page</h1>
      <div className="news-card-container">
        {NewsList.map((val, index) => {
          return (
            <div key={index}>
              {/* <p>{val.title.length < 50 ? val.title : `${val.title.slice(0,50)} ...`}</p> */}
              <p className="news-title">{val.title}</p>
              <p>{val.pDate}</p>
              <img src={val.url} />
              <p className="news-text">{val.text}</p>
              <button
                onClick={() =>
                  navigate(`/news-details/${val.title}`, { state: val })
                }
              >
                Details
              </button>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};
export default News;
