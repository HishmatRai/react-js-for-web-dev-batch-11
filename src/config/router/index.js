import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  About,
  Contact,
  SignUp,
  News,
  NewsDetails,
  Login,
} from "../../pages";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/news" element={<News />} />
        <Route path="/news-details/:id" element={<NewsDetails />} />
        <Route path="/*" element={<h1>Page not found!</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
