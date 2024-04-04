"use client";
import React, { useState, useEffect, useRef } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Combobox } from "../ui/combobox";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import CharacterValidator from "../../lib/validations/character.validation";
import { Textarea } from "../ui/textarea";
import { ToolTip } from "../ui/ToolTip";
import { RadioColors } from "../ui/RadioColors";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { useUser } from "@clerk/clerk-react";
import Loading from "../ui/Loading";
import BackSubmit from "../ui/BackSubmit";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingScreen from "../screens/LoadingScreen";
import NoSlotsPage from "../errors/NoSlotsPage";
import {
  Tips,
  characterVoices,
  faerunGods,
  sheetThemes,
} from "../../constants";
import {
  cocCharSheetInputs,
  dndCharSheetInputs,
  dndCharSheetInputsDb,
} from "@/types/types";
import TextEditor from "../ui/TextEditor";
import CharSheetButtons from "../ui/CharSheetButtons";

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
  // Make all properties of the type produced by Record<keyof dndCharSheetInputs, string> optional
  Partial<
    // Construct an object type where property keys are the keys of 'dndCharSheetInputs' and property values are strings
    Record<keyof dndCharSheetInputs, string>
  >;

const getData = async (id: string) => {
  const res = await fetch(
    `https://archetyped.vercel.app/api/CharSheets/${id}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed!");
  }
  return res.json();
};

const DndCharSheet = ({
  submitPath,
  method,
  paramsId,
  isReadOnly,
}: {
  submitPath: string;
  method: string;
  paramsId?: string;
  isReadOnly?: boolean;
}) => {
  const getDndCharactersData = async () => {
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

  const {
    data: dndChars = [], // Initialize with an empty array if data is undefined
    isLoading,
    error,
  } = useQuery<dndCharSheetInputsDb[]>({
    queryKey: ["dndChars"],
    queryFn: () => getDndCharactersData(),
  });

  const {
    data: cocChars = [], // Initialize with an empty array if data is undefined
  } = useQuery<cocCharSheetInputs[]>({
    queryKey: ["cocChars"],
    queryFn: () => getCocCharactersData(),
  });

  const [theme, setTheme] = useState("light");

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  const queryClient = useQueryClient();

  const isMobile = window.innerWidth <= 768;

  const { data: chars } = useQuery<dndCharSheetInputs[]>({
    queryKey: ["chars"],
    queryFn: () => {
      // Check if paramsId is provided
      if (paramsId) {
        // Call getData with paramsId
        return getData(paramsId);
      }
      // If paramsId is not provided, return a resolved promise with an empty array
      return Promise.resolve([]);
    },
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

  // clerk find id
  const { user } = useUser();

  const [loading, setLoading] = useState(true);

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
    const data = new FormData();
    data.append("file", file!);
    data.append("upload_preset", "character-verse");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dn2ep2prg/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const resData = await res.json();
      const imageUrl = resData.url; // Extract URL from the response

      return imageUrl;
    } catch (error) {
      // Handle error uploading image
      throw error;
    }
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
      setFlaw({ title: "", color: "" });
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
      setTrait({ title: "", color: "" }); // Reset the trait state
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
  };

  const handleChangeFlaw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFlawsError(false);

    setFlaw((prev: any) => {
      return { ...prev, [e.target.name]: e.target.value, color: "red-500" }; // target name is a dynamic key used in order to access the input's data
    });
  };

  const deleteTrait = (trait: { title: string; color: string }) => {
    if (!isReadOnly) {
      setTraits((prevTraits) =>
        prevTraits.filter((t) => t.title !== trait.title)
      );
    }
  };

  const deleteFlaw = (flaw: { title: string; color: string }) => {
    if (!isReadOnly) {
      setFlaws((prevFlaws) => prevFlaws.filter((f) => f.title !== flaw.title));
    }
  };

  // double click for mobile devices
  const [isTraitClicked, setIsTraitClicked] = useState(false);
  const deleteTraitMobile = (trait: { title: string; color: string }) => {
    if (isTraitClicked) {
      setTraits((prevTraits) =>
        prevTraits.filter((t) => t.title !== trait.title)
      );
    } else {
      setIsTraitClicked(true);
      setTimeout(() => setIsTraitClicked(false), 300);
    }
  };

  // double click for mobile devices
  const [isFlawClicked, setIsFlawClicked] = useState(false);
  const deleteFlawMobile = (flaw: { title: string; color: string }) => {
    if (isFlawClicked) {
      setFlaws((prevFlaws) => prevFlaws.filter((f) => f.title !== flaw.title));
    } else {
      setIsFlawClicked(true);
      setTimeout(() => setIsFlawClicked(false), 300);
    }
  };

  const keyDownTextarea = (e: any) => {
    const target = e.target as HTMLTextAreaElement; // Assert the type here

    if (e.key === "Enter" && e.shiftKey) {
      // Allow Shift+Enter to insert a newline
      e.stopPropagation(); // Prevent event from bubbling up
      e.preventDefault(); // Prevent the default behavior of Enter
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const textBefore = target.value.substring(0, start);
      const textAfter = target.value.substring(end, target.value.length);
      target.value = textBefore + "\n" + textAfter;
      target.selectionStart = target.selectionEnd = start + 1; // Move cursor to the new position
    } else if (e.key === "Enter") {
      // Prevent Enter from submitting the form
      e.preventDefault();
    }
  };

  const handleVoiceChange = (selectedValue: string) => {
    setdndCharSheetInputs((prev) => ({
      ...prev,
      voice: selectedValue,
    }));
  };

  const handleDeityChange = (selectedValue: string) => {
    setdndCharSheetInputs((prev) => ({
      ...prev,
      deity: selectedValue,
    }));
  };

  const handleBackgroundColorClick = (selectedColor: string) => {
    setSelectedColor(selectedColor);
    setdndCharSheetInputs((prev) => ({
      ...prev,
      backgroundColor: selectedColor,
    }));
  };

  const radioItems = [
    {
      value: "red",
      id: "r1",
      bgColor: "bg-red-500",
      onClick: () => handleBackgroundColorClick("red-500"),
    },
    {
      value: "blue",
      id: "r2",
      bgColor: "bg-blue-500",
      onClick: () => handleBackgroundColorClick("blue-500"),
    },
    {
      value: "green",
      id: "r3",
      bgColor: "bg-green-500",
      onClick: () => handleBackgroundColorClick("green-500"),
    },
    {
      value: "yellow",
      id: "r4",
      bgColor: "bg-yellow-500",
      onClick: () => handleBackgroundColorClick("yellow-500"),
    },
    {
      value: "pink",
      id: "r5",
      bgColor: "bg-pink-500",
      onClick: () => handleBackgroundColorClick("pink-500"),
    },
    {
      value: "violet",
      id: "r6",
      bgColor: "bg-[#B546FF]",
      onClick: () => handleBackgroundColorClick("purple-500"),
    },
    {
      value: "neutral-900",
      id: "r7",
      bgColor: "bg-neutral-900",
      onClick: () => handleBackgroundColorClick("neutral-900"),
    },
  ];

  const [selectedColor, setSelectedColor] = useState("red-500");

  const [dndCharSheetInputs, setdndCharSheetInputs] =
    useState<dndCharSheetInputs>({
      authorId: "",
      authorEmail: "",
      characterName: "",
      gender: "",
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

  const [imageUrl, setImageUrl] = useState("/assets/default-char-picture.png");

  useEffect(() => {
    const fetchClerkUserInfo = async () => {
      if (user) {
        const userEmail = user?.primaryEmailAddress?.emailAddress;
        setdndCharSheetInputs((prev) => ({
          ...prev,
          authorId: user.id,
          authorEmail: userEmail!,
        }));
      }
    };

    fetchClerkUserInfo();
  }, [user]);

  const handleChangedndCharSheetInputs = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setdndCharSheetInputs((prev) => {
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
  };

  useEffect(() => {
    if (!paramsId) {
      // not provided? do nothing
      setLoading(false);
      return;
    }

    setLoading(true);

    const fetchData = async () => {
      try {
        const characterData = await getData(paramsId);
        setTraits(characterData.traits);
        setFlaws(characterData.flaws);
        setdndCharSheetInputs(characterData);
        setImageUrl(characterData.img);
        setSelectedColor(characterData.backgroundColor);
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [paramsId, getData]); // Add getData to the dependency array

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (traits.length < 2) {
      setTraitsError(true);
    }
    if (flaws.length < 1) {
      setFlawsError(true);
    }

    const result = CharacterValidator.safeParse(dndCharSheetInputs);

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
          let url;
          if (file) {
            url = await upload(); // Call upload function if a new file is provided
            setImageUrl(url);
          } else {
            url = imageUrl; // Use the existing imageUrl if no new file is provided
          }

          const res = await fetch(
            `https://archetyped.vercel.app/api/${submitPath}`,
            {
              method: method,
              body: JSON.stringify({
                ...dndCharSheetInputs,
                img: url,
                traits,
                flaws,
              }),
            }
          );

          const data = await res.json();

          if (method === "POST") {
            toast(
              `Character ${dndCharSheetInputs.characterName} created successfully!`
            );
          } else {
            toast(
              `Character ${dndCharSheetInputs.characterName} updated successfully!`
            );
          }

          router.push("/menu");
        } catch (err) {
          toast.error("Something went wrong. Please try again later.");
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

  return loading ? (
    <LoadingScreen />
  ) : (dndChars?.length + cocChars?.length ?? 0) > 5 && !paramsId ? (
    <NoSlotsPage />
  ) : (
    <main className="max-w-5xl md:py-36 lg:py-48 min-h-[100vh] mx-auto justify-center items-center">
      {!isReadOnly && (
        <RadioGroup
          defaultValue="red"
          className="flex flex-row pt-[6rem] pb-[1rem] pl-2 md:pl-0"
        >
          {radioItems.map((item) => (
            <RadioGroupItem
              key={item.id}
              value={item.value}
              id={item.id}
              className={`z-[10] border-transparent rounded-full ${item.bgColor} text-white`}
              onClick={item.onClick}
            />
          ))}
        </RadioGroup>
      )}

      <form
        action=""
        className={`relative flex flex-col w-screen md:w-full ${
          isReadOnly && "md:pt-0 pt-[8rem]"
        }`}
        onSubmit={handleSubmit}
      >
        <Image
          src="/assets/charsheetDecorations/dnd-logo.png"
          width={1000}
          height={1000}
          alt="call of cthulhu logo"
          className="w-[15rem] lg:w-[30rem] z-[0] h-max absolute opacity-50 top-[-8.5rem] right-0 lg:top-[-14rem] lg:right-[-8rem]"
        />
        <Image
          src="/assets/charsheetDecorations/dnd-symbol.png"
          width={1000}
          height={1000}
          alt="call of cthulhu logo"
          className="w-[20rem] lg:w-[30rem] lg:block hidden z-[0] h-max absolute opacity-50 bottom-[-10rem] left-[5rem] lg:bottom-[-14rem] lg:left-[-11rem]"
        />
        <section className="mx-auto z-[20] w-full rounded-2xl md:shadow-2xl  border-[1.5px] items-start justify-between flex flex-col md:flex-row">
          {/* Column 1 */}

          <div
            className={`w-full bg-${selectedColor} md:w-[45%] py-2 md:py-4 h-full p-4 flex flex-col rounded-t-xl md:rounded-tr-[0px] md:rounded-l-xl`}
          >
            <h1 className="text-white text-2xl font-bold">Appearance</h1>
            <div className="w-[15rem] overflow-hidden relative my-6 h-[15rem] mx-auto flex items-center justify-center rounded-full bg-cover">
              <div className="w-full h-full bg-neutral-900 relative group">
                {!isReadOnly && (
                  <p className="text-white absolute left-[24%] top-[47.5%] group-hover:block hidden font-semibold">
                    Upload an image...
                  </p>
                )}
                {file ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Character's picture"
                    className={`object-cover  ${
                      !isReadOnly &&
                      "group-hover:scale-105 group-hover:opacity-10"
                    } w-full h-full rounded-full duration-300 transition`}
                  />
                ) : (
                  <Image
                    src={
                      imageUrl ? imageUrl : "/assets/default-char-picture.png"
                    }
                    width={1250}
                    height={1250}
                    className={`object-cover ${
                      !isReadOnly &&
                      "group-hover:scale-105 group-hover:opacity-10"
                    }  w-full h-full rounded-full duration-300 transition `}
                    alt="Default Character's picture"
                  />
                )}
                {!isReadOnly && (
                  <input
                    type="file"
                    onChange={handleChangeImage}
                    className="bg-transparent absolute rounded-full top-0 left-0 w-full h-full text-white p-2 opacity-[0%] cursor-pointer"
                  />
                )}
              </div>
            </div>
            <input
              type="text"
              className={`input-minimalistic mb-2 overflow-x-auto text-center text-lg font-bold ${
                validationErrors.characterName
                  ? "error-border rounded-full"
                  : ""
              }`}
              readOnly={isReadOnly}
              placeholder="Character's Name"
              name="characterName"
              onChange={handleChangedndCharSheetInputs}
              value={dndCharSheetInputs?.characterName}
              onKeyDown={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
              maxLength={80}
            />
            {validationErrors.characterName && (
              <p className="absolute top-0 left-0 transform -translate-y-full text-sm text-red-500">
                {validationErrors.characterName}
              </p>
            )}
            <hr />
            <div className="px-3 md:px-2 flex flex-row w-full h-max">
              <div className="flex flex-row items-center justify-around  w-full my-3">
                <div className="flex flex-col text-md w-full mx-auto items-center">
                  <div className="flex flex-row justify-between mb-2 w-full">
                    <div className="flex flex-col gap-1 w-1/3 items-center">
                      <h4 className="font-semibold  text-white">Height</h4>
                      <input
                        type="text"
                        className={`input-minimalistic  text-center text-md w-2/3 md:3/4 ${
                          validationErrors.height
                            ? "error-border rounded-full"
                            : ""
                        }`}
                        placeholder="123 cm"
                        onChange={handleChangedndCharSheetInputs}
                        name="height"
                        value={dndCharSheetInputs?.height}
                        onKeyDown={(e) => {
                          e.key === "Enter" && e.preventDefault();
                        }}
                        maxLength={15}
                      />
                    </div>
                    <div className="flex flex-col gap-1 w-1/3 items-center">
                      <h4 className="font-semibold  text-white">Weight</h4>
                      <input
                        type="text"
                        className={`input-minimalistic  text-center text-md w-2/3 md:3/4 ${
                          validationErrors.weight
                            ? "error-border rounded-full"
                            : ""
                        }`}
                        placeholder="123 kg"
                        onChange={handleChangedndCharSheetInputs}
                        name="weight"
                        value={dndCharSheetInputs?.weight}
                        onKeyDown={(e) => {
                          e.key === "Enter" && e.preventDefault();
                        }}
                        maxLength={15}
                        readOnly={isReadOnly}
                      />
                    </div>
                    <div className="flex flex-col gap-1 w-1/3 items-center">
                      <h4 className="font-semibold  text-white">Age</h4>
                      <input
                        type="text"
                        className={`input-minimalistic  text-center text-md w-2/3 md:3/4 ${
                          validationErrors.age
                            ? "error-border rounded-full"
                            : ""
                        }`}
                        placeholder="123 y.o."
                        onChange={handleChangedndCharSheetInputs}
                        name="age"
                        value={dndCharSheetInputs?.age}
                        onKeyDown={(e) => {
                          e.key === "Enter" && e.preventDefault();
                        }}
                        maxLength={15}
                        readOnly={isReadOnly}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row px-12 md:px-6 space-x-2 justify-around w-full">
                    <div className="flex flex-col items-center gap-2">
                      <h4 className="font-semibold text-white text-center">
                        Gender
                      </h4>
                      <input
                        type="text"
                        className={`input-minimalistic text-center text-md w-full md:3/4 ${
                          validationErrors.gender
                            ? "error-border rounded-full"
                            : ""
                        }`}
                        placeholder="Identity"
                        onChange={handleChangedndCharSheetInputs}
                        name="gender"
                        value={dndCharSheetInputs?.gender}
                        onKeyDown={(e) => {
                          e.key === "Enter" && e.preventDefault();
                        }}
                        maxLength={15}
                        readOnly={isReadOnly}
                      />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <h4 className="font-semibold  text-white">Race</h4>
                      <input
                        type="text"
                        className={`input-minimalistic overflow-x-auto  text-center text-md w-full md:3/4 ${
                          validationErrors.race
                            ? "error-border rounded-full"
                            : ""
                        }`}
                        placeholder="Human"
                        onChange={handleChangedndCharSheetInputs}
                        name="race"
                        value={dndCharSheetInputs?.race}
                        onKeyDown={(e) => {
                          e.key === "Enter" && e.preventDefault();
                        }}
                        maxLength={80}
                        readOnly={isReadOnly}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="flex flex-col relative w-full h-full justify-around items-start">
              <h1 className="text-start font-bold py-3 ml-2 text-white">
                Description:
              </h1>
              <textarea
                placeholder="Blond hair, red eyes..."
                className="input-minimalistic ml-2 mb-6 w-[92%] h-[15.5rem] md:h-[39.5rem] md:w-[95%]"
                name="description"
                onChange={handleChangedndCharSheetInputs}
                value={dndCharSheetInputs?.description}
                id=""
                cols={20}
                style={{ resize: "none" }}
                onKeyDown={keyDownTextarea}
                maxLength={1000}
                readOnly={isReadOnly}
              />
              <p
                className={`absolute bg-white rounded-full px-4 py-0.5 bottom-[-0.3rem] md:bottom-[-0.6rem] text-sm left-2 ${
                  dndCharSheetInputs?.description?.length > 300
                    ? "block"
                    : "hidden"
                } ${
                  dndCharSheetInputs?.description?.length > 900
                    ? "text-red-500"
                    : "text-neutral-900"
                }`}
              >
                {dndCharSheetInputs?.description?.length}/1000
              </p>
            </div>
          </div>

          <div className="flex flex-col w-full h-full">
            <div className="flex md:flex-row flex-col w-full h-full">
              {/* Column 2 */}
              <div
                className={`w-full md:w-1/2 justify-start bg-white py-2 md:py-4 h-full ${
                  isMobile && "pl-1 pr-[0.60rem]"
                } p-4 flex flex-col md:mt-0 mt-[1.5rem]`}
              >
                <h1 className="text-neutral-900 text-2xl font-bold">
                  Personality
                </h1>
                <div className="flex flex-col gap-[0.125rem] md:gap-2 py-2">
                  <div className="flex flex-row gap-2">
                    <Label htmlFor="header" className="text-neutral-900 ">
                      ⚛️ Character's Concept*
                    </Label>
                    <ToolTip content={Tips.CharacterConcept} />
                  </div>

                  <Input
                    type="text"
                    placeholder="Blind Archer"
                    className={`rounded-full border-gray-400  focus:outline-none ${
                      validationErrors.concept
                        ? "error-border rounded-full"
                        : ""
                    }`}
                    value={dndCharSheetInputs?.concept}
                    onChange={handleChangedndCharSheetInputs}
                    name="concept"
                    onKeyDown={(e) => {
                      e.key === "Enter" && e.preventDefault();
                    }}
                    maxLength={120}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="flex flex-col gap-[0.125rem] md:gap-2 py-2">
                  <div className="flex flex-row gap-2">
                    <Label htmlFor="header" className="text-neutral-900 ">
                      🎭 Traits*
                    </Label>
                    <ToolTip content={Tips.Traits} />
                  </div>

                  <div className="flex flex-row  mb-1 md:mb-0 overflow-x-auto md:max-w-[19.75rem] gap-2">
                    {" "}
                    {/* TODO: fix scroll and make a custom badge*/}
                    {traits.length > 0 ? (
                      traits.map((tr) => (
                        <div
                          key={tr.title}
                          className={` rounded-full relative group duration-300 transition ${
                            !isReadOnly && "hover:bg-neutral-900"
                          } bg-${
                            tr.color
                          } px-2.5 py-[0.20rem] font-semibold transition-colors flex items-center justify-center w-max text-white text-[0.80rem]`}
                          aria-label="badge text"
                          onClick={
                            isMobile
                              ? () => deleteTraitMobile(tr)
                              : () => deleteTrait(tr)
                          }
                        >
                          {!isReadOnly && (
                            <Image
                              src="/assets/delete-badge.svg"
                              width={20}
                              height={20}
                              alt="delete image"
                              className="absolute group-hover:inline-block hidden mx-auto max-w-full whitespace-nowrap"
                            />
                          )}

                          <span
                            className={` text-clip text-white inline-block mx-auto w-max whitespace-nowrap  ${
                              !isReadOnly && "group-hover:text-transparent"
                            }`}
                          >
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
                      className={`rounded-full border-gray-400 w-full pr-[2rem] focus:outline-none   ${
                        traitsError == true ? "error-border" : ""
                      }`}
                      onChange={handleChangeTrait}
                      onKeyDown={(e) => {
                        e.key === "Enter" && e.preventDefault();
                        e.key === "Enter" && handleTraitsClick();
                      }}
                      readOnly={isReadOnly}
                      maxLength={120}
                      value={trait.title}
                    />
                    {!isReadOnly && (
                      <button
                        type="button"
                        className="absolute right-[2%] top-[12%] text-white hover:bg-neutral-700 bg-neutral-900 w-6 h-6 text-center rounded-full font-bold"
                        onClick={handleTraitsClick}
                      >
                        <Image
                          alt="plus image"
                          src="/assets/plus-input.svg"
                          width={15}
                          height={15}
                          className="mx-auto my-auto"
                        />
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-[0.125rem] md:gap-2 py-2">
                  <div className="flex flex-row gap-2">
                    <Label htmlFor="header" className="text-neutral-900 ">
                      🌩️ Flaws*
                    </Label>
                    <ToolTip content={Tips.Flaws} />
                  </div>

                  <div className="flex mb-1 md:mb-0 flex-shrink-0 flex-row  overflow-x-auto md:max-w-[19.75rem] gap-2">
                    {" "}
                    {/* TODO: fix scroll */}
                    {flaws.length > 0 ? (
                      flaws.map((fl) => (
                        <div
                          key={fl.title}
                          className={`${
                            !isReadOnly && "hover:bg-neutral-900"
                          } rounded-full relative  group duration-300 transition  bg-red-500 px-2.5 py-[0.20rem] font-semibold flex items-center justify-center w-max text-white text-[0.80rem]`}
                          aria-label="badge text"
                          onClick={
                            isMobile
                              ? () => deleteFlawMobile(fl)
                              : () => deleteFlaw(fl)
                          }
                        >
                          {!isReadOnly && (
                            <Image
                              src="/assets/delete-badge.svg"
                              width={20}
                              height={20}
                              alt="delete image"
                              className="absolute group-hover:inline-block hidden mx-auto max-w-full whitespace-nowrap"
                            />
                          )}

                          <span
                            className={` text-clip text-white inline-block mx-auto w-max whitespace-nowrap  ${
                              !isReadOnly && "group-hover:text-transparent"
                            }`}
                          >
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
                      className={`rounded-full border-gray-400 w-full pr-[2rem] focus:outline-none  ${
                        flawsError == true ? "error-border" : ""
                      }`}
                      onChange={handleChangeFlaw}
                      onKeyDown={(e) => {
                        e.key === "Enter" && e.preventDefault();
                        e.key === "Enter" && handleFlawsClick();
                      }}
                      readOnly={isReadOnly}
                      maxLength={120}
                      value={flaw.title}
                    />
                    {!isReadOnly && (
                      <button
                        type="button"
                        className="absolute right-[2%] top-[12%] text-white hover:bg-neutral-700 bg-neutral-900 w-6 h-6 text-center rounded-full font-bold"
                        onClick={handleFlawsClick}
                      >
                        <Image
                          alt="plus image"
                          src="/assets/plus-input.svg"
                          width={15}
                          height={15}
                          className="mx-auto my-auto"
                        />
                      </button>
                    )}
                  </div>
                  <div className="flex flex-row w-full gap-2 overflow-x-auto">
                    <div className="flex flex-col gap-[0.125rem] md:gap-2 py-2 text-neutral-900">
                      <div className="flex flex-row gap-2">
                        <Label htmlFor="header" className="text-neutral-900 ">
                          🔔 Voice*
                        </Label>
                        <ToolTip content={Tips.Voice} />
                      </div>

                      <Combobox
                        options={characterVoices}
                        onSelect={handleVoiceChange}
                        errorValue={validationErrors.voice}
                        defaultValue={
                          dndCharSheetInputs.voice == ""
                            ? "Choose..."
                            : dndCharSheetInputs.voice
                        }
                        isClickable={isReadOnly ? false : true}
                      />
                    </div>
                    <div className="flex flex-col gap-[0.125rem] md:gap-2 py-2 text-neutral-900">
                      <div className="flex flex-row gap-2">
                        <Label htmlFor="header" className="text-neutral-900 ">
                          🕌 Deity*
                        </Label>
                        <ToolTip content={Tips.Deity} />
                      </div>

                      <Combobox
                        options={faerunGods}
                        onSelect={handleDeityChange}
                        errorValue={validationErrors.deity}
                        defaultValue={
                          dndCharSheetInputs.deity == ""
                            ? "Choose..."
                            : dndCharSheetInputs.deity
                        }
                        isClickable={isReadOnly ? false : true}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[0.125rem] md:gap-2 pb-2">
                    <div className="flex flex-row gap-2">
                      <Label htmlFor="header" className="text-neutral-900 ">
                        🉐 Catchphrase
                      </Label>
                      <ToolTip content={Tips.CatchPhrase} />
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
                      onChange={handleChangedndCharSheetInputs}
                      value={dndCharSheetInputs?.catchphrase}
                      onKeyDown={(e) => {
                        e.key === "Enter" && e.preventDefault();
                      }}
                      maxLength={120}
                      readOnly={isReadOnly}
                    />
                  </div>
                  <div className="flex flex-col gap-[0.125rem] md:gap-2 pb-2">
                    <div className="flex flex-row gap-2">
                      <Label htmlFor="header" className="text-neutral-900 ">
                        ✨ Habit/Quirk
                      </Label>
                      <ToolTip content={Tips.HabitsQuirks} />
                    </div>

                    <Input
                      type="text"
                      placeholder="Really hates not knowing things"
                      className={`rounded-full border-gray-400  focus:outline-none  ${
                        validationErrors.habitsquirks
                          ? "error-border rounded-full"
                          : ""
                      }`}
                      value={dndCharSheetInputs?.habitsquirks}
                      name="habitsquirks"
                      onChange={handleChangedndCharSheetInputs}
                      onKeyDown={(e) => {
                        e.key === "Enter" && e.preventDefault();
                      }}
                      maxLength={120}
                      readOnly={isReadOnly}
                    />
                  </div>
                  <div className="flex flex-col gap-[0.125rem] md:gap-2">
                    <div className="flex flex-row gap-2">
                      <Label htmlFor="header" className="text-neutral-900 ">
                        👺 Fears & Phobias*
                      </Label>
                      <ToolTip content={Tips.Fears} />
                    </div>

                    <Input
                      type="text"
                      placeholder="Fear of being touched"
                      className={`rounded-full border-gray-400  focus:outline-none ${
                        validationErrors.fears
                          ? "error-border rounded-full"
                          : ""
                      }`}
                      value={dndCharSheetInputs?.fears}
                      name="fears"
                      onChange={handleChangedndCharSheetInputs}
                      onKeyDown={(e) => {
                        e.key === "Enter" && e.preventDefault();
                      }}
                      maxLength={120}
                      readOnly={isReadOnly}
                    />
                  </div>
                  <div className="flex flex-col gap-[0.125rem] md:gap-2 pt-2">
                    <div className="flex flex-row gap-2">
                      <Label htmlFor="header" className="text-neutral-900 ">
                        🎇 Ideal
                      </Label>
                      <ToolTip content={Tips.Ideal} />
                    </div>

                    <Input
                      type="text"
                      placeholder="Honor. I never steal or play dirty"
                      className={`rounded-full border-gray-400  focus:outline-none  ${
                        validationErrors.ideal
                          ? "error-border rounded-full"
                          : ""
                      }`}
                      name="ideal"
                      onChange={handleChangedndCharSheetInputs}
                      onKeyDown={(e) => {
                        e.key === "Enter" && e.preventDefault();
                      }}
                      maxLength={120}
                      readOnly={isReadOnly}
                    />
                  </div>
                  <div className="flex flex-col gap-[0.125rem] md:gap-2 pt-2">
                    <div className="flex flex-row gap-2">
                      <Label htmlFor="header" className="text-neutral-900 ">
                        🤫 Secret
                      </Label>
                      <ToolTip content={Tips.Secret} />
                    </div>

                    <Input
                      type="text"
                      placeholder="Had an affair with a minor character"
                      className="rounded-full border-gray-400  focus:outline-none"
                      name="secret"
                      onChange={handleChangedndCharSheetInputs}
                      onKeyDown={(e) => {
                        e.key === "Enter" && e.preventDefault();
                      }}
                      maxLength={120}
                      readOnly={isReadOnly}
                    />
                  </div>
                </div>
              </div>

              {/* Column 3 */}
              <div
                className={`w-full md:w-1/2 ${
                  isMobile && "pl-1 pr-[0.60rem]"
                }  bg-white py-2 md:py-4 h-full p-4 flex flex-col rounded-t-xl`}
              >
                <hr className="mb-[0.75rem] md:hidden block" />
                <h1 className="text-neutral-900 text-2xl font-bold">
                  Backstory
                </h1>
                <div className="flex flex-col pt-2">
                  <div className="flex flex-row gap-2">
                    <Label
                      htmlFor="header"
                      className="text-neutral-900 h-[24px] "
                    >
                      🏞️ Motherland*
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
                    value={dndCharSheetInputs?.motherland}
                    name="motherland"
                    onChange={handleChangedndCharSheetInputs}
                    onKeyDown={(e) => {
                      e.key === "Enter" && e.preventDefault();
                    }}
                    maxLength={120}
                    readOnly={isReadOnly}
                  />
                </div>

                <div className="flex flex-col gap-[0.125rem] md:gap-2 pt-2">
                  <div className="flex flex-row gap-2">
                    <Label
                      htmlFor="header"
                      className="text-neutral-900 h-[16px] "
                    >
                      ⚡ Conflict
                    </Label>
                    <ToolTip content={Tips.Conflict} />
                  </div>

                  <Input
                    type="text"
                    placeholder="Exposed spy hunted down by assassins"
                    className={`rounded-full border-gray-400  focus:outline-none ${
                      validationErrors.conflict
                        ? "error-border rounded-full"
                        : ""
                    }`}
                    value={dndCharSheetInputs?.conflict}
                    name="conflict"
                    onChange={handleChangedndCharSheetInputs}
                    onKeyDown={(e) => {
                      e.key === "Enter" && e.preventDefault();
                    }}
                    maxLength={120}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="flex relative flex-col gap-[0.125rem] md:gap-2 pt-2">
                  <div className="flex flex-row gap-2">
                    <Label
                      htmlFor="header"
                      className="text-neutral-900 h-[16px] "
                    >
                      🎞️ Background*
                    </Label>
                    <ToolTip content={Tips.Backstory} />
                  </div>

                  <Textarea
                    className={`rounded-[15px] border-[1px] h-[21.9rem] md:h-[22.5rem] px-3 py-2 border-gray-400  text-[12px] text-neutral-900 ${
                      validationErrors.backstory ? "error-border" : ""
                    }`}
                    value={dndCharSheetInputs?.backstory}
                    placeholder="Once, I was just a kid with a dream..."
                    style={{ resize: "none" }}
                    name="backstory"
                    onChange={handleChangedndCharSheetInputs}
                    onKeyDown={keyDownTextarea}
                    maxLength={4000}
                    readOnly={isReadOnly}
                  />
                  <p
                    className={`absolute bottom-[-0.6rem] text-xs right-0 ${
                      dndCharSheetInputs?.backstory?.length > 1000
                        ? "block"
                        : "hidden"
                    } ${
                      dndCharSheetInputs?.backstory?.length > 3700
                        ? "text-red-500"
                        : "text-neutral-900"
                    }`}
                  >
                    {dndCharSheetInputs?.backstory?.length}/4000
                  </p>
                </div>
                <div className="flex flex-col gap-[0.125rem] md:gap-2 pt-2">
                  <div className="flex flex-row gap-2">
                    <Label
                      htmlFor="header"
                      className="text-neutral-900 h-[16px] "
                    >
                      💫 My Goals & Motivations*
                    </Label>
                    <ToolTip content={Tips.GoalsMotivations} />
                  </div>

                  <Textarea
                    className={`rounded-[15px] border-[1px] px-3 py-2 border-gray-400  text-[12px] text-neutral-900 ${
                      validationErrors.motivation ? "error-border" : ""
                    }`}
                    value={dndCharSheetInputs?.motivation}
                    placeholder="Badly wants to be remembered"
                    style={{ resize: "none" }}
                    name="motivation"
                    onChange={handleChangedndCharSheetInputs}
                    onKeyDown={keyDownTextarea}
                    maxLength={200}
                    readOnly={isReadOnly}
                  />
                </div>

                <div className="flex flex-col gap-[0.125rem] md:gap-2 pt-2">
                  <div className="flex flex-row gap-2">
                    <Label
                      htmlFor="header"
                      className="text-neutral-900 h-[16px] "
                    >
                      🤝 Reason to join the team*
                    </Label>
                    <ToolTip content={Tips.Reason} />
                  </div>

                  <Input
                    type="text"
                    placeholder="Looking for accomplices"
                    className={`rounded-full border-gray-400  focus:outline-none ${
                      validationErrors.reasonToJoin
                        ? "error-border rounded-full"
                        : ""
                    }`}
                    value={dndCharSheetInputs?.reasonToJoin}
                    name="reasonToJoin"
                    onChange={handleChangedndCharSheetInputs}
                    onKeyDown={(e) => {
                      e.key === "Enter" && e.preventDefault();
                    }}
                    maxLength={120}
                    readOnly={isReadOnly}
                  />
                </div>
              </div>
            </div>
            <div
              className={`${
                isMobile && "pl-1 pr-[0.60rem]"
              } w-full  bg-white  h-full p-4 flex flex-col rounded-t-xl md:rounded-r-xl`}
            >
              <hr className="md:hidden block mb-[0.75rem]" />
              <h1 className="text-neutral-900 text-2xl pb-2 font-bold">
                Relationships
              </h1>
              <hr className="md:block hidden " />
              <div className="flex flex-col md:flex-row items-center md:gap-8 justify-between">
                <div className="flex flex-col py-2 w-full md:w-1/2">
                  <div className="flex relative flex-col gap-[0.125rem] md:gap-2 pt-2">
                    <Label
                      htmlFor="header"
                      className="text-neutral-900 h-[24px] "
                    >
                      👨‍👩‍👧‍👦 Family
                    </Label>

                    <Textarea
                      className={`rounded-[15px] h-[8rem] border-[1px] px-3 py-2 border-gray-400  text-[12px] text-neutral-900`}
                      value={dndCharSheetInputs?.family}
                      placeholder="A nice family, the character loves their mom and dad"
                      style={{ resize: "none" }}
                      name="family"
                      onChange={handleChangedndCharSheetInputs}
                      onKeyDown={keyDownTextarea}
                      maxLength={1000}
                      readOnly={isReadOnly}
                    />
                    <p
                      className={`absolute bottom-[-0.6rem] text-xs right-0 ${
                        dndCharSheetInputs?.family?.length > 150
                          ? "block"
                          : "hidden"
                      } ${
                        dndCharSheetInputs?.family?.length > 900
                          ? "text-red-500"
                          : "text-neutral-900"
                      }`}
                    >
                      {dndCharSheetInputs?.family?.length}/1000
                    </p>
                  </div>
                  <div className="flex flex-col relative gap-[0.125rem] md:gap-2 pt-2">
                    <Label
                      htmlFor="header"
                      className="text-neutral-900 h-[24px] "
                    >
                      🧑‍🤝‍🧑 NPCs
                    </Label>

                    <Textarea
                      className={`rounded-[15px] h-[8rem] border-[1px] px-3 py-2 border-gray-400  text-[12px] text-neutral-900`}
                      value={dndCharSheetInputs?.NPCs}
                      placeholder="A minor NPC from Neverwinter is my friend"
                      style={{ resize: "none" }}
                      name="NPCs"
                      onChange={handleChangedndCharSheetInputs}
                      onKeyDown={keyDownTextarea}
                      maxLength={1000}
                      readOnly={isReadOnly}
                    />
                    <p
                      className={`absolute bottom-[-0.6rem] text-xs right-0 ${
                        dndCharSheetInputs?.NPCs?.length > 150
                          ? "block"
                          : "hidden"
                      } ${
                        dndCharSheetInputs?.NPCs?.length > 900
                          ? "text-red-500"
                          : "text-neutral-900"
                      }`}
                    >
                      {dndCharSheetInputs?.NPCs?.length}/1000
                    </p>
                  </div>
                </div>
                <div className="flex flex-col py-2 w-full md:w-1/2">
                  <div className="flex relative flex-col gap-[0.125rem] md:gap-2 pt-2">
                    <Label
                      htmlFor="header"
                      className="text-neutral-900 h-[24px] "
                    >
                      👯 PCs
                    </Label>

                    <Textarea
                      className={`rounded-[15px] h-[8rem] border-[1px] px-3 py-2 border-gray-400  text-[12px] text-neutral-900`}
                      value={dndCharSheetInputs?.playerPCs}
                      placeholder="A halfling named John is a childhood friend of mine"
                      style={{ resize: "none" }}
                      name="playerPCs"
                      onChange={handleChangedndCharSheetInputs}
                      onKeyDown={keyDownTextarea}
                      maxLength={1000}
                      readOnly={isReadOnly}
                    />
                    <p
                      className={`absolute bottom-[-0.6rem] text-xs right-0 ${
                        dndCharSheetInputs?.playerPCs?.length > 150
                          ? "block"
                          : "hidden"
                      } ${
                        dndCharSheetInputs?.playerPCs?.length > 900
                          ? "text-red-500"
                          : "text-neutral-900"
                      }`}
                    >
                      {dndCharSheetInputs?.playerPCs?.length}/1000
                    </p>
                  </div>
                  <div className="flex flex-col relative gap-[0.125rem] md:gap-2 pt-2">
                    <Label
                      htmlFor="header"
                      className="text-neutral-900 h-[24px] "
                    >
                      🚩 Organisations
                    </Label>

                    <Textarea
                      className={`rounded-[15px] h-[8rem] border-[1px] px-3 py-2 border-gray-400  text-[12px] text-neutral-900`}
                      value={dndCharSheetInputs?.organisations}
                      placeholder="A member of Emerald Enclave"
                      style={{ resize: "none" }}
                      name="organisations"
                      onChange={handleChangedndCharSheetInputs}
                      onKeyDown={keyDownTextarea}
                      maxLength={1000}
                      readOnly={isReadOnly}
                    />
                    <p
                      className={`absolute bottom-[-0.6rem] text-xs right-0 ${
                        dndCharSheetInputs?.organisations?.length > 150
                          ? "block"
                          : "hidden"
                      } ${
                        dndCharSheetInputs?.organisations?.length > 900
                          ? "text-red-500"
                          : "text-neutral-900"
                      }`}
                    >
                      {dndCharSheetInputs?.organisations?.length}/1000
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {isReadOnly ? (
          <CharSheetButtons
            charId={paramsId}
            charEditPath="edit"
            charPath="dnd-character"
          />
        ) : (
          <BackSubmit />
        )}
      </form>
    </main>
  );
};

export default DndCharSheet;
