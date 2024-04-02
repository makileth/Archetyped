"use client";
import { Label } from "@/components/ui/label";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ToolTip } from "../../../../../components/ui/ToolTip";
import { Input } from "../../../../../components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import DeleteButton from "../../../../../components/ui/DeleteButton";
import CharSheetButtons from "../../../../../components/ui/CharSheetButtons";
import { Tips } from "../../../../../constants";

type CharSheetInputs = {
  id: string;
  authorId: string;
  authorEmail: string;
  characterName: string;
  gender: string;
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

type BadgesType = {
  traits: [
    {
      title: string;
      color: string;
    }
  ];
  flaws: [
    {
      title: string;
      color: string;
    }
  ];
};

type ImageType = {
  img: string;
};

const getData = async (id: string) => {
  const res = await fetch(`https://archetyped.vercel.app/api/CharSheets/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed!");
  }

  return res.json();
};

const SingleCharacterPage = async ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const singleCharacter: CharSheetInputs = await getData(params.id);

  const Badges: BadgesType = await getData(params.id);

  const charImage: ImageType = await getData(params.id);

  return (
    <>
      <div className="max-w-4xl pt-[5rem] md:py-36 lg:py-48 min-h-[100vh] mx-auto justify-center items-center">
        <div className="mx-auto max-w-4xl rounded-2xl shadow-2xl border-[1.5px] items-start justify-between flex flex-col md:flex-row">
          {/* Column 1 */}

          <div
            className={`bg-${singleCharacter.backgroundColor} w-full md:w-1/3 py-2 md:py-4 h-full p-4 flex flex-col rounded-t-xl md:rounded-tr-[0px] md:rounded-l-xl `}
          >
            <h1 className="text-white text-2xl font-bold">Appearance</h1>
            <div className="md:w-[250px] w-full h-full relative my-6 md:h-[250px] mx-auto flex items-center justify-center rounded-full bg-cover">
              {charImage.img ? (
                <img
                  // TODO: change later
                  src={charImage.img}
                  alt="Character's picture"
                  className="object-cover w-full h-full rounded-full "
                />
              ) : (
                <Image
                  src={"/assets/default-char-picture.png"}
                  width={125}
                  height={125}
                  className="object-cover w-full h-full rounded-full "
                  alt="Default Character's picture"
                />
              )}
            </div>
            <h1 className=" mb-2 text-center overflow-x-auto text-lg font-bold text-white text-clip">
              {singleCharacter.characterName}
            </h1>
            <hr />
            <div className="px-12 flex flex-row w-full h-max">
              <div className="flex flex-row items-center justify-around mx-auto gap-12 w-full my-3">
                <div className="flex flex-col text-md items-center justify-between">
                  <h4 className="font-semibold py-2 text-white">Gender</h4>
                  <h4 className="font-semibold py-2 text-white">Race</h4>
                  <h4 className="font-semibold py-2 text-white">Height</h4>
                  <h4 className="font-semibold py-2 text-white">Weight</h4>
                  <h4 className="font-semibold py-2 text-white">Age</h4>
                </div>
                <div className="flex flex-col text-md items-center justify-between">
                  <p className="truncate focus:outline-none bg-transparent my-2 font-semibold w-full h-6 text-white">
                    {singleCharacter.gender}
                  </p>
                  <p className="truncate focus:outline-none bg-transparent my-2 font-semibold w-full h-6 text-white">
                    {singleCharacter.race}
                  </p>
                  <p className="truncate focus:outline-none bg-transparent my-2 font-semibold w-full h-6 text-white">
                    {singleCharacter.height}
                  </p>
                  <p className="truncate focus:outline-none bg-transparent my-2 font-semibold w-full h-6 text-white">
                    {singleCharacter.weight}
                  </p>
                  <p className="truncate focus:outline-none bg-transparent my-2 font-semibold w-full h-6 text-white">
                    {singleCharacter.age}
                  </p>
                </div>
              </div>
            </div>
            <hr />
            <div className="flex flex-col w-full h-full justify-around items-start">
              <h1 className="text-start text-white font-bold py-3 ml-3">
                Description:
              </h1>
              <p
                className="ml-3 mb-3 h-[20rem] md:h-[31.5rem] text-white overflow-y-auto"
                style={{ resize: "none" }}
              >
                {singleCharacter.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col w-full h-full">
            <div className="flex md:flex-row flex-col w-full h-full">
              {/* Column 2 */}
              <div className="w-full md:w-1/2 justify-start bg-white py-2 md:py-4 h-full p-4 flex flex-col md:mt-0 mt-[1.5rem]">
                <h1 className="text-neutral-900 text-2xl font-bold">Personality</h1>
                <div className="flex flex-col gap-2 py-2">
                  <div className="flex flex-row gap-2">
                    <Label htmlFor="header" className="text-neutral-900 ">
                      ⚛️ Character's Concept
                    </Label>
                    <ToolTip content={Tips.CharacterConcept} />
                  </div>

                  <div className="text-[12px] md:w-[16.6rem] rounded-full py-1.5 px-3 bg-transparent  border-neutral-400 border-[1px] text-neutral-900">
                    <p className="line-clamp-1 overflow-x-auto">
                      {singleCharacter.concept}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 py-2">
                  <div className="flex flex-row gap-2">
                    <Label htmlFor="header" className="text-neutral-900 ">
                      🎭 Traits
                    </Label>
                    <ToolTip content={Tips.Traits} />
                  </div>

                  <div className="flex flex-row md:w-[16.6rem] overflow-x-auto gap-2">
                    {Badges.traits?.length &&
                      Badges.traits.map((tr) => (
                        <div
                          key={tr.title}
                          className={`rounded-full relative group duration-300 transition bg-${tr.color} px-2.5 py-[0.20rem] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 flex items-center justify-center w-max text-white text-[0.80rem] leading-5`}
                          aria-label="badge text"
                        >
                          <span className="inline-block mx-auto overflow-hidden w-full whitespace-nowrap">
                            {tr.title}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 py-2">
                  <div className="flex flex-row gap-2">
                    <Label htmlFor="header" className="text-neutral-900 ">
                      🌩️ Flaws
                    </Label>
                    <ToolTip content={Tips.Flaws} />
                  </div>

                  <div className="flex md:w-[16.6rem] flex-row overflow-x-auto  gap-2">
                    {Badges.flaws?.length &&
                      Badges.flaws.map((fl) => (
                        <div
                          key={fl.title}
                          className=" rounded-full relative group duration-300 transition  bg-red-500 px-2.5 py-[0.20rem] font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 flex items-center justify-center w-max text-white text-[0.80rem] leading-5"
                          aria-label="badge text"
                        >
                          <span className="inline-block mx-auto overflow-hidden w-full whitespace-nowrap">
                            {fl.title}
                          </span>
                        </div>
                      ))}
                  </div>

                  <div className="flex flex-row w-full gap-2">
                    <div className="flex flex-col gap-2 py-2 text-neutral-900">
                      <div className="flex flex-row gap-2">
                        <Label htmlFor="header" className="text-neutral-900 ">
                          🔔 Voice
                        </Label>
                        <ToolTip content={Tips.Voice} />
                      </div>

                      <div className="px-4 py-2 text-[12px] capitalize  bg-transparent border-[1px] border-neutral-400 rounded-[10px]">
                        <p>{singleCharacter.voice}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 py-2 text-neutral-900">
                      <div className="flex flex-row gap-2">
                        <Label htmlFor="header" className="text-neutral-900 ">
                          🕌 Deity
                        </Label>
                        <ToolTip content={Tips.Deity} />
                      </div>

                      <div className="px-4 py-2 text-[12px] capitalize bg-transparent border-[1px] border-neutral-400 rounded-[10px]">
                        <p>{singleCharacter.deity}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 pb-2">
                    <div className="flex flex-row gap-2">
                      <Label htmlFor="header" className="text-neutral-900 ">
                        🉐 Catchphrase
                      </Label>
                      <ToolTip content={Tips.CatchPhrase} />
                    </div>

                    <div className="text-[12px] md:w-[16.6rem] rounded-full py-1.5 px-4 bg-transparent border-neutral-400 border-[1px] text-neutral-900">
                      <p className="line-clamp-1  overflow-x-auto">
                        {singleCharacter.catchphrase}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 pb-2">
                    <div className="flex flex-row gap-2">
                      <Label htmlFor="header" className="text-neutral-900 ">
                        ✨ Habit/Quirk
                      </Label>
                      <ToolTip content={Tips.HabitsQuirks} />
                    </div>

                    <div className="text-[12px] md:w-[16.6rem] w-[16.6rem] rounded-full py-1.5 px-4 bg-transparent border-neutral-400 border-[1px] text-neutral-900">
                      <p className="line-clamp-1  overflow-x-auto">
                        {singleCharacter.habitsquirks}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2">
                      <Label htmlFor="header" className="text-neutral-900 ">
                        👺 Fears & Phobias
                      </Label>
                      <ToolTip content={Tips.Fears} />
                    </div>

                    <div className="text-[12px] md:w-[16.6rem] rounded-full py-1.5 px-4 bg-transparent border-neutral-400 border-[1px] text-neutral-900">
                      <p className="line-clamp-1  overflow-x-auto">
                        {singleCharacter.fears}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 pt-2">
                    <div className="flex flex-row gap-2">
                      <Label htmlFor="header" className="text-neutral-900 ">
                        🎇 Ideal
                      </Label>
                      <ToolTip content={Tips.Ideal} />
                    </div>

                    <div className="text-[12px] md:w-[16.6rem] h-[2rem] rounded-full py-1.5 px-4 bg-transparent border-neutral-400 border-[1px] text-neutral-900">
                      <p className="line-clamp-1  overflow-x-auto">
                        {singleCharacter.ideal}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 pt-2">
                    <div className="flex flex-row gap-2">
                      <Label htmlFor="header" className="text-neutral-900 ">
                        🤫 Secret
                      </Label>
                      <ToolTip content={Tips.Secret} />
                    </div>

                    <div className="text-[12px] md:w-[16.6rem] h-[2rem] rounded-full py-1.5 px-4 bg-transparent border-neutral-400 border-[1px] text-neutral-900">
                      <p className="line-clamp-1  overflow-x-auto">
                        {singleCharacter.secret}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 3 */}
              <div className="w-full md:w-1/2 bg-white py-2 md:py-4 h-full p-4 flex flex-col rounded-t-xl md:rounded-l-xl]">
                <hr className="mb-[0.75rem] md:hidden block" />
                <h1 className="text-neutral-900 text-2xl font-bold">Backstory</h1>
                <div className="flex flex-col gap-2 py-2">
                  <div className="flex flex-row gap-2">
                    <Label htmlFor="header" className="text-neutral-900 ">
                      🏞️ Motherland
                    </Label>
                  </div>

                  <div className="text-[12px] md:w-[16.6rem] rounded-full py-1.5 px-4 bg-transparent border-neutral-400 border-[1px] text-neutral-900">
                    <p className="line-clamp-1  overflow-x-auto">
                      {singleCharacter.motherland}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 py-2">
                  <div className="flex flex-row gap-2">
                    <Label htmlFor="header" className="text-neutral-900 ">
                      ⚡ Conflict
                    </Label>
                    <ToolTip content={Tips.Conflict} />
                  </div>

                  <div className="text-[12px] md:w-[16.6rem]  rounded-full py-1.5 px-4 bg-transparent border-neutral-400 border-[1px] text-neutral-900">
                    <p className="line-clamp-1  overflow-x-auto">
                      {singleCharacter.conflict}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 py-2">
                  <div className="flex flex-row gap-2">
                    <Label htmlFor="header" className="text-neutral-900 ">
                      🎞️ Background
                    </Label>
                    <ToolTip content={Tips.Backstory} />
                  </div>

                  <div className="rounded-[15px] md:w-[16.6rem] w-full border-[1px] px-3 py-2 border-gray-400 text-[12px] text-neutral-900">
                    <p className="h-[14.8rem] md:w-[15.2rem] overflow-y-auto overflow-x-hidden break-words">
                      {singleCharacter.backstory}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 py-2">
                  <div className="flex flex-row gap-2">
                    <Label htmlFor="header" className="text-neutral-900">
                      💫 My Goals & Motivations
                    </Label>
                    <ToolTip content={Tips.GoalsMotivations} />
                  </div>

                  <p
                    className=" h-[5rem] md:w-[16.6rem] break-words overflow-y-auto rounded-[15px] border-[1px] px-3 py-2 border-gray-400  text-[12px] text-neutral-900"
                    style={{ resize: "none" }}
                  >
                    {singleCharacter.motivation}
                  </p>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <div className="flex flex-row gap-2">
                    <Label htmlFor="header" className="text-neutral-900 ">
                      🤝 Reason to join the team
                    </Label>
                    <ToolTip content={Tips.Reason} />
                  </div>

                  <div className="text-[12px] md:w-[16.6rem]  rounded-full py-1.5 px-4 bg-transparent border-neutral-400 border-[1px] text-neutral-900">
                    <p className="line-clamp-1  overflow-x-auto">
                      {singleCharacter.reasonToJoin}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full  bg-white  h-full p-4 flex flex-col rounded-t-xl md:rounded-r-xl">
              <hr className="md:hidden block mb-[0.75rem]" />
              <h1 className="text-neutral-900 text-2xl pb-2 font-bold">
                Relationships
              </h1>
              <hr className="md:block hidden " />
              <div className="flex flex-col md:flex-row items-center md:gap-8 justify-between">
                <div className="flex flex-col py-2 w-full md:w-1/2">
                  <div className="flex  flex-col gap-2 py-2">
                    <Label htmlFor="header" className="text-neutral-900 ">
                      👨‍👩‍👧‍👦 Family
                    </Label>

                    <div className="rounded-[15px] md:w-[16.6rem] h-[8rem] border-[1px] px-3 py-2 border-gray-400 text-[12px] text-neutral-900">
                      <p className="max-h-[7rem] my-auto overflow-y-auto">
                        {singleCharacter.family}
                      </p>
                    </div>
                  </div>
                  <div className="flex  flex-col gap-2 py-2">
                    <Label htmlFor="header" className="text-neutral-900 ">
                      🧑‍🤝‍🧑 NPCs
                    </Label>

                    <div className="rounded-[15px] md:w-[16.6rem] h-[8rem] border-[1px] px-3 py-2 border-gray-400 text-[12px] text-neutral-900">
                      <p className="max-h-[7rem] my-auto overflow-y-auto">
                        {singleCharacter.NPCs}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col py-2 w-full md:w-1/2">
                  <div className="flex  flex-col gap-2 py-2">
                    <Label htmlFor="header" className="text-neutral-900 ">
                      👯 PCs
                    </Label>

                    <div className="rounded-[15px] md:w-[16.6rem] h-[8rem] border-[1px] px-3 py-2 border-gray-400 text-[12px] text-neutral-900">
                      <p className="max-h-[7rem] my-auto overflow-y-auto">
                        {singleCharacter.playerPCs}
                      </p>
                    </div>
                  </div>
                  <div className="flex  flex-col gap-2 py-2">
                    <Label htmlFor="header" className="text-neutral-900 ">
                      🚩 Organisations
                    </Label>

                    <div className="rounded-[15px] md:w-[16.6rem] h-[8rem] border-[1px] px-3 py-2 border-gray-400 text-[12px] text-neutral-900">
                      <p className="max-h-[7rem] my-auto overflow-y-auto">
                        {singleCharacter.organisations}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CharSheetButtons charId={singleCharacter.id} charEditPath="edit-coc" charPath="coc-character"/>
      </div>
    </>
  );
};

export default SingleCharacterPage;
