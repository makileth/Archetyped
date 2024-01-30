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
export default function Onboarding() {
  const router = useRouter();

  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Features />
      <Grid />
      <Pricing />
      <CTA />
    </div>
  );
}
