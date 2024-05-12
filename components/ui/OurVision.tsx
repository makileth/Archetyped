"use client";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";
import GetStarted from "./getStarted/GetStarted";
import LearnMore from "../ui/LearnMore";
import SectionLabel from "../ui/SectionLabel";
import GetStartedDark from "./getStarted/GetStartedDark";
export default function OurVision() {
  return (
    <section className="min-h-[100vh] rounded-2xl md:min-h-[45rem] lg:min-h-[55rem] mx-auto w-full md:max-w-6xl">
      <div className=" h-full flex flex-col md:flex-row justify-between max-w-screen-xl px-4 py-8">
        <div className="mx-auto ml-6 mt-[6rem] md:mt-[10rem] flex flex-col gap-1  md:w-[40%]">
          <SectionLabel labelText="Our vision" darkmode={true} />
          <h1 className="max-w-md lg:max-w-2xl mb-4 text-4xl font-extrabold tracking-tight text-white leading-none md:text-5xl dark:text-white">
            Build personas that captivate.
          </h1>
          <p className="max-w-sm leading-8 mb-4 font-light text-neutral-200 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Never struggle with character creation again. We believe everyone
            has the power to create characters that spark imagination and fuel
            unforgettable stories.{" "}
            <span className="">
              Ditch the stat sheets and dive into the heart of roleplay. We
              empower you to build unique personalities and breathe life into
              captivating characters that elevate your tabletop narratives.
            </span>
          </p>

          <div className="flex flex-row gap-6 items-center justify-start">
            <GetStartedDark />
            {/* <Link className="text-md font-semibold text-neutral-950" href="">
              Learn More
            </Link> */}
          </div>
        </div>
        <div className="w-full  md:w-[60%] md:pl-2 pt-[1rem] md:pt-[3rem] relative lg:mt-0 lg:col-span-5 lg:flex">
          <Image
            className="z-[30] w-full h-full rounded-2xl object-cover md:scale-[0.9] scale-[1]"
            src="/assets/artwork.jpg"
            alt="mockup"
            width={1080}
            height={1080}
          />
        </div>
      </div>
    </section>
  );
}
