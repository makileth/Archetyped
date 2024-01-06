"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hero from "../../components/sections/Hero";
import Features from "../../components/sections/Features";
import About from "../../components/sections/About";
import CTA from "../../components/sections/CTA";
import Pricing from "../../components/sections/Pricing";
export default function Onboarding() {
  const router = useRouter();

  return (
    <div>
      <Hero />
      <Features />
      <About />
      <Pricing />
      <CTA />
    </div>
  );
}
