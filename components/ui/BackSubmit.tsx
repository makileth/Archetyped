"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const BackSubmit = () => {
  const router = useRouter();

  return (
    <div className="flex px-2 md:mx-0 z-[30] w-full my-2 h-max justify-between items-center">
      <button
        type="button"
        onClick={() => {
          router.back();
        }}
        className="text-neutral-900 hover:border-transparent hover:text-white w-max px-[2rem] h-[2rem] border-[0.5px] border-neutral-200 justify-center items-center bg-white hover:bg-neutral-900 transition duration-300 rounded-full flex  top-1.5 right-[6rem]"
      >
        <div className="flex flex-row justify-between items-center mt-[0.10rem]">
          <div className=" w-[1rem] h-[1rem] justify-center items-center ml-2 bg-neutral-200 rounded-full">
            <Image
              src="/assets/back.svg"
              alt="edit image"
              width={15}
              height={15}
              className="mx-auto mt-[0.04rem] mr-[0.25rem]"
            />
          </div>
          <p className="px-2 font-semibold text-sm">Back</p>
        </div>
      </button>
      <button
        type="submit"
        className="text-neutral-900 hover:border-transparent hover:text-white w-max px-[2rem] h-[2rem] border-[0.5px] border-neutral-200 justify-center items-center bg-white hover:bg-neutral-900 transition duration-300 rounded-full flex  top-1.5 right-[6rem]"
      >
        <div className="flex flex-row justify-between items-center mt-[0.10rem]">
          <p className="px-2 font-semibold text-sm">Submit</p>
          <div className=" w-[1rem] h-[1rem] justify-center items-center ml-2 bg-neutral-200 rounded-full">
            <Image
              src="/assets/submit.svg"
              alt="edit image"
              width={13}
              height={13}
              className="mx-auto mt-[0.10rem] ml-[0.1rem]"
            />
          </div>
        </div>
      </button>
    </div>
  );
};

export default BackSubmit;
