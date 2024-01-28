"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "../ui/button";

const CreateChar = () => {
  const router = useRouter();

  const images = [
    "/assets/createCard/cardImg1.jpg",
    "/assets/createCard/cardImg2.jpg",
    "/assets/createCard/cardImg3.jpg",
    "/assets/createCard/cardImg4.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(images[0]);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [imageKey, setImageKey] = useState(0);

  const changeImage = () => {
    setImageKey((prevKey) => {
      const nextKey = (prevKey + 1) % images.length;
      setCurrentImage(images[nextKey]);
      return nextKey;
    });
  };

  const startTransition = () => {
    if (!intervalId) {
      changeImage();
      const intervalTime = 2000;
      const time = setInterval(changeImage, intervalTime);
      setIntervalId(time);
    }
  };

  const endTransition = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setCurrentImage(images[0]); // Reset to the first image
    }
  };

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <motion.div
      className="flex flex-col shadow-around bg-gradient-to-b from-white via-white to-cyan-100 text-white group overflow-hidden  hover:shadow-primary duration-300 border-black w-[95%] mx-auto md:w-[48%] h-[32rem] rounded-2xl space-y-4 p-4 items-center justify-center transition-transform transform group-hover:scale-[105%] group-hover:drop-shadow-2xl relative"
      style={{ backgroundSize: "cover" }}
      onMouseEnter={startTransition}
      onMouseLeave={endTransition}
    >
      <div className="flex flex-row items-center w-full">
        <Image
          src="/assets/add.svg"
          width={125}
          height={125}
          className="w-[2rem] h-[2rem] mt-2"
          alt="add sign"
        />
        <h1 className="font-bold text-3xl text-black px-4 pt-4 pb-2">
          Create a Character
        </h1>
      </div>
      <div className="flex flex-row w-full h-4/5 mx-2 gap-1">
        <div className="h-full w-1/2 rounded-[10px] overflow-hidden">
          <motion.div
            key={imageKey}
            initial={{ opacity: 0.75, scale: 1 }}
            animate={{
              opacity: 1,
              scale: 1.1,
              backgroundImage: `url("${currentImage}")`,
            }}
            transition={{ ease: "easeInOut", duration: 1.3 }}
            className="w-full h-full object-cover bg-center "
          ></motion.div>
        </div>
        <div className="h-full w-1/2 flex flex-col gap-2 overflow-hidden">
          <div className="w-full h-1/2 relative rounded-[10px] pl-4 pt-4 bg-neutral-800">
            <h4 className="font-semibold text-sm text-neutral-300">
              No Ideas?
            </h4>
            <h1 className="font-bold text-md md:text-lg py-1 w-[90%]">
              Start by learning the basics!
            </h1>
            <Button className="absolute bottom-2 right-2 rounded-full gap-1 w-1/2 h-[2rem] border-[1px] hover:bg-neutral-800 border-white">
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-500">
                Learn
              </p>
              <Image
                src="/assets/open.svg"
                width={125}
                height={125}
                className="w-[0.8rem] h-[0.8rem] mt-0.5 ml-0.5 filter-white"
                alt="add sign"
              />
            </Button>
          </div>
          <div className="w-full h-1/2 relative rounded-[10px] pl-4 pt-4 bg-slate-100 border-[1px] border-neutral-500">
            <h4 className="font-semibold text-sm text-neutral-700">
              New Template!
            </h4>
            <h1 className="font-bold text-lg md:py-1 w-[90%] text-black">
              D&D 5e
            </h1>
            <p className="text-xs md:text-sm text-neutral-600 w-[90%]">
              Ready for a deep dive into a fantasy realm?
            </p>
            <Button
              onClick={() => {
                router.push("/create");
              }}
              className="absolute bottom-2 right-2 rounded-full gap-1 w-3/4 md:w-2/3 h-[2rem] hover:bg-neutral-800"
            >
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-500">
                Try Now
              </p>
              <Image
                src="/assets/open.svg"
                width={125}
                height={125}
                className="w-[0.8rem] h-[0.8rem] mt-0.5 ml-0.5 filter-white"
                alt="add sign"
              />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full h-max ">
        <Button
          onClick={() => {
            router.push("/create");
          }}
          className="w-full rounded-full h-[2rem]"
        >
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Start Creating
          </p>
        </Button>
      </div>
    </motion.div>
  );
};

export default CreateChar;
