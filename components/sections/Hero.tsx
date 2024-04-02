"use client";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";
import GetStarted from "../ui/getStarted/GetStarted";
import LearnMore from "../ui/LearnMore";
import SectionLabel from "../ui/SectionLabel";
import VersionLabel from "../ui/VersionLabel";
export default function Hero() {
  return (
    <section className="min-h-[55rem] lg:min-h-[55rem] mx-auto w-full md:max-w-6xl">
      <div className=" h-full flex  flex-col md:flex-row justify-between max-w-screen-xl px-4 py-8">
        <div className="mx-auto mt-[6rem] max-w-xl md:mt-[17rem] flex flex-col gap-1  md:w-[40%]">
          <VersionLabel labelText="Introducing v1.0.0 Beta" />
          <SectionLabel
            labelText="#1 App for creating fictional characters"
            darkmode={false}
          />
          <h1 className="mb-4 font-extrabold tracking-tight text-neutral-950 leading-none text-5xl dark:text-white">
            Writing characters made easy
          </h1>
          <p className="leading-8 mb-4 font-light text-neutral-700 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Create great characters for your tabletop narratives in just a few
            minutes. Free of charge.
          </p>
          <div className="flex flex-row gap-6 items-center justify-start">
            <GetStarted />
            {/* <Link className="text-md font-semibold text-neutral-950" href="">
              Learn More
            </Link> */}
            <LearnMore darkmode={false} />
          </div>
        </div>
        <div className="w-full overflow-hidden md:w-[60%] md:pl-2 pt-[1rem] md:pt-[3rem] relative lg:mt-0 lg:col-span-5 lg:flex">
          <Image
            className="z-[30] w-full h-full md:scale-[0.9] scale-[1] object-contain"
            src="/assets/hero-chars.webp"
            alt="mockup"
            width={1080}
            height={1080}
          />
          {/* <Image
            className="absolute top-1 w-full h-full z-[1]"
            src="/assets/crests.svg"
            alt=""
            width={1080}
            height={1080}
          /> */}
        </div>
      </div>
    </section>
  );
}
