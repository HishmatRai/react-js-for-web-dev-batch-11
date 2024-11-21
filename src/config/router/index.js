import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, About ,Contact} from "../../pages";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
