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
  SignInSignUp,
  EmailVerification,
  Profile,
  CreateNewBlog,
  BlogDetails,
} from "../../pages";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin-signup" element={<SignInSignUp />} />
        <Route path="/create-new-blog" element={<CreateNewBlog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
        <Route path="/email-verification" element={<EmailVerification />} />
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
