"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";

import "react-toastify/dist/ReactToastify.css";
import Hero from "../../components/sections/Hero";
import Features from "../../components/sections/Features";
import About from "../../components/sections/About";
import CTA from "../../components/sections/CTA";
import Pricing from "../../components/sections/Pricing";
import Grid from "../../components/sections/Grid";
import OurVision from "../../components/ui/OurVision";
import WhyWe from "../../components/sections/WhyWe";
import Testimonials from "../../components/sections/Testimonials";
import Academy from "../../components/sections/AcademyHomepage";
import News from "../../components/sections/academy/News";
export default function Onboarding() {
  const router = useRouter();

  return (
    <div className="overflow-x-hidden">
      <Hero />
      {/* <div className="rounded-2xl mx-4 lg:mx-9 bg-neutral-900">
        <OurVision />
      </div> */}
      <Features />
      <WhyWe />
      <Testimonials />
      <News mode="academy" />
      <Pricing />
      <CTA />
    </div>
  );
}
