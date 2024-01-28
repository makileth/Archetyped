"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DeleteButton from "../../../../components/ui/DeleteButton";
import LoadingScreen from "../../../../components/screens/LoadingScreen";
import EditButton from "../../../../components/ui/EditButton";
import Link from "next/link";
type CharSheetInputs = {
  authorId: string;
  img: string;
  authorEmail: string;
  characterName: string;
  concept: string;
  height: string;
  age: string;
  weight: string;
  ideal: string;
  race: string;
  backstory: string;
  motivation: string;
  reasonToJoin: string;
  family: string;
  playerPCs: string;
  NPCs: string;
  organisations: string;
  description: string;
  motherland: string;
  fears: string;
  habitsquirks: string;
  voice: string;
  deity: string;
  conflict: string;
  catchphrase: string;
  secret: string;
  backgroundColor: string;
};

const getCharacterData = async () => {
  const res = await fetch("http://localhost:3000/api/CharSheets", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const Manage = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const {
    data: chars, // Rename to 'chars' to reflect that it's an array
    isLoading,
    error,
  } = useQuery<CharSheetInputs[]>({
    queryKey: ["chars"],
    queryFn: () => getCharacterData(),
  });

  const refetchCharacters = async () => {
    queryClient.invalidateQueries({
      queryKey: ["chars"],
    });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <section className="min-h-[100vh] max-w-4xl mx-auto py-36">
      <div className="justify-between py-2 flex flex-col gap-2 md:flex-row md:items-center w-full">
        <h1 className="text-black text-4xl font-bold md:ml-0 ml-2.5">
          My Characters
        </h1>
        <h4 className="text-black text-2xl font-bold md:ml-0 ml-2.5">
          Slots used: {chars?.length} / 6
        </h4>
      </div>

      <hr />
      <div className="flex flex-1 flex-col md:flex-row flex-wrap my-12 gap-3 justify-between items-center">
        {chars?.map((character: any) => (
          <div
            key={character.characterName} // Use a unique key for each character
            className="flex relative flex-row w-[97%]  md:w-[49%] h-[12rem] shadow-lg border-[1px] border-neutral-200 rounded-[15px]"
          >
           
            {character.img ? (
              <Link
              href={`/character/${character.id}`}
              className="w-[5rem] relative mt-9 h-[5rem] ml-3 flex items-center justify-center rounded-full bg-cover"
            >
              <Image
                src={character.img}
                width={125}
                height={125}
                className="object-cover w-full h-full rounded-full "
                alt="Default Character's picture"
              />
            </Link>
            ) : (
            <Link
              href={`/character/${character.id}`}
              className="w-[5rem] relative mt-9 h-[5rem] ml-3 flex items-center justify-center rounded-full bg-cover"
            >
              <Image
                 src="/assets/default-char-picture.png"
                width={125}
                height={125}
                className="object-cover w-full h-full rounded-full "
                alt="Default Character's picture"
              />
            </Link>
            )}

            <div className="flex flex-col w-3/4  justify-start items-start p-4 mt-4">
              <h1 className="text-black font-bold text-2xl">
                {character.characterName}
              </h1>
              <h4 className="font-bold text-transparent bg-clip-text bg-gradient-to-t from-accent to-primary">
                {character.concept}
              </h4>
              <p className="text-black line-clamp-2 mt-2">
                {character.description}
              </p>
            </div>
            <button
              onClick={() => {
                router.push(`/character/${character.id}`);
              }}
              className="text-black  hover:shadow-primary hover:shadow-xl transition duration-300 border-[0.5px] rounded-full flex flex-row gap-2 px-3  border-neutral-200 font-semibold absolute text-md bottom-2 right-5"
            >
              <div className="flex flex-row justify-between items-center my-[0.18rem]">
                <p className="px-2 font-semibold text-sm">Open</p>
                <div className=" w-[1.25rem] h-[1.25rem] justify-center items-center ml-2 bg-neutral-200 rounded-full">
                  <Image
                    src="/assets/open.svg"
                    alt="edit image"
                    width={12}
                    height={12}
                    className="mx-auto mt-[0.275rem]"
                  />
                </div>
              </div>
            </button>
            <DeleteButton
              id={character.id}
              refetchCharacters={refetchCharacters}
            />
            <EditButton id={character.id} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Manage;
