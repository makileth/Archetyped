"use client";
import React from "react";

import Image from "next/image";
import Link from "next/link";

const EditButton = ({ id, path }: { id: string; path: string }) => {
  return (
    <Link
      href={`${path}/${id}`}
      className="text-neutral-900 hover:border-transparent hover:text-white w-max h-[1.50rem] border-[0.5px] border-neutral-200 justify-center items-center bg-white hover:bg-neutral-900 transition duration-300 rounded-full absolute  top-1.5 right-[6rem]"
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
  );
};

export default EditButton;
