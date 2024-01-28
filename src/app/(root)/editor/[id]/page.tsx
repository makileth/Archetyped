"use client";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "../../../../../components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DeleteButton from "../../../../../components/ui/DeleteButton";
import React, { useEffect, useState } from "react";
import LoadingScreen from "../../../../../components/screens/LoadingScreen";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Combobox } from "../../../../../components/ui/combobox";
import { RadioColors } from "../../../../../components/ui/RadioColors";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { string } from "zod";
import CharacterValidator from "../../../../../lib/validations/character.validation";
import { ToolTip } from "../../../../../components/ui/ToolTip";
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

import BackSubmit from "../../../../../components/ui/BackSubmit";
import { useUser } from "@clerk/nextjs";
import NoRightsToAccess from "../../../../../components/errors/NoRightsToAccess";
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

type BadgeType = {
  title: string;
  color: string;
};

type BadgesType = {
  traits: Array<{
    title: string;
    color: string;
  }>;
  flaws: Array<{
    title: string;
    color: string;
  }>;
};

type ImageType = {
  img: string;
};

type ValidationErrors =
  // Make all properties of the type produced by Record<keyof CharSheetInputs, string> optional
  Partial<
    // Construct an object type where property keys are the keys of 'CharSheetInputs' and property values are strings
    Record<keyof CharSheetInputs, string>
  >;

const getData = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/CharSheets/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed!");
  }

  return res.json();
};

const Editor = ({ params }: { params: { id: string } }) => {
  const { user } = useUser();

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

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

  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const handleVoiceChange = (selectedValue: string) => {
    setCharSheetInputs((prev: any) => ({
      ...prev,
      voice: selectedValue,
    }));
    console.log(selectedValue);
  };

  const handleDeityChange = (selectedValue: string) => {
    setCharSheetInputs((prev: any) => ({
      ...prev,
      deity: selectedValue,
    }));
    console.log(selectedValue);
  };

  const [trait, setTrait] = useState({
    title: "",
    color: "",
  });

  const [flaw, setFlaw] = useState({
    title: "",
    color: "",
  });

  const [traits, setTraits] = useState<BadgesType["traits"]>([]);
  const [flaws, setFlaws] = useState<BadgesType["flaws"]>([]);

  const [flawsError, setFlawsError] = useState(false);
  const [traitsError, setTraitsError] = useState(false);

  const handleFlawsClick = () => {
    if (flaws.length == 3) {
      toast.error("Create up to 3 flaws.");
    }
    if (flaw.title == "") {
      toast.error("The input cannot be empty");
    }
    if (flaws.length < 3 && flaw.title !== "") {
      setFlaws((prev) => [...prev, flaw]);
    }
  };

  const handleTraitsClick = () => {
    if (traits.length == 3) {
      toast.error("Create up to 3 traits.");
    }
    if (trait.title == "") {
      toast.error("The input cannot be empty");
    }
    if (traits.length < 3 && trait.title !== "") {
      setTraits((prev) => [...prev, trait]);
    }
  };

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
    setTraitsError(false);
    setTrait((prev: any) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
        color: randomColorClass(),
      }; // target name is a dynamic key used in order to access the input's data
    });

    console.log(traits); // for debugging
  };

  const handleChangeFlaw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFlawsError(false);

    setFlaw((prev: any) => {
      return { ...prev, [e.target.name]: e.target.value, color: "red-500" }; // target name is a dynamic key used in order to access the input's data
    });

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

  const [CharSheetInputs, setCharSheetInputs] = useState<CharSheetInputs>({
    id: "",
    authorId: "",
    authorEmail: "",
    characterName: "",
    concept: "",
    height: "",
    age: "",
    weight: "",
    ideal: "",
    race: "",
    backstory: "",
    motivation: "",
    reasonToJoin: "",
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
    backgroundColor: "",
  });

  const [charImage, setCharImage] = useState<ImageType>({
    img: "",
  });

  const handleChangeCharSheetInputs = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCharSheetInputs((prev) => {
      // Update the state with the new input value
      return { ...prev, [e.target.name]: e.target.value };
    });

    // Clear the error for the changed field
    setValidationErrors((prevErrors: ValidationErrors) => {
      const key = e.target.name as keyof ValidationErrors;
      if (key in prevErrors) {
        const { [key]: _, ...rest } = prevErrors;
        return rest;
      } else {
        return prevErrors;
      }
    });

    console.log(CharSheetInputs); // for debugging
  };

  const [selectedColor, setSelectedColor] = useState("");

  const handleBackgroundColorClick = (selectedColor: string) => {
    setSelectedColor(selectedColor);
    setCharSheetInputs((prev) => ({
      ...prev,
      backgroundColor: selectedColor,
    }));
    console.log(selectedColor);
  };

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        // Fetch data from the server
        const characterData = await getData(params.id);

        setTraits(characterData.traits);
        setFlaws(characterData.flaws);
        setCharSheetInputs(characterData);
        setCharImage(characterData);
        setSelectedColor(characterData.backgroundColor);
      } catch (error) {
        // Handle any errors here
        console.error("Failed to fetch data:", error);
        setLoading(false); // Stop loading if an error occurs
      } finally {
        setLoading(false); // Stop loading when data fetching is complete
      }
    };

    fetchData();
  }, [params.id]); // Only re-fetch if params.id changes

  if (loading == false && user?.id !== CharSheetInputs.authorId) {
    return <NoRightsToAccess />;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (traits.length < 2) {
      setTraitsError(true);
    }
    if (flaws.length < 1) {
      setFlawsError(true);
    }

    e.preventDefault();

    const result = CharacterValidator.safeParse(CharSheetInputs);

    if (!result.success) {
      // Convert Zod errors to a more convenient format
      const newErrors = result.error.issues.reduce((acc: any, issue) => {
        acc[issue.path[0]] = issue.message;
        return acc;
      }, {});

      setValidationErrors(newErrors);
      toast.error("Check your inputs!");
      if (traitsError == true) {
        toast.error("Add minimum 2 traits");
      }
      if (flawsError == true) {
        toast.error("Add at least 1 flaw");
      }
    } else {
      setValidationErrors({});
      if (traitsError == false && flawsError == false) {
        try {
          const url = await upload();
          const res = await fetch(
            `http://localhost:3000/api/CharSheets/${params.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                img: url,
                ...CharSheetInputs,
                traits,
                flaws,
              }),
            }
          );

          const data = await res.json();

          console.log(data);

          toast.success(
            `Character ${CharSheetInputs.characterName} Updated Successfully!`
          ); // display an alert message to the user

          router.push("/menu");
        } catch (err) {
          console.log(err);
          alert("Something went wrong. Please try again later.");
        }
      } else {
        if (traitsError == true) {
          toast.error("Add minimum 2 traits");
        }
        if (flawsError == true) {
          toast.error("Add at least 1 flaw");
        }
      }
    }
  };

  return loading == true ? (
    <LoadingScreen />
  ) : (
    <main className="max-w-4xl md:py-36 lg:py-48 min-h-[100vh] mx-auto justify-center items-center">
      <RadioGroup
        defaultValue="red"
        className="flex flex-row pt-[6rem] pb-[1rem] pl-2 md:pl-0"
      >
        <RadioGroupItem
          value="red"
          id="r1"
          className="bg-red-500 text-white border-transparent rounded-full"
          onClick={() => handleBackgroundColorClick("red-500")}
        />
        <RadioGroupItem
          value="blue"
          id="r2"
          className="bg-blue-500 text-white border-transparent rounded-full"
          onClick={() => handleBackgroundColorClick("blue-500")}
        />
        <RadioGroupItem
          value="green"
          id="r3"
          className="bg-green-500 text-white border-transparent rounded-full"
          onClick={() => handleBackgroundColorClick("green-500")}
        />
        <RadioGroupItem
          value="yellow"
          id="r4"
          className="bg-yellow-500 text-white border-transparent rounded-full"
          onClick={() => handleBackgroundColorClick("yellow-500")}
        />
        <RadioGroupItem
          value="pink"
          id="r5"
          className="bg-pink-500 text-white border-transparent rounded-full"
          onClick={() => handleBackgroundColorClick("pink-500")}
        />
        <RadioGroupItem
          value="violet"
          id="r6"
          className="bg-[#B546FF] text-white border-transparent rounded-full"
          onClick={() => handleBackgroundColorClick("purple-500")}
        />
        <RadioGroupItem
          value="black"
          id="r7"
          className="bg-black text-white border-transparent rounded-full"
          onClick={() => handleBackgroundColorClick("neutral-900")}
        />
      </RadioGroup>
      <form
        action=""
        className="flex flex-col w-screen md:max-w-4xl "
        onSubmit={handleSubmit}
      >
        <section className="mx-auto w-full rounded-2xl md:shadow-2xl  border-[1.5px] items-start justify-between flex flex-col md:flex-row">
          {/* Column 1 */}

          <div
            className={`w-full bg-${selectedColor} md:w-1/3 py-2 md:py-4 h-full p-4 flex flex-col rounded-t-xl md:rounded-tr-[0px] md:rounded-l-xl`}
          >
            <h1 className="text-white text-2xl font-bold">Appearance</h1>
            <div className="w-[15rem] overflow-hidden relative my-6 h-[15rem] mx-auto flex items-center justify-center rounded-full bg-cover">
              <div className="w-full h-full bg-black  relative group">
                <p className="text-white absolute left-[24%] top-[47.5%] group-hover:block hidden font-semibold">
                  Upload an image...
                </p>
                {file ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Character's picture"
                    className="object-cover group-hover:scale-105 w-full h-full rounded-full duration-300 transition group-hover:opacity-10"
                  />
                ) : (
                  <Image
                    src={charImage.img}
                    width={250}
                    height={250}
                    className="object-cover group-hover:scale-105 w-full h-full rounded-full duration-300 transition group-hover:opacity-10"
                    alt="Default Character's picture"
                  />
                )}
                <input
                  type="file"
                  onChange={handleChangeImage}
                  className={`bg-transparent absolute rounded-full top-0 left-0 w-full h-full text-white p-2 opacity-[0%] cursor-pointer`}
                />
              </div>
            </div>
            <input
              type="text"
              className="input-minimalistic mb-2 text-center text-lg font-bold"
              placeholder="Character's Name"
              name="characterName"
              onChange={handleChangeCharSheetInputs}
              value={CharSheetInputs.characterName}
            />
            <hr />
            <div className="px-3 md:px-8 flex flex-row w-full h-max">
              <div className="flex flex-row items-center justify-around mx-auto  w-full my-3">
                <div className="flex flex-col text-md  items-center w-1/2">
                  <h4 className="font-semibold py-2 text-white">Race</h4>
                  <h4 className="font-semibold py-2 text-white">Height</h4>
                  <h4 className="font-semibold py-2 text-white">Weight</h4>
                  <h4 className="font-semibold py-2 text-white">Age</h4>
                </div>
                <div className="flex flex-col text-md items-center w-1/2">
                  <input
                    type="text"
                    className={`input-minimalistic py-2 text-center text-md font-semibold w-2/3 md:3/4 ${
                      validationErrors.race ? "error-border rounded-full" : ""
                    }`}
                    placeholder="Human"
                    onChange={handleChangeCharSheetInputs}
                    name="race"
                    value={CharSheetInputs.race}
                  />
                  <input
                    type="text"
                    className={`input-minimalistic py-2 text-center text-md font-semibold w-2/3 md:3/4 ${
                      validationErrors.height ? "error-border rounded-full" : ""
                    }`}
                    placeholder="123 cm"
                    onChange={handleChangeCharSheetInputs}
                    name="height"
                    value={CharSheetInputs.height}
                  />
                  <input
                    type="text"
                    className={`input-minimalistic py-2 text-center text-md font-semibold w-2/3 md:3/4 ${
                      validationErrors.weight ? "error-border rounded-full" : ""
                    }`}
                    placeholder="123 kg"
                    onChange={handleChangeCharSheetInputs}
                    name="weight"
                    value={CharSheetInputs.weight}
                  />
                  <input
                    type="text"
                    className={`input-minimalistic py-2 text-center text-md font-semibold w-2/3 md:3/4 ${
                      validationErrors.age ? "error-border rounded-full" : ""
                    }`}
                    placeholder="123 y.o."
                    onChange={handleChangeCharSheetInputs}
                    name="age"
                    value={CharSheetInputs.age}
                  />
                </div>
              </div>
            </div>
            <hr />
            <div className="flex flex-col w-full justify-around items-start">
              <h1 className="text-start font-bold py-3 ml-6 text-white">
                Description:
              </h1>
              <textarea
                placeholder="Blond hair, red eyes..."
                className="input-minimalistic ml-6 w-[92%] md:w-[90%]"
                name="description"
                onChange={handleChangeCharSheetInputs}
                value={CharSheetInputs.description}
                id=""
                cols={20}
                rows={24}
                style={{ resize: "none" }}
              ></textarea>
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

                  <Input
                    type="text"
                    placeholder="Blind Archer"
                    className={`rounded-full border-gray-400  focus:outline-none ${
                      validationErrors.concept
                        ? "error-border rounded-full"
                        : ""
                    }`}
                    value={CharSheetInputs.concept}
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
                    {traits.length > 0 ? (
                      traits.map((tr) => (
                        <div
                          key={tr.title}
                          className={` rounded-full group duration-300 transition hover:bg-black bg-${tr.color} px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 flex items-center justify-center w-32 overflow-hidden shadow-md text-white text-sm leading-5 truncate`}
                          aria-label="badge text"
                          onClick={() => deleteTrait(tr)}
                        >
                          <Image
                            src="/assets/delete-badge.svg"
                            width={20}
                            height={20}
                            alt="delete image"
                            className="group-hover:inline-block hidden  overflow-ellipsis overflow-hidden max-w-full whitespace-nowrap"
                          />

                          <span className="group-hover:hidden inline-block overflow-ellipsis overflow-hidden max-w-full whitespace-nowrap">
                            {tr.title}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-neutral-500 text-xs font-semibold">
                        Add traits below
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <Input
                      type="text"
                      name="title"
                      placeholder="Friendly"
                      className={`rounded-full border-gray-400  focus:outline-none  ${
                        traitsError == true ? "error-border" : ""
                      }`}
                      onChange={handleChangeTrait}
                    />
                    <button
                      type="button"
                      className="absolute right-[2%] top-[10%] text-white hover:bg-neutral-700 bg-black py-[0.05rem] px-[0.50rem] text-center rounded-full font-bold"
                      onClick={handleTraitsClick}
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
                    {flaws.length > 0 ? (
                      flaws.map((fl) => (
                        <div
                          key={fl.title}
                          className="rounded-full  group duration-300 hover:bg-black bg-red-500 px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 flex items-center justify-center w-32 overflow-hidden shadow-md text-white text-sm leading-5 truncate"
                          aria-label="badge text"
                          onClick={() => deleteFlaw(fl)}
                        >
                          <Image
                            src="/assets/delete-badge.svg"
                            width={20}
                            height={20}
                            alt="delete image"
                            className="group-hover:inline-block hidden  overflow-ellipsis overflow-hidden max-w-full whitespace-nowrap"
                          />

                          <span className="group-hover:hidden inline-block overflow-ellipsis overflow-hidden max-w-full whitespace-nowrap">
                            {fl.title}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-neutral-500 text-xs font-semibold">
                        Add flaws below
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <Input
                      type="text"
                      name="title"
                      placeholder="Too lazy"
                      className={`rounded-full border-gray-400  focus:outline-none  ${
                        flawsError == true ? "error-border" : ""
                      }`}
                      onChange={handleChangeFlaw}
                    />
                    <button
                      type="button"
                      className="absolute right-[2%] top-[10%] text-white hover:bg-neutral-700 bg-black py-[0.05rem] px-[0.50rem] text-center rounded-full font-bold"
                      onClick={handleFlawsClick}
                    >
                      +
                    </button>
                  </div>

                  <div className="flex flex-row w-full gap-2 overflow-x-auto">
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

                    <Input
                      type="text"
                      placeholder="Kiss my grits!"
                      className={`rounded-full border-gray-400  focus:outline-none  ${
                        validationErrors.catchphrase
                          ? "error-border rounded-full"
                          : ""
                      }`}
                      name="catchphrase"
                      onChange={handleChangeCharSheetInputs}
                      value={CharSheetInputs.catchphrase}
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
                      className={`rounded-full border-gray-400  focus:outline-none  ${
                        validationErrors.habitsquirks
                          ? "error-border rounded-full"
                          : ""
                      }`}
                      value={CharSheetInputs.habitsquirks}
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
                      className={`rounded-full border-gray-400  focus:outline-none ${
                        validationErrors.fears
                          ? "error-border rounded-full"
                          : ""
                      }`}
                      value={CharSheetInputs.fears}
                      name="fears"
                      onChange={handleChangeCharSheetInputs}
                    />
                  </div>
                  <div className="flex flex-col gap-2 pt-2">
                    <div className="flex flex-row gap-2">
                      <Label htmlFor="header" className="text-black ">
                        🎇 Ideal
                      </Label>
                      <ToolTip content={IdealTip} />
                    </div>

                    <Input
                      type="text"
                      placeholder="Honor. I never steal or play dirty"
                      className="rounded-full border-gray-400  focus:outline-none"
                      name="ideal"
                      value={CharSheetInputs.ideal}
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
                      value={CharSheetInputs.secret}
                    />
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

                  <Input
                    type="text"
                    placeholder="Neverwinter"
                    className={`rounded-full border-gray-400  focus:outline-none ${
                      validationErrors.motherland
                        ? "error-border rounded-full"
                        : ""
                    }`}
                    value={CharSheetInputs.motherland}
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
                    className={`rounded-full border-gray-400  focus:outline-none ${
                      validationErrors.conflict
                        ? "error-border rounded-full"
                        : ""
                    }`}
                    value={CharSheetInputs.conflict}
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
                    className={`rounded-[15px] border-[1px] h-[18.3rem] px-3 py-2 border-gray-400  text-[12px] text-black ${
                      validationErrors.backstory ? "error-border" : ""
                    }`}
                    value={CharSheetInputs.backstory}
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
                    className={`rounded-[15px] border-[1px] px-3 py-2 border-gray-400  text-[12px] text-black ${
                      validationErrors.motivation ? "error-border" : ""
                    }`}
                    value={CharSheetInputs.motivation}
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
                    <ToolTip content={ReasonTip} />
                  </div>

                  <Input
                    type="text"
                    placeholder="Looking for accomplices"
                    className={`rounded-full border-gray-400  focus:outline-none ${
                      validationErrors.reasonToJoin
                        ? "error-border rounded-full"
                        : ""
                    }`}
                    value={CharSheetInputs.reasonToJoin}
                    name="reasonToJoin"
                    onChange={handleChangeCharSheetInputs}
                  />
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
                  <div className="flex flex-col gap-2 py-2">
                    <Label htmlFor="header" className="text-black ">
                      👨‍👩‍👧‍👦 Family
                    </Label>

                    <Textarea
                      className={`rounded-[15px] h-[8rem] border-[1px] px-3 py-2 border-gray-400  text-[12px] text-black ${
                        validationErrors.family
                          ? "error-border rounded-full"
                          : ""
                      }`}
                      value={CharSheetInputs.family}
                      placeholder="A nice family, the character loves their mom and dad"
                      style={{ resize: "none" }}
                      name="family"
                      onChange={handleChangeCharSheetInputs}
                    />
                  </div>
                  <div className="flex flex-col gap-2 py-2">
                    <Label htmlFor="header" className="text-black ">
                      🧑‍🤝‍🧑 NPCs
                    </Label>

                    <Textarea
                      className={`rounded-[15px] h-[8rem] border-[1px] px-3 py-2 border-gray-400  text-[12px] text-black ${
                        validationErrors.NPCs ? "error-border rounded-full" : ""
                      }`}
                      value={CharSheetInputs.NPCs}
                      placeholder="A minor NPC from Neverwinter is my friend"
                      style={{ resize: "none" }}
                      name="NPCs"
                      onChange={handleChangeCharSheetInputs}
                    />
                  </div>
                </div>
                <div className="flex flex-col py-2 w-full md:w-1/2">
                  <div className="flex flex-col gap-2 py-2">
                    <Label htmlFor="header" className="text-black ">
                      👯 PCs
                    </Label>

                    <Textarea
                      className={`rounded-[15px] h-[8rem] border-[1px] px-3 py-2 border-gray-400  text-[12px] text-black ${
                        validationErrors.playerPCs
                          ? "error-border rounded-full"
                          : ""
                      }`}
                      value={CharSheetInputs.playerPCs}
                      placeholder="A halfling named John is a childhood friend of mine"
                      style={{ resize: "none" }}
                      name="playerPCs"
                      onChange={handleChangeCharSheetInputs}
                    />
                  </div>
                  <div className="flex flex-col gap-2 py-2">
                    <Label htmlFor="header" className="text-black ">
                      🚩 Organisations
                    </Label>

                    <Textarea
                      className={`rounded-[15px] h-[8rem] border-[1px] px-3 py-2 border-gray-400  text-[12px] text-black ${
                        validationErrors.organisations
                          ? "error-border rounded-full"
                          : ""
                      }`}
                      value={CharSheetInputs.organisations}
                      placeholder="A member of Emerald Enclave"
                      style={{ resize: "none" }}
                      name="organisations"
                      onChange={handleChangeCharSheetInputs}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <BackSubmit />
      </form>
    </main>
  );
};

export default Editor;
