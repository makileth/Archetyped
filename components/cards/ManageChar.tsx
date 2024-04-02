"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "../ui/button";
import LoadingScreen from "../screens/LoadingScreen";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import SpinningLoading from "../ui/Spinner";
import { cocCharSheetInputsDb, dndCharSheetInputsDb } from "@/types/types";

type Character = dndCharSheetInputsDb | cocCharSheetInputsDb;

const getCharacterData = async () => {
  const res = await fetch(
    "https://archetyped.vercel.app/api/CharSheets?sortBy=createdAt",
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const getCocCharactersData = async () => {
  const res = await fetch(
    "https://archetyped.vercel.app/api/cocCharSheets?sortBy=createdAt",
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const ManageChar = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: chars = [],
    isLoading,
    error,
  } = useQuery<dndCharSheetInputsDb[]>({
    queryKey: ["chars"],
    queryFn: () => getCharacterData(),
  });

  const { data: cocChars = [] } = useQuery<cocCharSheetInputsDb[]>({
    queryKey: ["cocChars"],
    queryFn: () => getCocCharactersData(),
  });

  const allCharacters: Character[] = [...chars, ...cocChars].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const lastCharacter = allCharacters[0];

  return (
    <div className="flex flex-col shadow-around text-white overflow-hidden  duration-300 border-neutral-900 w-[95%] mx-auto md:w-[48%] h-[32rem] rounded-2xl space-y-4 p-4 items-center justify-center transition-transform transform group-hover:drop-shadow-2xl relative">
      <div className="flex flex-row items-center w-full">
        <Image
          src="/assets/manage.svg"
          width={125}
          height={125}
          className="w-[2rem] h-[2rem] mt-2"
          alt="add sign"
        />
        <h1 className="font-bold text-3xl text-neutral-900 px-4 pt-4 pb-2">
          My Characters
        </h1>
      </div>
      {isLoading ? (
        <SpinningLoading />
      ) : (
        <div className="h-full group border-[1px] border-neutral-200 w-full relative rounded-[10px] overflow-hidden ">
          {allCharacters.length === 0 && (
            <div>
              <div className="absolute w-full h-full z-[30] bg-neutral-800 opacity-70 backdrop-blur-2xl" />
              <p className="left-[19%] top-[45%] absolute font-medium text-white z-[40]">
                You don't have any characters yet.
              </p>
            </div>
          )}
          <div className="absolute z-[40] px-4 py-1 bg-neutral-900 backdrop-blur-xl bg-opacity-70 left-2 md:left-5 top-5 rounded-2xl">
            <p className="text-md text-neutral-100">Latest Activity</p>
          </div>

          <Image
            src={lastCharacter?.img || "/assets/grid-img1.jpg"}
            width={2500}
            height={2500}
            onClick={() => {
              lastCharacter
                ? router.push(
                    `/${lastCharacter?.birthday ? "coc-character" : "dnd-character"}/${lastCharacter?.id}`
                  )
                : router.push(`/manage`);
            }}
            alt="last created character image"
            className={`w-full cursor-pointer h-full object-cover bg-center group-hover:scale-[110%] duration-500 transition`}
          />
          <div
            className={`${
              lastCharacter ? "block" : "hidden"
            } absolute max-w-[66%] overflow-hidden transition duration-300 bottom-5 px-4 py-1 items-start bg-white h-[20%] right-5 rounded-xl`}
          >
            <h1 className="text-neutral-900 mt-1 max-w-[105%] w-max font-bold text-xl truncate ">
              {lastCharacter?.characterName || "No Character"}{" "}
            </h1>
            <h4 className="font-bold max-w-[100%] truncate w-max text-ellipsis line-clamp-1 text-primary">
              {lastCharacter?.concept}
            </h4>
          </div>
        </div>
      )}

      <div className="w-full h-max ">
        <Button
          onClick={() => {
            router.push("/manage");
          }}
          className="w-full hover:bg-primary hover:text-neutral-900 duration-300 transition ease-in-out rounded-2xl h-[2rem]"
        >
          Open
        </Button>
      </div>
    </div>
  );
};

export default ManageChar;
