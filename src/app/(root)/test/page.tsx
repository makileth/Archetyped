"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SpinningLoading from "../../../../components/ui/Spinner";
import Spinner from "../../../../components/ui/Spinner";
import AddMail from "@/components/ui/AddMail";

const templates = [
  {
    title: "D&D  5e",
    desc: "Dive into the fantasy world",
    img: "/assets/templateCards/dnd.webp",
  },
  {
    title: "Call of Cthulhu",
    desc: "Experience eldritch horror",
    img: "/assets/templateCards/coc.jpg",
  },
  {
    title: "Literature",
    desc: "Create exciting characters for your book",
    img: "/assets/templateCards/book.jpg",
  },
  // Add more templates here as needed
];
const page = () => {
  return (
    <div className="max-w-4xl flex flex-row mx-auto">
      <div className="flex gap-2 group flex-col md:flex-row items-center h-[30rem] justify-between space-x-2">
        <button className="w-max h-max" type="button">
          <Image
            src="/assets/close.svg"
            width={20}
            height={20}
            alt="close button"
            className=""
          />
        </button>
        {templates.map((temp) => (
          <div
            key={temp.title} // Unique key for each template
            className="md:w-1/3 flex gap-4 flex-col w-full h-1/2 md:h-full relative overflow-hidden hover:shadow-2xl  hover:shadow-primary transition duration-500"
          >
            {/* <div>
              <div className="absolute w-full h-full z-[30] bg-neutral-800 opacity-70 backdrop-blur-2xl" />
              <p className="left-[27.5%] top-[45%] absolute font-medium text-white z-[40]">
                Coming soon.
              </p>
            </div> */}
            <motion.div
              className="w-full h-full rounded-2xl overflow-hidden"
              initial={{ scale: 1 }} // Start at 95% scale
              animate={{ scale: 1.05 }} // Animate to 100% scale on mount
              transition={{ duration: 0.4, ease: "easeInOut" }} // Smooth transition
            >
              <Image
                width={1000}
                height={1000}
              
                className="h-full w-full object-cover hover:scale-105 duration-300 transition"
                src={temp.img}
                alt="card image dnd"
              />
            </motion.div>
            <div className="h-max w-full flex flex-col gap-1 items-start  rounded-xl ">
              <h1 className="font-bold text-xl text-neutral-900">{temp.title}</h1>
              <p className="text-neutral-700 text-xs">{temp.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-[10rem] h-[10rem]">
        <Spinner />
      </div>
      <div className="w-[10rem] h-[10rem]">
        <AddMail />
      </div>
    </div>
  );
};

export default page;
