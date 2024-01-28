"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "../ui/button";

const CreateChar = () => {
  const router = useRouter();

  return (
    <motion.div
      className="flex flex-col shadow-around bg-gradient-to-b from-white via-white to-pink-200 text-white group overflow-hidden  duration-300 border-black w-[95%] mx-auto md:w-[48%] h-[32rem] rounded-2xl space-y-4 p-4 items-center justify-center transition-transform transform group-hover:scale-[105%] group-hover:drop-shadow-2xl relative"
      style={{ backgroundSize: "cover" }}
    >
      <div className="flex flex-row items-center w-full">
        <Image
          src="/assets/manage.svg"
          width={125}
          height={125}
          className="w-[2rem] h-[2rem] mt-2"
          alt="add sign"
        />
        <h1 className="font-bold text-3xl text-black px-4 pt-4 pb-2">
          My Characters
        </h1>
      </div>
      <div className="h-full w-full relative rounded-[10px] overflow-hidden ">
        <div className="absolute z-[40] px-4 py-1 bg-black left-5 top-5 rounded-2xl">
          <p className=" text-white">Last Created Character</p>
        </div>
        <div className="absolute w-full h-full z-[30] bg-neutral-800 opacity-70 backdrop-blur-2xl" />
        <p className="left-[38%] top-[45%] absolute font-medium text-white z-[40]">
          Coming Soon
        </p>
        <div className="w-full h-full object-cover bg-center hover:scale-[103%] duration-300 transition bg-[url('/assets/grid-img1.jpg')] "></div>
      </div>
      <div className="w-full h-max ">
        <Button
          onClick={() => {
            router.push("/manage");
          }}
          className="w-full rounded-full h-[2rem]"
        >
          <p className=" bg-clip-text text-white">Open</p>
        </Button>
      </div>
    </motion.div>
  );
};

export default CreateChar;
