'use client'

import React from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

type CharSheetInputs = {
  authorId: string;
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
  const res = await fetch('http://localhost:3000/api/CharSheets', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

const Manage = () => {
    const { data: char, isLoading, error } = useQuery<CharSheetInputs>({
        queryKey: ['char'],
        queryFn: () => getCharacterData(),
      });
      
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <section className="min-h-[100vh] max-w-4xl mx-auto py-36">
      <h1 className="text-black text-[42px] font-bold">My Characters</h1>
      <hr />
      <div className="flex flex-1 flex-col md:flex-row flex-wrap my-12 gap-3 justify-between items-center">
        {char?.map((character: any) => (
          <div
            key={character.characterName} // Use a unique key for each character
            className="flex relative flex-row w-full md:w-[49%] h-[12rem] shadow-lg border-[1px] border-neutral-200 rounded-[15px]"
          >
            <Image
              src="/assets/default-char-picture.png"
              alt="Character's picture"
              width={100}
              height={100}
              className="rounded-full m-4 w-[6rem] h-[6rem]"
            />
            <div className="flex flex-col gap-2 justify-start items-start p-4">
              <h1 className="text-black font-bold text-2xl">{character.characterName}</h1>
              <h4 className="font-bold text-transparent bg-clip-text bg-gradient-to-t from-accent to-primary">
                {character.motherland}
              </h4>
              <h4 className="text-black  ">🌍 City</h4>
            </div>
            <button className="text-black font-bold absolute text-lg bottom-2 right-5">Open Sheet →</button>
            <button
              className="text-white w-[1.25rem] h-[1.25rem] bg-red-500 rounded-full absolute text-[0.6rem] top-1.5 right-2"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Manage;
