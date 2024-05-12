"use client";
import React from "react";
import AcademyHero from "../../../../components/sections/academy/AcademyHero";
import News from "../../../../components/sections/academy/News";

const page = () => {
  return (
    <main className="md:ml-[5rem] 2xl:ml-0 min-h-[100vh] flex flex-col overflow-x-hidden">
      <AcademyHero />
      <News mode="news" />
    </main>
  );
};

export default page;
