"use client";

import Image from "next/image";
import AboutCards from "../cards/AboutCards";
import AboutCardsMobile from "../cards/AboutCardsMobile";
import { useEffect, useState } from "react";

export default function About() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" &&
      window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);

    
  }, []);
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Sparking Imagination, One Story at a Time
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Your Gateway to{" "}
            <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
              Extraordinary
            </span>
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            At our company, we believe in the power of imagination and the joy
            of immersive roleplaying experiences. We've combined our love for
            tabletop gaming with a professional touch to create a platform that
            brings characters to life, all while keeping the process fun and
            exciting. Our team of passionate individuals is dedicated to
            providing you with everything you need to craft unforgettable
            characters and embark on epic adventures. Join us today and let your
            creativity soar!
          </p>
          <div className=" flex  flex-col md:flex-row mt-12 w-full gap-8 items-center justify-center">
            {isMobile ? <AboutCardsMobile /> : <AboutCards />}
          </div>
        </div>
      </div>
    </div>
  );
}
