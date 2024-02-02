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
import {
  faerunGods,
  characterVoices,
  CharacterConceptTip,
  TraitsTip,
  FlawsTip,
  VoiceTip,
  DeityTip,
  CatchPhraseTip,
  HabitsQuirksTip,
  FearsTip,
  SecretTip,
  ConflictTip,
  BackstoryTip,
  GoalsMotivationsTip,
  ReasonTip,
  IdealTip,
} from "../../../../../constants";

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
  const res = await fetch(`https://character-verse.vercel.app/api/CharSheets/${id}`, {
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
        {/* <div className="md:flex w-full hidden">
          <Link
            className="px-4 py-2 flex flex-row gap-2 text-black font-bold"
            href="/menu"
          >
            <p className="hover:translate-x-[-3px] duration-300 transition">
              &larr;{" "}
            </p>{" "}
            <p> Back</p>
          </Link>
        </div> */}
        <div className="mx-auto max-w-4xl rounded-2xl shadow-2xl border-[1.5px] items-start justify-between flex flex-col md:flex-row">
          {/* Column 1 */}

          <div
            className={`bg-${singleCharacter.backgroundColor} w-full md:w-1/3 py-2 md:py-4 h-full p-4 flex flex-col rounded-t-xl md:rounded-tr-[0px] md:rounded-l-xl `}
          >
            <h1 className="text-white text-2xl font-bold">Appearance</h1>
            <div className="md:w-[250px] relative my-6 md:h-[250px] mx-auto flex items-center justify-center rounded-full bg-cover">
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
            <h1 className=" mb-2 text-center text-lg font-bold text-white">
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
                    {singleCharacter.weight}
                  </p>
                  <p className="truncate focus:outline-none bg-transparent my-2 font-semibold w-full h-6 text-white">
                    {singleCharacter.height}
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
                <h1 className="text-black text-2xl font-bold">Personality</h1>
                <div className="flex flex-col gap-2 py-2">
                  <div className="flex flex-row gap-2">
                    <Label htmlFor="header" className="text-black ">
                      ⚛️ Character's Concept
                    </Label>
                    <ToolTip content={CharacterConceptTip} />
                  </div>

                  <div className="text-[12px] rounded-full py-1.5 px-3 bg-transparent border-neutral-400 border-[1px] text-black">
                    <p className="truncate">{singleCharacter.concept}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 py-2">
                  <div className="flex flex-row gap-2">
                    <Label htmlFor="header" className="text-black ">
                      🎭 Traits
                    </Label>
                    <ToolTip content={TraitsTip} />
                  </div>

                  <div className="flex flex-row w-[16.6rem] overflow-x-auto  gap-2">
                    {Badges.traits?.length &&
                      Badges.traits.map((tr) => (
                        <div
                          key={tr.title}
                          className={`rounded-full bg-${tr.color} px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 flex items-center justify-center w-32 overflow-hidden shadow-md text-white text-[12px]  leading-5 truncate`}
                          aria-label="badge text"
                        >
                          <span className="inline-block overflow-ellipsis overflow-hidden max-w-full whitespace-nowrap">
                            {tr.title}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 py-2">
                  <div className="flex flex-row gap-2">
                    <Label htmlFor="header" className="text-black ">
                      🌩️ Flaws
                    </Label>
                    <ToolTip content={FlawsTip} />
                  </div>

                  <div className="flex w-[16.6rem] flex-row overflow-x-auto  gap-2">
                    {Badges.flaws?.length &&
                      Badges.flaws.map((fl) => (
                        <div
                          key={fl.title}
                          className={`rounded-full bg-${fl.color} px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 flex items-center justify-center w-32 overflow-hidden shadow-md text-white text-[12px]  leading-5 truncate`}
                          aria-label="badge text"
                        >
                          <span className="inline-block overflow-ellipsis overflow-hidden max-w-full whitespace-nowrap">
                            {fl.title}
                          </span>
                        </div>
                      ))}
                  </div>

                  <div className="flex flex-row w-full gap-2">
                    <div className="flex flex-col gap-2 py-2 text-black">
                      <div className="flex flex-row gap-2">
                        <Label htmlFor="header" className="text-black ">
                          🔔 Voice
                        </Label>
                        <ToolTip content={VoiceTip} />
                      </div>

                      <div className="px-4 py-2 text-[12px] capitalize  bg-transparent border-[1px] border-neutral-400 rounded-[10px]">
                        <p>{singleCharacter.voice}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 py-2 text-black">
                      <div className="flex flex-row gap-2">
                        <Label htmlFor="header" className="text-black ">
                          🕌 Deity
                        </Label>
                        <ToolTip content={DeityTip} />
                      </div>

                      <div className="px-4 py-2 text-[12px] capitalize bg-transparent border-[1px] border-neutral-400 rounded-[10px]">
                        <p>{singleCharacter.deity}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 pb-2">
                    <div className="flex flex-row gap-2">
                      <Label htmlFor="header" className="text-black ">
                        🉐 Catchphrase
                      </Label>
                      <ToolTip content={CatchPhraseTip} />
                    </div>

                    <div className="text-[12px]  rounded-full py-1.5 px-4 bg-transparent border-neutral-400 border-[1px] text-black">
                      <p className="truncate">{singleCharacter.catchphrase}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 pb-2">
                    <div className="flex flex-row gap-2">
                      <Label htmlFor="header" className="text-black ">
                        ✨ Habit/Quirk
                      </Label>
                      <ToolTip content={HabitsQuirksTip} />
                    </div>

                    <div className="text-[12px]  rounded-full py-1.5 px-4 bg-transparent border-neutral-400 border-[1px] text-black">
                      <p className="truncate">{singleCharacter.habitsquirks}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2">
                      <Label htmlFor="header" className="text-black ">
                        👺 Fears & Phobias
                      </Label>
                      <ToolTip content={FearsTip} />
                    </div>

                    <div className="text-[12px]  rounded-full py-1.5 px-4 bg-transparent border-neutral-400 border-[1px] text-black">
                      <p className="truncate">{singleCharacter.fears}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 pt-2">
                    <div className="flex flex-row gap-2">
                      <Label htmlFor="header" className="text-black ">
                        🎇 Ideal
                      </Label>
                      <ToolTip content={SecretTip} />
                    </div>

                    <div className="text-[12px] h-[2rem] rounded-full py-1.5 px-4 bg-transparent border-neutral-400 border-[1px] text-black">
                      <p className="truncate">{singleCharacter.ideal}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 pt-2">
                    <div className="flex flex-row gap-2">
                      <Label htmlFor="header" className="text-black ">
                        🤫 Secret
                      </Label>
                      <ToolTip content={SecretTip} />
                    </div>

                    <div className="text-[12px] h-[2rem] rounded-full py-1.5 px-4 bg-transparent border-neutral-400 border-[1px] text-black">
                      <p className="truncate">{singleCharacter.secret}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 3 */}
              <div className="w-full md:w-1/2 bg-white py-2 md:py-4 h-full p-4 flex flex-col rounded-t-xl md:rounded-l-xl]">
                <hr className="mb-[0.75rem] md:hidden block" />
                <h1 className="text-black text-2xl font-bold">Backstory</h1>
                <div className="flex flex-col gap-2 py-2">
                  <div className="flex flex-row gap-2">
                    <Label htmlFor="header" className="text-black ">
                      🏞️ Motherland
                    </Label>
                  </div>

                  <div className="text-[12px]  rounded-full py-1.5 px-4 bg-transparent border-neutral-400 border-[1px] text-black">
                    <p className="truncate">{singleCharacter.motherland}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 py-2">
                  <div className="flex flex-row gap-2">
                    <Label htmlFor="header" className="text-black ">
                      ⚡ Conflict
                    </Label>
                    <ToolTip content={ConflictTip} />
                  </div>

                  <div className="text-[12px]  rounded-full py-1.5 px-4 bg-transparent border-neutral-400 border-[1px] text-black">
                    <p className="truncate">{singleCharacter.conflict}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 py-2">
                  <div className="flex flex-row gap-2">
                    <Label htmlFor="header" className="text-black ">
                      🎞️ Background
                    </Label>
                    <ToolTip content={BackstoryTip} />
                  </div>

                  <div className="rounded-[15px] border-[1px] px-3 py-2 border-gray-400 text-[12px] text-black">
                    <p className="h-[14.8rem] overflow-y-auto">
                      {singleCharacter.backstory}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 py-2">
                  <div className="flex flex-row gap-2">
                    <Label htmlFor="header" className="text-black">
                      💫 My Goals & Motivations
                    </Label>
                    <ToolTip content={GoalsMotivationsTip} />
                  </div>

                  <p
                    className=" h-[5rem] overflow-y-auto rounded-[15px] border-[1px] px-3 py-2 border-gray-400  text-[12px] text-black"
                    style={{ resize: "none" }}
                  >
                    {singleCharacter.motivation}
                  </p>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <div className="flex flex-row gap-2">
                    <Label htmlFor="header" className="text-black ">
                      🤝 Reason to join the team
                    </Label>
                    <ToolTip content={SecretTip} />
                  </div>

                  <div className="text-[12px]  rounded-full py-1.5 px-4 bg-transparent border-neutral-400 border-[1px] text-black">
                    <p>{singleCharacter.reasonToJoin}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full  bg-white  h-full p-4 flex flex-col rounded-t-xl md:rounded-r-xl">
              <hr className="md:hidden block mb-[0.75rem]" />
              <h1 className="text-black text-2xl pb-2 font-bold">
                Relationships
              </h1>
              <hr className="md:block hidden " />
              <div className="flex flex-col md:flex-row items-center md:gap-8 justify-between">
                <div className="flex flex-col py-2 w-full md:w-1/2">
                  <div className="flex  flex-col gap-2 py-2">
                    <Label htmlFor="header" className="text-black ">
                      👨‍👩‍👧‍👦 Family
                    </Label>

                    <div className="rounded-[15px] h-[8rem] border-[1px] px-3 py-2 border-gray-400 text-[12px] text-black">
                      <p className="max-h-[7rem] my-auto overflow-y-auto">
                        {singleCharacter.family}
                      </p>
                    </div>
                  </div>
                  <div className="flex  flex-col gap-2 py-2">
                    <Label htmlFor="header" className="text-black ">
                      🧑‍🤝‍🧑 NPCs
                    </Label>

                    <div className="rounded-[15px] h-[8rem] border-[1px] px-3 py-2 border-gray-400 text-[12px] text-black">
                      <p className="max-h-[7rem] my-auto overflow-y-auto">
                        {singleCharacter.NPCs}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col py-2 w-full md:w-1/2">
                  <div className="flex  flex-col gap-2 py-2">
                    <Label htmlFor="header" className="text-black ">
                      👯 PCs
                    </Label>

                    <div className="rounded-[15px] h-[8rem] border-[1px] px-3 py-2 border-gray-400 text-[12px] text-black">
                      <p className="max-h-[7rem] my-auto overflow-y-auto">
                        {singleCharacter.playerPCs}
                      </p>
                    </div>
                  </div>
                  <div className="flex  flex-col gap-2 py-2">
                    <Label htmlFor="header" className="text-black ">
                      🚩 Organisations
                    </Label>

                    <div className="rounded-[15px] h-[8rem] border-[1px] px-3 py-2 border-gray-400 text-[12px] text-black">
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
        <CharSheetButtons charId={singleCharacter.id} />
      </div>
    </>
  );
};

export default SingleCharacterPage;
