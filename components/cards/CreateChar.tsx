"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "../ui/button";
import ChooseTemplate from "../ui/ChooseTemplate";
import {
  characterAcademyPosts,
  roleplayAcademyPosts,
  storytellingAcademyPosts,
} from "../../constants";
const CreateChar = () => {
  const router = useRouter();

  return (
    <motion.div
      className="flex flex-col shadow-around  text-white group overflow-hidden w-[95%] mx-auto md:w-[48%] h-[32rem] rounded-2xl space-y-4 p-4 items-center justify-center group-hover:scale-[105%] relative"
      style={{ backgroundSize: "cover" }}
    >
      <div className="flex flex-row items-center w-full">
        <Image
          src="/assets/add.svg"
          width={1000}
          height={1000}
          className="w-[2rem] h-[2rem] mt-2"
          alt="add sign"
        />
        <h1 className="font-bold text-3xl text-neutral-900 px-4 pt-4 pb-2">
          New Character
        </h1>
      </div>
      <div className="flex flex-row w-full h-4/5 mx-2 gap-1">
        <div className="h-full w-full flex flex-col gap-2 overflow-hidden">
          <div className="w-full h-[45%] overflow-hidden relative pl-4 pt-4 rounded-2xl bg-neutral-100 border-[1px] border-neutral-300">
            <h4 className="font-semibold text-sm text-neutral-700">
              New Template!
            </h4>
            <h1 className="font-bold text-lg md:py-1 w-[90%] text-neutral-900">
              Call of Cthulhu
            </h1>
            <p className="text-xs md:text-sm text-neutral-600 w-[45%]">
              Craft your next investigator to challenge the unknown
            </p>
            <Image
              src="/assets/templateCards/coc.jpg"
              width={1000}
              height={1000}
              className="absolute h-full w-1/2 rounded-2xl top-0 p-1 right-0 object-cover"
              alt="new template image"
            />
            <Button
              onClick={() => {
                router.push("/create-coc-character");
              }}
              className="absolute bg-opacity-50 backdrop-blur-lg bottom-2 right-2 rounded-full gap-1 w-[35%] h-[2rem] border-[1px] hover:bg-neutral-700 border-white"
            >
              <p className="text-white">Try Now</p>
              <Image
                src="/assets/open.svg"
                width={1000}
                height={1000}
                className="w-[0.8rem] h-[0.8rem] mt-0.5 ml-0.5 filter-white"
                alt="add sign"
              />
            </Button>
          </div>
          <div className="border-[1px] border-neutral-300 w-full h-[55%] relative overflow-hidden rounded-2xl pl-4 pt-4 bg-neutral-100">
            <h4 className="font-semibold text-sm text-neutral-700">
              Navigate Insights:
            </h4>
            <h1 className="text-neutral-900 font-bold leading-6 text-lg md:text-md py-1 w-[45%]">
              {storytellingAcademyPosts[0].heading}
            </h1>
            <Image
              src={storytellingAcademyPosts[0].img}
              width={1000}
              height={1000}
              className="absolute h-full p-1 rounded-2xl w-1/2 top-0 right-0 object-cover"
              alt="new template image"
            />
            <Button
              onClick={() => router.push(`${storytellingAcademyPosts[0].link}`)}
              className="absolute bg-opacity-50 backdrop-blur-lg bottom-2 right-2 rounded-full gap-1 w-[35%] h-[2rem] border-[1px] hover:bg-neutral-700 border-white"
            >
              Learn
              <Image
                src="/assets/open.svg"
                width={1000}
                height={1000}
                className="w-[0.8rem] h-[0.8rem] mt-0.5 ml-0.5 filter-white"
                alt="add sign"
              />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full h-max ">
        <ChooseTemplate page="menu" />
      </div>
    </motion.div>
  );
};

export default CreateChar;
