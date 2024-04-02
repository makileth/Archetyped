"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DeleteButton from "../../../../components/ui/DeleteButton";
import LoadingScreen from "../../../../components/screens/LoadingScreen";
import EditButton from "../../../../components/ui/EditButton";
import Link from "next/link";
import { cocCharSheetInputs } from "@/types/types";
import ChooseTemplate from "../../../../components/ui/chooseTemplate";
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

const getDndCharactersData = async () => {
  const res = await fetch(
    "http://localhost:3000/api/CharSheets?sortBy=createdAt",
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
    "http://localhost:3000/api/cocCharSheets?sortBy=createdAt",
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const Manage = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const {
    data: dndChars = [], // Initialize with an empty array if data is undefined
    isLoading,
    error,
  } = useQuery<CharSheetInputs[]>({
    queryKey: ["dndChars"],
    queryFn: () => getDndCharactersData(),
  });

  const {
    data: cocChars = [], // Initialize with an empty array if data is undefined
  } = useQuery<cocCharSheetInputs[]>({
    queryKey: ["cocChars"],
    queryFn: () => getCocCharactersData(),
  });

  const refetchDndCharacters = async () => {
    queryClient.invalidateQueries({
      queryKey: ["dndChars"],
    });
  };
  const refetchCocCharacters = async () => {
    queryClient.invalidateQueries({
      queryKey: ["cocChars"],
    });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <section className="min-h-[100vh] md:px-3.5 lg:px-0 max-w-4xl mx-auto py-36">
      <div className="justify-start py-2 flex flex-col gap-1.5 w-full">
        <h1 className="text-neutral-700 text-xl font-bold md:ml-0 ml-2.5">
          My Characters
        </h1>
        <h4
          className={` text-2xl font-bold md:ml-0 ml-2.5 ${
            dndChars?.length + cocChars?.length > 5
              ? "text-red-500"
              : "text-neutral-900"
          }`}
        >
          Slots used: {dndChars?.length + cocChars?.length} / 6
        </h4>
      </div>

      <hr />
      <div className="flex flex-1 flex-col md:flex-row flex-wrap my-12 gap-4 md:justify-around items-center">
        {dndChars &&
          dndChars.length > 0 &&
          dndChars.map((character: any) => (
            <div
              key={character.characterName} // Use a unique key for each character
              className="flex relative flex-row w-[97%]  md:w-[48.75%] h-[10.5rem] shadow-lg border-[1px] border-neutral-200 rounded-[15px]"
            >
              <Image
                src="/assets/charsheetDecorations/dnd-logo.png"
                width={125}
                height={125}
                className="object-contain w-[4rem] h-[4rem] absolute opacity-50 left-1 bottom-1 rounded-full "
                alt="Default Character's picture"
              />

              {character.img ? (
                <Link
                  href={`/dnd-character/${character.id}`}
                  className="w-[5rem] relative mt-9 h-[5rem] ml-3 flex items-center justify-center rounded-full bg-cover"
                >
                  <Image
                    src={character.img}
                    width={125}
                    height={125}
                    className="object-cover border-[1.5px] border-neutral-200 absolute left-[-0.5rem] md:left-[-0.65rem] top-[-1.8rem] md:top-[-2rem] scale-[1.3] md:scale-[1.4] w-[5rem] h-[5rem] rounded-full "
                    alt="Default Character's picture"
                  />
                </Link>
              ) : (
                <Link
                  href={`/dnd-character/${character.id}`}
                  className="w-[5rem] relative mt-9 h-[5rem] ml-3 flex items-center justify-center rounded-full bg-cover"
                >
                  <Image
                    src="/assets/default-char-picture.png"
                    width={125}
                    height={125}
                    className="object-cover border-[1.5px] border-neutral-200 absolute left-[-0.5rem] md:left-[-0.65rem] top-[-1.8rem] md:top-[-2rem] scale-[1.3] md:scale-[1.4] w-[5rem] h-[5rem] rounded-full "
                    alt="Default Character's picture"
                  />
                </Link>
              )}

              <div className="flex flex-col w-3/4  justify-start items-start p-4 mt-4">
                <h1 className="text-neutral-900 font-bold text-2xl truncate max-w-[100%]">
                  {character.characterName}
                </h1>
                <h4 className="font-bold text-primary text-ellipsis lg:w-[19.5rem] md:w-[15rem] break-words line-clamp-1 ">
                  {character.concept}
                </h4>
                <p className="text-neutral-900 line-clamp-1 text-ellipsis w-full lg:w-[19.5rem] md:w-[15rem] break-words mt-1">
                  {character.backstory}
                </p>
              </div>
              <button
                onClick={() => {
                  router.push(`/dnd-character/${character.id}`);
                }}
                className="text-neutral-900  hover:bg-neutral-900 hover:text-white transition duration-300 hover:border-transparent border-[0.5px] rounded-full flex flex-row gap-2 px-3  border-neutral-200 font-semibold absolute text-md bottom-2 right-5"
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
                refetchDndCharacters={refetchDndCharacters}
                refetchCocCharacters={refetchCocCharacters}
                path="CharSheets"
              />
              <EditButton id={character.id} path="/edit" />
            </div>
          ))}
        {cocChars &&
          cocChars.length > 0 &&
          cocChars.map((character: any) => (
            <div
              key={character.characterName} // Use a unique key for each character
              className="flex relative flex-row w-[97%]  md:w-[48.75%] h-[10.5rem] shadow-lg border-[1px] border-neutral-200 rounded-[15px]"
            >
              <Image
                src="/assets/charsheetDecorations/coc-logo.png"
                width={125}
                height={125}
                className="object-contain w-[6.5rem] h-[6.5rem] absolute opacity-50 left-1.5 bottom-[-1.35rem] rounded-full "
                alt="Default Character's picture"
              />

              {character.img ? (
                <Link
                  href={`/coc-character/${character.id}`}
                  className="w-[5rem] relative mt-9 h-[5rem] ml-3 flex items-center justify-center rounded-full bg-cover"
                >
                  <Image
                    src={character.img}
                    width={125}
                    height={125}
                    className="object-cover border-[1.5px] border-neutral-200 absolute left-[-0.5rem] md:left-[-0.65rem] top-[-1.8rem] md:top-[-2rem] scale-[1.3] md:scale-[1.4] w-[5rem] h-[5rem] rounded-full "
                    alt="Default Character's picture"
                  />
                </Link>
              ) : (
                <Link
                  href={`/coc-character/${character.id}`}
                  className="w-[5rem] relative mt-9 h-[5rem] ml-3 flex items-center justify-center rounded-full bg-cover"
                >
                  <Image
                    src="/assets/default-char-picture.png"
                    width={125}
                    height={125}
                    className="object-cover border-[1.5px] border-neutral-200 absolute left-[-0.5rem] md:left-[-0.65rem] top-[-1.8rem] md:top-[-2rem] scale-[1.3] md:scale-[1.4] w-[5rem] h-[5rem] rounded-full "
                    alt="Default Character's picture"
                  />
                </Link>
              )}

              <div className="flex flex-col w-3/4  justify-start items-start p-4 mt-4">
                <h1 className="text-neutral-900 font-bold w-full text-2xl break-words line-clamp-1 truncate max-w-[100%]">
                  {character.characterName}
                </h1>
                <h4 className="font-bold text-primary text-ellipsis w-full lg:w-[19.5rem] md:w-[15rem] break-words line-clamp-1 ">
                  {character.concept}
                </h4>
                <p className="text-neutral-900 line-clamp-1 w-full lg:w-[19.5rem] text-ellipsis md:w-[15rem] break-words mt-1">
                  {character.backstory}
                </p>
              </div>
              <button
                onClick={() => {
                  router.push(`/coc-character/${character.id}`);
                }}
                className="text-neutral-900  hover:bg-neutral-900 hover:text-white transition duration-300 hover:border-transparent border-[0.5px] rounded-full flex flex-row gap-2 px-3  border-neutral-200 font-semibold absolute text-md bottom-2 right-5"
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
                refetchDndCharacters={refetchDndCharacters}
                refetchCocCharacters={refetchCocCharacters}
                path="cocCharSheets"
              />
              <EditButton id={character.id} path="/edit-coc" />
            </div>
          ))}
        {/* <Link
          href="/create"
          className="flex relative hover:shadow-around hover:shadow-primary transition duration-300 flex-row w-[97%]  md:w-[48.75%] h-[12rem] shadow-lg border-[1px] border-neutral-200 rounded-[15px]"
        >
          <div className="w-[4rem] relative my-auto h-[4rem] ml-8 flex items-center justify-center rounded-full bg-cover">
            <Image
              src="/assets/add.svg"
              width={125}
              height={125}
              className="object-cover w-full h-full rounded-full "
              alt="Default Character's picture"
            />
          </div>

          <div className="flex flex-col w-3/4  justify-start  items-start p-4 mt-4">
            <h1 className="text-neutral-900 font-bold text-2xl mt-11 max-w-[100%]">
              New Character
            </h1>
          </div>
        </Link> */}
        <ChooseTemplate page="manage" />
      </div>
    </section>
  );
};

export default Manage;
