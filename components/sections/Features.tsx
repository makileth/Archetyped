import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionLabel from "../ui/SectionLabel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { motion } from "framer-motion";

const Features = () => {
  return (
    <section className="flex flex-col mx-auto max-w-6xl min-h-[55rem] lg:py-56 py-36">
      <div className="flex flex-col w-full text-center gap-4">
        <h1 className="text-neutral-900 text-4xl md:text-5xl w-full font-bold">
          Create characters you'll love
        </h1>
        {/* <h4 className="text-lg text-neutral-600">Discover:</h4> */}
      </div>
      <Tabs
        defaultValue="sheets"
        className="flex flex-col items-center mt-4 md:mt-8 justify-center"
      >
        <TabsList className="rounded-full max-w-[90%] md:max-w-full px-2 gap-1 ">
          <TabsTrigger className="rounded-full" value="sheets">
            Sheets
          </TabsTrigger>
          <TabsTrigger className="rounded-full" value="management">
            Manage
          </TabsTrigger>
          <TabsTrigger className="rounded-full" value="learning">
            Learn
          </TabsTrigger>
        </TabsList>
        <TabsContent value="sheets" className="px-2 md:px-10 lg:px-0">
          <motion.div
            className=" py-12 bg-neutral-900 mt-2 rounded-2xl w-full"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-full md:mx-auto gap-6 md:gap-0 flex flex-col md:flex-row items-center justify-between px-4">
              <div className=" ml-6 lg:ml-12 flex flex-col gap-1 md:w-[40%]">
                <SectionLabel labelText="Tools" darkmode={true} />
                <h1 className="max-w-md lg:max-w-2xl mb-3 text-4xl font-extrabold tracking-tight text-white leading-none lg:text-5xl dark:text-white">
                  Sleek Sheets
                </h1>
                <p className="max-w-md leading-8 mb-4 font-light text-neutral-200 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                  Aesthetic sheets & easy-to-use tools to craft unique personas
                  for your favorite tabletop adventures.
                </p>
              </div>
              <div className="w-full md:w-[50%] p-4w relative">
                <Image
                  src="/assets/carouselImages/screenshotSheet.png"
                  alt="grid image"
                  width={2500}
                  height={2500}
                  className="object-contain"
                />
              </div>
            </div>
          </motion.div>
        </TabsContent>
        <TabsContent value="management" className="px-2 md:px-10 lg:px-0">
          <motion.div
            className=" py-12 bg-neutral-900 mt-2 rounded-2xl w-full"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-full mx-auto gap-6 md:gap-0 flex flex-col md:flex-row items-center justify-between max-w-screen-xl px-4">
              <div className=" ml-6 lg:ml-12 flex flex-col gap-1 md:w-[40%]">
                <SectionLabel
                  labelText="Citadel for your ideas"
                  darkmode={true}
                />
                <h1 className="max-w-md md:leading-[3.5rem] lg:max-w-2xl mb-3 text-4xl font-extrabold tracking-tight text-white leading-none lg:text-5xl dark:text-white">
                  Simple Management
                </h1>
                <p className="max-w-md leading-8 mb-4 font-light text-neutral-200 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                  Say goodbye to keeping your character ideas unrealized. Rest
                  assured: your entire vibrant cast gets meticulously organized.
                </p>
              </div>
              <div className="w-full md:w-[50%] p-4w relative">
                <Image
                  src="/assets/carouselImages/playerDemo1.png"
                  alt="grid image"
                  width={2500}
                  height={2500}
                  className="object-contain"
                />
              </div>
            </div>
          </motion.div>
        </TabsContent>
        <TabsContent value="learning" className="px-2 md:px-10 lg:px-0">
          <motion.div
            className=" py-12 bg-neutral-900 mt-2 rounded-2xl w-full"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-full mx-auto gap-6 md:gap-0 flex flex-col md:flex-row items-center justify-between max-w-screen-xl px-4">
              <div className=" ml-6 lg:ml-12 flex flex-col gap-1 md:w-[40%]">
                <SectionLabel labelText="Skill growth" darkmode={true} />
                <h1 className="max-w-md md:leading-[3.5rem] lg:max-w-2xl mb-3 text-4xl font-extrabold tracking-tight text-white lg:text-5xl dark:text-white">
                  Level Up Your Stories
                </h1>
                <p className="max-w-md leading-8 mb-4 font-light text-neutral-200 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                  Learn how to craft engaging stories & unforgettable
                  personalities. Reveal the secrets of an outstanding roleplay -
                  even if you're shy. And more.
                </p>
              </div>
              <div className="w-full md:w-[50%] p-4w relative">
                <Image
                  src="/assets/carouselImages/playerDemo2.png"
                  alt="grid image"
                  width={2500}
                  height={2500}
                  className="object-contain"
                />
              </div>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
      <div className="w-full flex flex-row "></div>
    </section>
  );
};

export default Features;
