import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";
// Ensure templates is an array of objects
const templates = [
  {
    title: "D&D  5e",
    desc: "Dive into the fantasy world",
    img: "/assets/templateCards/dnd.webp",
    comingSoon: false,
    link: "/create-dnd-character",
  },
  {
    title: "Call of Cthulhu",
    desc: "Craft your next investigator to challenge the unknown",
    img: "/assets/templateCards/coc.jpg",
    comingSoon: false,
    link: "/create-coc-character",
  },
  {
    title: "Literature",
    desc: "Create exciting characters for your book",
    img: "/assets/templateCards/book.jpg",
    comingSoon: true,
    link: "/menu",
  },
];

export function ChooseTemplate({ page }: { page: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {page === "manage" ? (
          <div className="flex relative flex-row w-[97%] hover:shadow-around hover:shadow-primary transition duration-300 md:w-[49%] h-[10.5rem] shadow-lg border-[1px] border-neutral-200 rounded-[15px]">
            <div className="w-[5rem] relative mt-9 h-[5rem] ml-3 flex items-center justify-center rounded-full bg-cover">
              <Image
                src="/assets/newChar.svg"
                width={125}
                height={125}
                className="object-cover border-[1.5px] border-neutral-200 absolute left-[-0.5rem] md:left-[-0.65rem] top-[-1.8rem] md:top-[-2rem] scale-[1.3] md:scale-[1.4] w-[5rem] h-[5rem] rounded-full"
                alt="New Character's picture"
              />
            </div>
            <div className="flex flex-col w-3/4 justify-start items-start p-4 mt-4">
              <h1 className="text-neutral-900 font-bold text-2xl truncate max-w-[100%]">
                New Character
              </h1>
            </div>
          </div>
        ) : page === "topbar" ? (
          <div className="w-full group rounded-2xl bg-gradient-to-r from-transparent  to-primary p-[0.05rem]">
            <div className="w-full pl-4 h-full relative bg-white overflow-hidden rounded-2xl">
              <div className="rounded-full group-hover:block hidden absolute bg-gradient-to-r w-[125%] h-[125%] blur-2xl bottom-0 right-[5] opacity-50 from-transparent to-primary" />
              <div className="flex mt-4 mb-1.5 w-full items-center flex-row gap-2">
                <div className="flex justify-center items-center  rounded-lg bg-neutral-100 h-8 w-8 dark:bg-primary-900">
                  <Image
                    src="/assets/add.svg"
                    alt="feature icon"
                    width={18}
                    height={18}
                    className="object-fit "
                  />
                </div>
                <h3 className=" text-lg text-neutral-900 font-[200]">
                  New Character
                </h3>
              </div>
              <p className="text-gray-500 pb-4 text-sm max-w-[92.5%] dark:text-gray-400">
                Choose a template and start writing
              </p>
            </div>
          </div>
        ) : page === "menu" ? (
          <Button className="duration-300 transition w-full rounded-2xl hover:bg-primary hover:text-neutral-900 h-[2rem]">
            Start Creating
          </Button>
        ) : (
          <p>No page assigned</p>
        )}
      </DialogTrigger>

      <DialogContent className="max-6-xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-black font-bold text-2xl">
            Choose a Template
          </DialogTitle>

          <DialogClose className="absolute top-2.5 right-2.5" asChild>
            <button type="button">
              <Image
                src="/assets/close.svg"
                width={20}
                height={20}
                alt="close button"
                className="mx-auto my-auto outline-none"
              />
            </button>
          </DialogClose>
        </DialogHeader>

        <div className="flex flex-col md:flex-row py-4 px-6 rounded-2xl bg-neutral-200 items-center h-[30rem] justify-between space-x-2">
          {templates.map((temp) => (
            <DialogClose asChild>
              <Link
                href={temp.link}
                key={temp.title} // Unique key for each template
                className="md:w-1/3 w-full h-1/2 md:h-full relative gap-2 flex flex-col overflow-hidden transition duration-500"
              >
                <div className="w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    width={1000}
                    height={1000}
                    className="h-full w-full object-cover hover:scale-105 duration-300 transition"
                    src={temp.img}
                    alt="card image dnd"
                  />
                </div>
                <div className="h-max w-full flex flex-col gap-0.5 items-start  rounded-xl ">
                  <h1 className="font-bold text-xl text-neutral-900">
                    {temp.title}
                  </h1>
                  <p className="text-neutral-700 text-xs">{temp.desc}</p>
                </div>
              </Link>
            </DialogClose>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ChooseTemplate;
