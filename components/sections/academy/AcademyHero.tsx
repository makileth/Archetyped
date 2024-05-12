"use client";
import "react-toastify/dist/ReactToastify.css";

import SectionLabel from "../../ui/SectionLabel";
import AcademyHeroScene from "../../3d/AcademyHeroScene";
import GetStartedAcademy from "../../ui/getStarted/GetStartedAcademy";
import Image from "next/image";
export default function AcademyHero() {
  return (
    <section className="min-h-[55rem] lg:min-h-[55rem] mx-auto w-full md:max-w-6xl">
      <div className="pl-2 sm:pl-6 xl:pl-0 h-full flex  flex-col md:flex-row justify-between max-w-screen-xl py-8">
        <div className="mt-[6rem] ml-4 md:ml-0 max-w-xl md:mt-[17rem] flex flex-col gap-1  md:w-[40%]">
          <SectionLabel labelText="Learning base" darkmode={false} />
          <h1 className="lg:max-w-2xl mb-4 text-4xl font-extrabold tracking-tight text-neutral-950 leading-none md:text-5xl dark:text-white">
            Narrative Academy
          </h1>
          <p className="leading-8 mb-4 font-light text-neutral-700 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Dive into the art of crafting unforgettable characters for your
            tabletop adventures. Absolutely for free.
          </p>
          <div className="flex flex-row gap-6 items-center justify-start">
            <GetStartedAcademy />
          </div>
        </div>
        <div className="w-[20rem] ss:w-full h-max overflow-hidden pr-10 md:pr-0 pl-2 sx:pl-6 md:w-[60%] md:pl-4 xl:pl-8 pt-[5rem] md:pt-[17.5rem] lg:pt-[13.5rem] xl:pt-[11.5rem] relative lg:mt-0 lg:col-span-5 lg:flex">
          <Image
            className="z-[30] w-full h-full object-contain"
            src="/assets/player_features_card.png"
            alt="mockup"
            width={1080}
            height={1080}
          />
        </div>
      </div>
    </section>
  );
}
