import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/nextjs";
import { Link } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ToolTip } from "../../../../../components/ui/ToolTip";
import { Input } from "../../../../../components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
} from "../../../../../constants/index";

type CharSheetInputs = {
  id: string;
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

type BadgeType = {
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
const getData = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/CharSheets/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed!");
  }

  return res.json();
};

const SingleCharacterPage = async ({ params }: { params: { id: string } }) => {
  const singleCharacter: CharSheetInputs = await getData(params.id);

  const Badges: BadgeType = await getData(params.id);

  return (
    <>
      <div className="flex w-full">
        <Link
          className="px-4 py-2 flex flex-row gap-2 text-black font-bold"
          href="/menu"
        >
          <p className="hover:translate-x-[-3px] duration-300 transition">
            &larr;{" "}
          </p>{" "}
          <p> Back</p>
        </Link>
      </div>

      <div className="max-w-4xl md:py-36 lg:py-48 min-h-[100vh] mx-auto justify-center items-center">
        <div className="mx-auto max-w-4xl rounded-2xl shadow-2xl border-[1.5px] items-start justify-between flex flex-col md:flex-row">
          {/* Column 1 */}

          <div
            className={`bg-[${singleCharacter.backgroundColor}] w-full md:w-1/3 py-2 md:py-4 h-full p-4 flex flex-col rounded-t-xl md:rounded-tr-[0px] md:rounded-l-xl md:mt-0 mt-[5rem]`}
          >
            <h1 className="text-white text-2xl font-bold">Appearance</h1>
            <div className="w-[250px] relative my-6 h-[250px] mx-auto flex items-center justify-center rounded-full bg-cover">
              {singleCharacter.img ? (
                  <img
                    // TODO: change later
                    src="/assets/test.png"
                    alt="Character's picture"
                    className="object-cover w-full h-full rounded-full "
                  />
                ) : (
                  <Image
                    src={'/assets/default-char-picture.png'}
                    width={125}
                    height={125}
                    className="object-cover w-full h-full rounded-full "
                    alt="Default Character's picture"
                  />)}
            </div>
            <h1 className=" mb-2 text-center text-lg font-bold text-black">
              {singleCharacter.characterName}
            </h1>
            <hr />
            <div className="px-12 flex flex-row w-full h-max">
              <div className="flex flex-row items-center justify-around mx-auto gap-12 w-full my-3">
                <div className="flex flex-col text-md items-center justify-between">
                  <h4 className="font-semibold py-2">Race</h4>
                  <h4 className="font-semibold py-2">Height</h4>
                  <h4 className="font-semibold py-2">Weight</h4>
                  <h4 className="font-semibold py-2">Age</h4>
                </div>
                <div className="flex flex-col text-md items-center justify-between">
                  <p className="focus:outline-none bg-transparent my-2 font-semibold w-full h-6 text-black">
                    {singleCharacter.race}
                  </p>
                  <p className="focus:outline-none bg-transparent my-2 font-semibold w-full h-6 text-black">
                    {singleCharacter.weight}
                  </p>
                  <p className="focus:outline-none bg-transparent my-2 font-semibold w-full h-6 text-black">
                    {singleCharacter.height}
                  </p>
                  <p className="focus:outline-none bg-transparent my-2 font-semibold w-full h-6 text-black">
                    {singleCharacter.age}
                  </p>
                </div>
              </div>
            </div>
            <hr />
            <div className="flex flex-col w-full justify-around items-start">
              <h1 className="text-start font-bold py-3 ml-6">Description:</h1>
              <p className=" ml-6" style={{ resize: "none" }}>
                {singleCharacter.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col w-full h-full">
            <div className="flex flex-row w-full h-full">
              {/* Column 2 */}
              <div className="w-full md:w-1/2 justify-start bg-white py-2 md:py-4 h-full p-4 flex flex-col md:mt-0 mt-[5rem]">
                <h1 className="text-black text-2xl font-bold">Personality</h1>
                <div className="flex flex-col gap-2 py-2">
                  <div className="flex flex-row gap-2">
                    <Label htmlFor="header" className="text-black ">
                      ⚛️ Character's Concept
                    </Label>
                    <ToolTip content={CharacterConceptTip} />
                  </div>

                  <div className="rounded-full py-1 px-4 bg-transparent border-neutral-400 border-[2px] text-black">
                    <p>{singleCharacter.concept}</p>
                  </div>

                </div>
                <div className="flex flex-col gap-2 py-2">
                  <div className="flex flex-row gap-2">
                    <Label htmlFor="header" className="text-black ">
                      🎭 Traits
                    </Label>
                    <ToolTip content={TraitsTip} />
                  </div>

                  <div className="flex flex-row overflow-x-auto  gap-2">
                    {Badges.traits?.length &&
                      Badges.traits.map((tr) => (
                        <div
                          key={tr.title}
                          className={`rounded-full bg-${tr.color} px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 flex items-center justify-center w-32 overflow-hidden shadow-md text-white text-sm leading-5 truncate`}
                          aria-label="badge text"
                        >
                          <span className="inline-block overflow-ellipsis overflow-hidden max-w-full whitespace-nowrap">
                            {tr.title}
                          </span>
                          <div className="absolute right-0 w-6 h-full bg-gradient-to-l from-transparent to-white"></div>
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

                  <div className="flex flex-row overflow-x-auto  gap-2">
                    {Badges.flaws?.length &&
                      Badges.flaws.map((fl) => (
                        <div
                          key={fl.title}
                          className={`rounded-full bg-${fl.color} px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 flex items-center justify-center w-32 overflow-hidden shadow-md text-white text-sm leading-5 truncate`}
                          aria-label="badge text"
                        >
                          <span className="inline-block overflow-ellipsis overflow-hidden max-w-full whitespace-nowrap">
                            {fl.title}
                          </span>
                          <div className="absolute right-0 w-6 h-full bg-gradient-to-l from-transparent to-white"></div>
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

                      <div>
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

                      <div>
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

                    <div className="rounded-full border-gray-400 focus:outline-none">
                      <p>{singleCharacter.catchphrase}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 pb-2">
                    <div className="flex flex-row gap-2">
                      <Label htmlFor="header" className="text-black ">
                        ✨ Habit/Quirk
                      </Label>
                      <ToolTip content={HabitsQuirksTip} />
                    </div>

                    <div className="rounded-full border-gray-400 focus:outline-none">
                      <p>{singleCharacter.habitsquirks}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2">
                      <Label htmlFor="header" className="text-black ">
                        👺 Fears & Phobias
                      </Label>
                      <ToolTip content={FearsTip} />
                    </div>

                    <div className="rounded-full border-gray-400 focus:outline-none">
                      <p>{singleCharacter.fears}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 pt-2">
                    <div className="flex flex-row gap-2">
                      <Label htmlFor="header" className="text-black ">
                        🎇 Ideal
                      </Label>
                      <ToolTip content={SecretTip} />
                    </div>

                    <div className="rounded-full border-gray-400 focus:outline-none">
                      <p>{singleCharacter.ideal}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 pt-2">
                    <div className="flex flex-row gap-2">
                      <Label htmlFor="header" className="text-black ">
                        🤫 Secret
                      </Label>
                      <ToolTip content={SecretTip} />
                    </div>

                    <div className="rounded-full border-gray-400 focus:outline-none">
                      <p>{singleCharacter.secret}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 3 */}
              <div className="w-full md:w-1/2 bg-white py-2 md:py-4 h-full p-4 flex flex-col rounded-t-xl md:rounded-l-xl md:mt-0 mt-[5rem]">
                <h1 className="text-black text-2xl font-bold">Backstory</h1>
                <div className="flex flex-col gap-2 py-2">
                  <div className="flex flex-row gap-2">
                    <Label htmlFor="header" className="text-black ">
                      🏞️ Motherland
                    </Label>
                  </div>

                  <div className="rounded-full border-gray-400 focus:outline-none">
                    <p>{singleCharacter.motherland}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 py-2">
                  <div className="flex flex-row gap-2">
                    <Label htmlFor="header" className="text-black ">
                      ⚡ Conflict
                    </Label>
                    <ToolTip content={ConflictTip} />
                  </div>

                  <div className="rounded-full border-gray-400 focus:outline-none">
                    <p>{singleCharacter.conflict}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 py-2">
                  <div className="flex flex-row gap-2">
                    <Label htmlFor="header" className="text-black ">
                      🎞️ Background
                    </Label>
                    <ToolTip content={BackstoryTip} />
                  </div>

                  <p className="rounded-[15px] border-[1px] h-[18.3rem] px-3 py-2 border-gray-400  text-[12px] text-black">
                    {singleCharacter.backstory}
                  </p>
                </div>

                <div className="flex flex-col gap-2 py-2">
                  <div className="flex flex-row gap-2">
                    <Label htmlFor="header" className="text-black ">
                      💫 My Goals & Motivations
                    </Label>
                    <ToolTip content={GoalsMotivationsTip} />
                  </div>

                  <p
                    className="rounded-[15px] border-[1px] px-3 py-2 border-gray-400  text-[12px] text-black"
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

                  <div className="rounded-full border-gray-400 focus:outline-none">
                    <p>{singleCharacter.reasonToJoin}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full  bg-white  h-full p-4 flex flex-col rounded-t-xl md:rounded-l-xl md:mt-0 mt-[5rem]">
              <h1 className="text-black text-2xl pb-2 font-bold">
                Relationships
              </h1>
              <hr />
              <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
                <div className="flex flex-col py-2 w-full md:w-1/2">
                  <div className="flex  flex-col gap-2 py-2">
                    <Label htmlFor="header" className="text-black ">
                      👨‍👩‍👧‍👦 Family
                    </Label>

                    <div
                      className="rounded-[15px] border-[1px] px-3 py-2 border-gray-400 text-[12px] text-black"
                      style={{ resize: "none" }}
                    >
                      <p>{singleCharacter.family}</p>
                    </div>
                  </div>
                  <div className="flex  flex-col gap-2 py-2">
                    <Label htmlFor="header" className="text-black ">
                      🧑‍🤝‍🧑 NPCs
                    </Label>

                    <div
                      className="rounded-[15px] border-[1px] px-3 py-2 border-gray-400 text-[12px] text-black"
                      style={{ resize: "none" }}
                    >
                      <p>{singleCharacter.NPCs}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col py-2 w-full md:w-1/2">
                  <div className="flex  flex-col gap-2 py-2">
                    <Label htmlFor="header" className="text-black ">
                      👯 PCs
                    </Label>

                    <div
                      className="rounded-[15px] border-[1px] px-3 py-2 border-gray-400 text-[12px] text-black"
                      style={{ resize: "none" }}
                    >
                      <p>{singleCharacter.playerPCs}</p>
                    </div>
                  </div>
                  <div className="flex  flex-col gap-2 py-2">
                    <Label htmlFor="header" className="text-black ">
                      🚩 Organisations
                    </Label>

                    <div
                      className="rounded-[15px] border-[1px] px-3 py-2 border-gray-400 text-[12px] text-black"
                      style={{ resize: "none" }}
                    >
                      <p>{singleCharacter.organisations}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleCharacterPage;
