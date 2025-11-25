import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Vision from "./pages/Vision";
import Services from "./pages/Services";
import Offices from "./pages/Offices";
import Leadership from "./pages/Leadership";
import Lenis from 'lenis'
export default function App() {
  // Initialize Lenis
  const lenis = new Lenis();

  // Use requestAnimationFrame to continuously update the scroll
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/services" element={<Services />} />
          <Route path="/offices" element={<Offices />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}