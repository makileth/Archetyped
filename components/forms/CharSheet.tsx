"use client";
import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Combobox } from "../ui/combobox";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
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
} from "../../../../DnD_Character_Creation_App/character-verse/constants/index";

import { Textarea } from "../ui/textarea";
import { ToolTip } from "../ui/ToolTip";
import { RadioColors } from "../ui/RadioColors";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { useUser } from "@clerk/clerk-react";
import Loading from "../ui/Loading";

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

type BadgeType = {
  title: string;
  color: string;
};

const CharSheet = () => {
  // clerk find id
  const { user } = useUser();

  const router = useRouter();

  const [file, setFile] = useState<File>(); // image

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // we access the HTML-Element that activated the event
    const target = e.target as HTMLInputElement;

    // 'target.files' has info about the chosen files. We have the info about the first chosen img ([0])
    const item = (target.files as FileList)[0];

    // lets save the file
    setFile(item);

    const reader = new FileReader();
    reader.onloadend = () => {
      // Use the result of the FileReader as the source for the image
      const imageSource = reader.result as string;
      // Here, you can use `imageSource` if needed, for example, to display the image preview
    };

    if (item) {
      reader.readAsDataURL(item);
    }
  };

  const upload = async () => {
    const data = new FormData(); // by using this we will collect our img and some other info for our http-request

    data.append("file", file!); // we give the file over to data

    data.append("upload_preset", "character-verse"); // add our preset from Cloudinary

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dn2ep2prg/image/upload",
      {
        method: "POST",
        //  headers: { "Content-Type": "multipart/form-data" },
        body: data,
      }
    );

    const resData = await res.json(); // the answer from the server

    return resData.url; // extract url from the answer
  };

  const [trait, setTrait] = useState({
    title: "",
    color: "",
  });

  const [traits, setTraits] = useState<BadgeType[]>([]);

  const [flaw, setFlaw] = useState({
    title: "",
    color: "",
  });

  const [flaws, setFlaws] = useState<BadgeType[]>([]);

  const [hoveredStates, setHoveredStates] = useState<{
    [key: number]: boolean;
  }>({});

  const traitsColors = [
    "blue-500",
    "purple-500",
    "yellow-500",
    "green-500",
    "pink-500",
  ];

  const randomColorClass = () => {
    const randomIndex = Math.floor(Math.random() * traitsColors.length);
    return traitsColors[randomIndex];
  };

  const handleChangeTrait = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (traits.length < 3) {
      setTrait((prev: any) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
          color: randomColorClass(),
        }; // target name is a dynamic key used in order to access the input's data
      });
    } else {
      toast.error("Curb your enthusiasm! Create up to 3 traits.");
    }

    console.log(traits); // for debugging
  };

  const handleChangeFlaw = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (flaws.length < 3) {
      setFlaw((prev: any) => {
        return { ...prev, [e.target.name]: e.target.value, color: "red-500" }; // target name is a dynamic key used in order to access the input's data
      });
    } else {
      toast.error("Curb your enthusiasm! Create up to 3 flaws.");
    }

    console.log(flaws); // for debugging
  };

  const deleteTrait = (trait: { title: string; color: string }) => {
    setTraits((prevTraits) =>
      prevTraits.filter((t) => t.title !== trait.title)
    );
  };

  const deleteFlaw = (flaw: { title: string; color: string }) => {
    setFlaws((prevFlaws) => prevFlaws.filter((f) => f.title !== flaw.title));
  };

  const handleVoiceChange = (selectedValue: string) => {
    setCharSheetInputs((prev) => ({
      ...prev,
      voice: selectedValue,
    }));
    console.log(selectedValue);
  };

  const handleDeityChange = (selectedValue: string) => {
    setCharSheetInputs((prev) => ({
      ...prev,
      deity: selectedValue,
    }));
    console.log(selectedValue);
  };

  const [selectedColor, setSelectedColor] = useState("#FD3535");

  const [CharSheetInputs, setCharSheetInputs] = useState<CharSheetInputs>({
    authorId: "",
    authorEmail: "",
    characterName: "",
    backgroundColor: selectedColor,
    concept: "",
    height: "",
    weight: "",
    age: "",
    race: "",
    backstory: "",
    motivation: "",
    reasonToJoin: "",
    ideal: "",
    family: "",
    playerPCs: "",
    NPCs: "",
    organisations: "",
    description: "",
    motherland: "",
    fears: "",
    habitsquirks: "",
    voice: "",
    deity: "",
    conflict: "",
    catchphrase: "",
    secret: "",
  });

  useEffect(() => {
    const fetchClerkUserInfo = async () => {
      if (user) {
        const userEmail = user?.primaryEmailAddress?.emailAddress;
        setCharSheetInputs((prev) => ({
          ...prev,
          authorId: user.id,
          authorEmail: userEmail!,
        }));
      }
    };

    fetchClerkUserInfo();
  }, [user]);

  const handleChangeCharSheetInputs = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCharSheetInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });

    console.log(CharSheetInputs); // for debugging
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const url = await upload();
      const res = await fetch("http://localhost:3000/api/CharSheets", {
        // https://restaurant-app-dusky.vercel.app
        method: "POST",
        body: JSON.stringify({
          img: url,
          ...CharSheetInputs,
          traits,
          flaws,
        }),
      });

      const data = await res.json();

      console.log(data);

      toast.success(
        `Character ${CharSheetInputs.characterName} Created Successfully!`
      ); // display an alert message to the user

      router.push("/menu");
    } catch (err) {
      console.log(err);
      alert("Something went wrong. Please try again later.");
    }
  };

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
      <RadioGroup defaultValue="red" className="flex flex-row py-2">
        <RadioGroupItem
          value="red"
          id="r1"
          className="bg-red-500 text-white border-transparent rounded-full"
          onClick={() => setSelectedColor("#FD3535")}
        />
        <RadioGroupItem
          value="blue"
          id="r2"
          className="bg-blue-500 text-white border-transparent rounded-full"
          onClick={() => setSelectedColor("#3557FD")}
        />
        <RadioGroupItem
          value="green"
          id="r3"
          className="bg-green-500 text-white border-transparent rounded-full"
          onClick={() => setSelectedColor("#43D256")}
        />
        <RadioGroupItem
          value="yellow"
          id="r4"
          className="bg-yellow-500 text-white border-transparent rounded-full"
          onClick={() => setSelectedColor("#F5E430")}
        />
        <RadioGroupItem
          value="pink"
          id="r5"
          className="bg-pink-500 text-white border-transparent rounded-full"
          onClick={() => setSelectedColor("#F530CA")}
        />
        <RadioGroupItem
          value="violet"
          id="r6"
          className="bg-[#B546FF] text-white border-transparent rounded-full"
          onClick={() => setSelectedColor("#B546FF")}
        />
        <RadioGroupItem
          value="black"
          id="r7"
          className="bg-black text-white border-transparent rounded-full"
          onClick={() => setSelectedColor("#131313")}
        />
      </RadioGroup>

      <form
        action=""
        className="mx-auto max-w-4xl rounded-2xl shadow-2xl border-[1.5px] items-start justify-between flex flex-col md:flex-row"
        onSubmit={handleSubmit}
      >
        {/* Column 1 */}

        <div
          style={{ backgroundColor: selectedColor }}
          className="w-full md:w-1/3 py-2 md:py-4 h-full p-4 flex flex-col rounded-t-xl md:rounded-tr-[0px] md:rounded-l-xl md:mt-0 mt-[5rem]"
        >
          <h1 className="text-white text-2xl font-bold">Appearance</h1>
          <div className="w-[250px] relative my-6 h-[250px] mx-auto flex items-center justify-center rounded-full bg-cover">
            {file ? (
              <img
                src={URL.createObjectURL(file)}
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
            <input
              type="file"
              onChange={handleChangeImage}
              className="bg-neutral-800 absolute rounded-full w-full h-full text-white p-2 opacity-[0%] cursor-pointer"
            />
          </div>
          <input
            type="text"
            className="input-minimalistic mb-2 text-center text-lg font-bold"
            placeholder="Character's Name"
            name="characterName"
            onChange={handleChangeCharSheetInputs}
          />
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
                <input
                  type="text"
                  className="focus:outline-none bg-transparent my-2 font-semibold w-full h-6 "
                  placeholder="Human"
                  onChange={handleChangeCharSheetInputs}
                  name="race"
                />
                <input
                  type="text"
                  className="focus:outline-none bg-transparent my-2 font-semibold w-full h-6"
                  placeholder="123 kg"
                  onChange={handleChangeCharSheetInputs}
                  name="weight"
                />
                <input
                  type="text"
                  className="focus:outline-none bg-transparent my-2 font-semibold w-full h-6"
                  placeholder="123 cm"
                  onChange={handleChangeCharSheetInputs}
                  name="height"
                />
                <input
                  type="text"
                  className="focus:outline-none bg-transparent my-2 font-semibold w-full h-6"
                  placeholder="123 y.o."
                  onChange={handleChangeCharSheetInputs}
                  name="age"
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="flex flex-col w-full justify-around items-start">
            <h1 className="text-start font-bold py-3 ml-6">Description:</h1>
            <textarea
              placeholder="Blond hair, red eyes..."
              className="input-minimalistic ml-6"
              name="description"
              onChange={handleChangeCharSheetInputs}
              id=""
              cols={20}
              rows={19}
              style={{ resize: "none" }}
            ></textarea>
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

                <Input
                  type="text"
                  placeholder="Blind Archer"
                  className="rounded-full border-gray-400  focus:outline-none"
                  onChange={handleChangeCharSheetInputs}
                  name="concept"
                />
              </div>
              <div className="flex flex-col gap-2 py-2">
                <div className="flex flex-row gap-2">
                  <Label htmlFor="header" className="text-black ">
                    🎭 Traits
                  </Label>
                  <ToolTip content={TraitsTip} />
                </div>

                <div className="flex flex-row overflow-x-auto  gap-2">
                  {" "}
                  {/* TODO: fix scroll and make a custom badge*/}
                  {traits.map((tr) => (
                    <div
                      key={tr.title}
                      className={`rounded-full bg-${tr.color} px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 flex items-center justify-center w-32 overflow-hidden shadow-md text-white text-sm leading-5 truncate`}
                      aria-label="badge text"
                      onClick={() => deleteTrait(tr)}
                    >
                      <span className="inline-block overflow-ellipsis overflow-hidden max-w-full whitespace-nowrap">
                        {tr.title}
                      </span>
                      <div className="absolute right-0 w-6 h-full bg-gradient-to-l from-transparent to-white"></div>
                    </div>
                  ))}
                </div>
                <div className="relative">
                  <Input
                    type="text"
                    name="title"
                    placeholder="Friendly"
                    className="rounded-full border-gray-400  focus:outline-none"
                    onChange={handleChangeTrait}
                  />
                  <button
                    type="button"
                    className="absolute right-[2%] top-[10%] hover:bg-neutral-700 bg-black py-[0.05rem] px-[0.50rem] text-center rounded-full font-bold"
                    onClick={() => setTraits((prev) => [...prev, trait])}
                  >
                    +
                  </button>
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
                  {" "}
                  {/* TODO: fix scroll */}
                  {flaws.map((fl) => (
                    <div
                      key={fl.title}
                      className="rounded-full bg-red-500 px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 flex items-center justify-center w-32 overflow-hidden shadow-md text-white text-sm leading-5 truncate"
                      aria-label="badge text"
                      onClick={() => deleteFlaw(fl)}
                    >
                      <span className="inline-block overflow-ellipsis overflow-hidden max-w-full whitespace-nowrap">
                        {fl.title}
                      </span>
                      <div className="absolute right-0 w-6 h-full bg-gradient-to-l from-transparent to-white"></div>
                    </div>
                  ))}
                </div>
                <div className="relative">
                  <Input
                    type="text"
                    name="title"
                    placeholder="Too lazy"
                    className="rounded-full border-gray-400  focus:outline-none"
                    onChange={handleChangeFlaw}
                  />
                  <button
                    type="button"
                    className="absolute right-[2%] top-[10%] hover:bg-neutral-700 bg-black py-[0.05rem] px-[0.50rem] text-center rounded-full font-bold"
                    onClick={() => setFlaws((prev) => [...prev, flaw])}
                  >
                    +
                  </button>
                </div>
                <div className="flex flex-row w-full gap-2">
                  <div className="flex flex-col gap-2 py-2 text-black">
                    <div className="flex flex-row gap-2">
                      <Label htmlFor="header" className="text-black ">
                        🔔 Voice
                      </Label>
                      <ToolTip content={VoiceTip} />
                    </div>

                    <Combobox
                      options={characterVoices}
                      onSelect={handleVoiceChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2 py-2 text-black">
                    <div className="flex flex-row gap-2">
                      <Label htmlFor="header" className="text-black ">
                        🕌 Deity
                      </Label>
                      <ToolTip content={DeityTip} />
                    </div>

                    <Combobox
                      options={faerunGods}
                      onSelect={handleDeityChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 pb-2">
                  <div className="flex flex-row gap-2">
                    <Label htmlFor="header" className="text-black ">
                      🉐 Catchphrase
                    </Label>
                    <ToolTip content={CatchPhraseTip} />
                  </div>

                  <input
                    type="text"
                    placeholder="Kiss my grits!"
                    className="placeholder-gray-500 w-full text-xs rounded-full border border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200  outline-none text-gray-700  px-3 leading-8 transition-colors duration-200 ease-in-out"
                    name="catchphrase"
                    onChange={handleChangeCharSheetInputs}
                  />

                </div>
                <div className="flex flex-col gap-2 pb-2">
                  <div className="flex flex-row gap-2">
                    <Label htmlFor="header" className="text-black ">
                      ✨ Habit/Quirk
                    </Label>
                    <ToolTip content={HabitsQuirksTip} />
                  </div>

                  <Input
                    type="text"
                    placeholder="Really hates not knowing things"
                    className="rounded-full border-gray-400  focus:outline-none"
                    name="habitsquirks"
                    onChange={handleChangeCharSheetInputs}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-2">
                    <Label htmlFor="header" className="text-black ">
                      👺 Fears & Phobias
                    </Label>
                    <ToolTip content={FearsTip} />
                  </div>

                  <Input
                    type="text"
                    placeholder="Fear of being touched"
                    className="rounded-full border-gray-400  focus:outline-none"
                    name="fears"
                    onChange={handleChangeCharSheetInputs}
                  />
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <div className="flex flex-row gap-2">
                    <Label htmlFor="header" className="text-black ">
                      🎇 Ideal
                    </Label>
                    <ToolTip content={SecretTip} />
                  </div>

                  <Input
                    type="text"
                    placeholder="Honor. I never steal or play dirty"
                    className="rounded-full border-gray-400  focus:outline-none"
                    name="ideal"
                    onChange={handleChangeCharSheetInputs}
                  />
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <div className="flex flex-row gap-2">
                    <Label htmlFor="header" className="text-black ">
                      🤫 Secret
                    </Label>
                    <ToolTip content={SecretTip} />
                  </div>

                  <Input
                    type="text"
                    placeholder="Had an affair with a minor character"
                    className="rounded-full border-gray-400  focus:outline-none"
                    name="secret"
                    onChange={handleChangeCharSheetInputs}
                  />
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

                <Input
                  type="text"
                  placeholder="Neverwinter"
                  className="rounded-full border-gray-400  focus:outline-none"
                  name="motherland"
                  onChange={handleChangeCharSheetInputs}
                />
              </div>
              <div className="flex flex-col gap-2 py-2">
                <div className="flex flex-row gap-2">
                  <Label htmlFor="header" className="text-black ">
                    ⚡ Conflict
                  </Label>
                  <ToolTip content={ConflictTip} />
                </div>

                <Input
                  type="text"
                  placeholder="Exposed spy hunted down by assassins"
                  className="rounded-full border-gray-400  focus:outline-none"
                  name="conflict"
                  onChange={handleChangeCharSheetInputs}
                />
              </div>
              <div className="flex flex-col gap-2 py-2">
                <div className="flex flex-row gap-2">
                  <Label htmlFor="header" className="text-black ">
                    🎞️ Background
                  </Label>
                  <ToolTip content={BackstoryTip} />
                </div>

                <Textarea
                  className="rounded-[15px] border-[1px] h-[18.3rem] px-3 py-2 border-gray-400  text-[12px] text-black"
                  placeholder="Once, I was just a kid with a dream..."
                  style={{ resize: "none" }}
                  name="backstory"
                  onChange={handleChangeCharSheetInputs}
                />
              </div>

              <div className="flex flex-col gap-2 py-2">
                <div className="flex flex-row gap-2">
                  <Label htmlFor="header" className="text-black ">
                    💫 My Goals & Motivations
                  </Label>
                  <ToolTip content={GoalsMotivationsTip} />
                </div>

                <Textarea
                  className="rounded-[15px] border-[1px] px-3 py-2 border-gray-400  text-[12px] text-black"
                  placeholder="Badly wants to be remembered"
                  style={{ resize: "none" }}
                  name="motivation"
                  onChange={handleChangeCharSheetInputs}
                />
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <div className="flex flex-row gap-2">
                  <Label htmlFor="header" className="text-black ">
                    🤝 Reason to join the team
                  </Label>
                  <ToolTip content={SecretTip} />
                </div>

                <Input
                  type="text"
                  placeholder="Looking for accomplices"
                  className="rounded-full border-gray-400  focus:outline-none"
                  name="reasonToJoin"
                  onChange={handleChangeCharSheetInputs}
                />
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

                  <Textarea
                    className="rounded-[15px] border-[1px] px-3 py-2 border-gray-400  text-[12px] text-black"
                    placeholder="A nice family, the character loves their mom and dad"
                    style={{ resize: "none" }}
                    name="family"
                    onChange={handleChangeCharSheetInputs}
                  />
                </div>
                <div className="flex  flex-col gap-2 py-2">
                  <Label htmlFor="header" className="text-black ">
                    🧑‍🤝‍🧑 NPCs
                  </Label>

                  <Textarea
                    className="rounded-[15px] border-[1px] px-3 py-2 border-gray-400  text-[12px] text-black"
                    placeholder="A minor NPC from Neverwinter is my friend"
                    style={{ resize: "none" }}
                    name="NPCs"
                    onChange={handleChangeCharSheetInputs}
                  />
                </div>
              </div>
              <div className="flex flex-col py-2 w-full md:w-1/2">
                <div className="flex  flex-col gap-2 py-2">
                  <Label htmlFor="header" className="text-black ">
                    👯 PCs
                  </Label>

                  <Textarea
                    className="rounded-[15px] border-[1px] px-3 py-2 border-gray-400  text-[12px] text-black"
                    placeholder="A halfling named John is a childhood friend of mine"
                    style={{ resize: "none" }}
                    name="playerPCs"
                    onChange={handleChangeCharSheetInputs}
                  />
                </div>
                <div className="flex  flex-col gap-2 py-2">
                  <Label htmlFor="header" className="text-black ">
                    🚩 Organisations
                  </Label>

                  <Textarea
                    className="rounded-[15px] border-[1px] px-3 py-2 border-gray-400  text-[12px] text-black"
                    placeholder="A member of Emerald Enclave"
                    style={{ resize: "none" }}
                    name="organisations"
                    onChange={handleChangeCharSheetInputs}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <button
              type="submit"
              className="bg-black rounded-2xl hover:bg-neutral-800 duration-300 transition px-4 py-1 mx-4"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CharSheet;
