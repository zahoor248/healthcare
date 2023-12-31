import React from "react";
import About from "./About/About";
import Features from "./Features/Features";
import Form from "./Form/Form";
import Hero from "./Hero/Hero";
import Hiring from "./Hiring/Hiring";

export default function HomeLayout() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Features />
      <About />
    </div>
  );
}
