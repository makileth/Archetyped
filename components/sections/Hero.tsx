"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";
import GetStarted from "../ui/GetStarted";
export default function Hero() {
  const router = useRouter();

  return (
    <div className="min-h-[100vh]  md:min-h-[55rem] lg:min-h-[65rem] mx-auto w-full md:max-w-6xl">
      <div className="relative isolate lg:px-8 flex flex-col">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto mt-[7rem] py-32 sm:py-16">
          <div className="text-center w-full items-center flex flex-col">
            <h1 className=" text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl z-[10] ">
              Create Tabletop <br />
            </h1>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mt-2">
              <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text z-[10]">
                Characters
              </span>

              <span className="relative italic text-transparent text-white p-4 text-outline z-[5]">
                Easily!
                <div className="absolute w-[7rem] h-[2.5rem] md:w-[10rem] md:h-[4rem]  bg-pink-500 rotate-[-10deg] right-[1rem] md:right-8 top-5 z-[-5]"></div>
              </span>
            </h1>
            <div className="w-full h-[3rem] mt-[2rem]">
              <GetStarted />
            </div>
          </div>

          {/* <div className="justify-between items-center w-full h-[33vh] mt-12 flex flex-row">
              {images.map((image) => (
                <div
                  className="w-[25%] h-full flex bg-cover bg-top"
                  style={{ backgroundImage: `url(${image.url})` }}
                />
              ))}
            </div> */}
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="md:flex  hidden md:mt-[15rem] mt-[0rem]">
          <div
            className="absolute w-[33%] h-[70%] right-[21%] z-[20] top-[60%] bg-cover bg-top"
            style={{ backgroundImage: `url(/assets/woman-hero.png)` }}
          />
          <div
            className="absolute w-[33%] h-[80%] right-[0%] z-[10] top-[50%] bg-cover bg-top"
            style={{ backgroundImage: `url(/assets/man-hero.png)` }}
          />
          <div
            className="absolute w-[33%] h-[80%] left-[0%] z-[10] top-[50%] bg-cover bg-top"
            style={{ backgroundImage: `url(/assets/test.png)` }}
          />
          <div
            className="absolute w-[33%] h-[80%] left-[21%] z-[15] top-[50%] bg-cover bg-top"
            style={{ backgroundImage: `url(/assets/test4.png)` }}
          />
        </div>
        <div className="absolute md:block hidden w-full h-[10rem] bg-gradient-to-t from-white to-transparent z-[30] bottom-[-13rem]" />
      </div>
    </div>
  );
}
