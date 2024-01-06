import Image from "next/image";
import Link from "next/link";

const CreateChar = () => {
  return (
    <Link href="/create" className="flex border-[2px] hover:shadow-2xl hover:shadow-primary duration-300  border-black w-[95%] mx-auto md:w-[48%] h-[32rem] rounded-2xl space-y-4 p-4 items-center justify-center transition-transform transform hover:scale-105 hover:drop-shadow-2xl  hover:bg-opacity-75 hover:bg-[url('/assets/character.jpg')] relative">
      <div className="w-full absolute bottom-0 rounded-b-2xl h-1/5 bg-black flex flex-col">
        <p className="font-bold text-3xl px-4 pt-4 pb-2">+ Create a Character</p>
        <p className="font-thin pl-4">Choose a template and start creating</p>
      </div>
    </Link>
  );
};

export default CreateChar;
