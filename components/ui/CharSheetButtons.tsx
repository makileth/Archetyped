"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { CopyButton } from "./CopyButton";
import EditButton from "./EditButton";
import Link from "next/link";

const CharSheetButtons = ({
  charId,
  charPath,
  charEditPath,
}: {
  charId: string;
  charPath: string;
  charEditPath: string;
}) => {
  const router = useRouter();

  return (
    <div className="flex z-[30] flex-row  px-4  w-full my-2 h-max justify-center gap-1 md:gap-3 items-center">
      <button
        type="button"
        onClick={() => {
          router.back();
        }}
        className="text-neutral-900 hover:border-transparent hover:text-white w-max px-4 md:px-[2rem] h-[2rem] border-[0.5px] border-neutral-200 justify-center items-center bg-white hover:bg-neutral-900 transition duration-300 rounded-full flex  top-1.5 right-[6rem]"
      >
        <div className="flex flex-row justify-between items-center mt-[0.10rem]">
          <div className=" w-[1rem] h-[1rem] justify-center items-center ml-2 bg-neutral-200 rounded-full">
            <Image
              src="/assets/back.svg"
              alt="edit image"
              width={15}
              height={15}
              className="mx-auto mt-[0.05rem] mr-[0.20rem]"
            />
          </div>
          <p className="px-2 font-semibold text-sm">Back</p>
        </div>
      </button>

      <Link
        href={`/${charEditPath}/${charId}`}
        className="text-neutral-900 flex hover:border-transparent hover:text-white w-max px-4 md:px-[2rem] h-[2rem] border-[0.5px] border-neutral-200 justify-center items-center bg-white hover:bg-neutral-900 transition duration-300 rounded-full top-1.5 right-[6rem]"
      >
        <div className="flex flex-row justify-between items-center mt-[0.10rem]">
          <div className=" w-[1rem] h-[1rem] justify-center items-center ml-2 bg-neutral-200 rounded-full">
            <Image
              src="/assets/edit.svg"
              alt="edit image"
              width={10}
              height={10}
              className="mx-auto mt-[0.18rem]"
            />
          </div>
          <p className="px-2 font-semibold text-sm">Edit</p>
        </div>
      </Link>
      <CopyButton id={charId} path={charPath} />
    </div>
  );
};

export default CharSheetButtons;
