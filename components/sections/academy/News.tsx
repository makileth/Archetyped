import React from "react";
import SectionLabel from "../../ui/SectionLabel";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import useMouse from "@react-hook/mouse-position";
import { motion, useTransform } from "framer-motion";
import Link from "next/link";
import {
  characterAcademyPosts,
  roleplayAcademyPosts,
  storytellingAcademyPosts,
} from "../../../constants";

const News = ({ mode }: { mode: string }) => {
  // State variables to manage cursor text and variant
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState("default");

  // Ref to access DOM element
  const ref = React.useRef(null);

  // Hook to track mouse position and state
  const mouse = useMouse(ref, {
    enterDelay: 100, // Delay before cursor enters
    leaveDelay: 100, // Delay before cursor leaves
  });

  // Initializing mouse position variables
  let mouseXPosition: number = 0;
  let mouseYPosition: number = 0;

  // Updating mouse position if available
  if (mouse.x !== null && typeof mouse.x === "number") {
    // Check for null and type
    mouseXPosition = mouse.clientX;
  }

  // Updating mouse position if available
  if (mouse.y !== null && typeof mouse.y === "number") {
    // Check for null and type
    mouseYPosition = mouse.clientY;
  }

  // Variants for different cursor states
  const variants = {
    default: {
      opacity: 1,
      height: 10,
      width: 10,
      fontSize: "16px",
      backgroundColor: "transparent",
      x: mouseXPosition,
      y: mouseYPosition,
      transition: {
        type: "spring", // Animation type
        mass: 0.6, // Mass of the spring
      },
    },
    project: {
      visibility: "visible",
      opacity: 1,
      backgroundColor: "black",
      color: "white",
      height: 100,
      width: 100,
      fontSize: "18px",
      x: mouseXPosition - 32,
      y: mouseYPosition - 32,
    },
  };

  // Spring configuration for cursor animation
  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 28,
  };

  // Functions to handle cursor changes on event
  function projectEnter(e: any) {
    setCursorText("View");
    setCursorVariant("project");
  }

  function projectLeave(e: any) {
    setCursorText("");
    setCursorVariant("default");
  }

  // Check if the screen size is desktop
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize(); // Check initial screen size

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${
        mode === "news" ? "py-6" : "py-24"
      } px-4 overflow-hidden rounded-2xl py-24 lg:my-36`}
    >
      {isDesktop && (
        <motion.div
          variants={variants}
          className="circle"
          animate={cursorVariant}
          transition={spring}
        >
          <span className="cursorText">{cursorText}</span>
        </motion.div>
      )}
      <div className="max-w-6xl pl-2 xl:pl-0 flex flex-col items-start mx-auto text-center mb-6">
        <SectionLabel labelText="Learning" darkmode={false} />
        <h2
          className={`text-4xl text-neutral-900 font-bold md:text-5xl md:leading-tight dark:text-white`}
        >
          {mode === "news" ? "News" : "Expand your skills"}
        </h2>
        <p className={`mt-1 text-neutral-700`}>
          {mode === "news"
            ? "Explore the newest publications"
            : "With the newest publications on Academy"}
        </p>
      </div>

      <div
        className={`w-full lg:max-w-6xl mx-auto ${
          mode === "news" ? "bg-neutral-100" : "bg-neutral-800"
        } rounded-2xl px-8 py-10 flex flex-row overflow-auto  `}
      >
        <Link
          className="w-max group project md:hover:cursor-none dark:focus:outline-none px-2"
          href={characterAcademyPosts[characterAcademyPosts.length - 1].link}
          onMouseEnter={projectEnter}
          onMouseLeave={projectLeave}
        >
          <div className="relative w-[22.5rem] h-[25rem] md:h-[35rem] rounded-2xl overflow-hidden">
            <img
              className="w-full h-full absolute top-0 start-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl"
              src={characterAcademyPosts[characterAcademyPosts.length - 1].img}
              alt={characterAcademyPosts[characterAcademyPosts.length - 1].alt}
            />
            <div className="absolute top-2 end-2 items-center flex flex-row gap-1">
              <span className=" rounded-2xl text-xs font-medium bg-primary-100 text-primary-800 py-1.5 px-3 dark:bg-gray-900">
                7 min. read
              </span>
              <span className="border-[1px]  bg-opacity-50 backdrop-blur-lg border-neutral-600 rounded-2xl text-xs font-medium bg-neutral-900 text-white py-1.5 px-3 dark:bg-gray-900">
                Characters
              </span>
            </div>
          </div>

          <div className="mt-3">
            <h3
              className={`text-xl max-w-[22.5rem] font-semibold ${
                mode === "news" ? "text-neutral-900" : "text-white"
              }`}
            >
              {characterAcademyPosts[characterAcademyPosts.length - 1].heading}
            </h3>
            <p
              className={`mt-1 font-[200] max-w-[22.5rem] ${
                mode === "news" ? "text-neutral-700" : "text-neutral-200"
              }`}
            >
              {
                characterAcademyPosts[characterAcademyPosts.length - 1]
                  .subheading
              }
            </p>
          </div>
        </Link>
        <Link
          className="w-max group project md:hover:cursor-none dark:focus:outline-none px-2"
          href={roleplayAcademyPosts[roleplayAcademyPosts.length - 1].link}
          onMouseEnter={projectEnter}
          onMouseLeave={projectLeave}
        >
          <div className="relative w-[22.5rem] h-[25rem] md:h-[35rem] rounded-2xl overflow-hidden">
            <img
              className="w-full h-full absolute top-0 start-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl"
              src={roleplayAcademyPosts[roleplayAcademyPosts.length - 1].img}
              alt={roleplayAcademyPosts[roleplayAcademyPosts.length - 1].alt}
            />
            <div className="absolute top-2 end-2 items-center flex flex-row gap-1">
              <span className=" rounded-2xl text-xs font-medium bg-primary-100 text-primary-800 py-1.5 px-3 dark:bg-gray-900">
                14 min. read
              </span>
              <span className="border-[1px]  bg-opacity-50 backdrop-blur-lg border-neutral-600 rounded-2xl text-xs font-medium bg-neutral-900 text-white py-1.5 px-3 dark:bg-gray-900">
                Roleplay
              </span>
            </div>
          </div>

          <div className="mt-3">
            <h3
              className={`text-xl max-w-[22.5rem] font-semibold ${
                mode === "news" ? "text-neutral-900" : "text-white"
              }`}
            >
              {roleplayAcademyPosts[roleplayAcademyPosts.length - 1].heading}
            </h3>
            <p
              className={`mt-1 font-[200] max-w-[22.5rem] ${
                mode === "news" ? "text-neutral-700" : "text-neutral-200"
              }`}
            >
              {roleplayAcademyPosts[roleplayAcademyPosts.length - 1].subheading}
            </p>
          </div>
        </Link>
        <Link
          className="w-max group project md:hover:cursor-none dark:focus:outline-none px-2"
          href={
            storytellingAcademyPosts[storytellingAcademyPosts.length - 1].link
          }
          onMouseEnter={projectEnter}
          onMouseLeave={projectLeave}
        >
          <div className="relative w-[22.5rem] h-[25rem] md:h-[35rem] rounded-2xl overflow-hidden">
            <img
              className="w-full h-full absolute top-0 start-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl"
              src={
                storytellingAcademyPosts[storytellingAcademyPosts.length - 1]
                  .img
              }
              alt={
                storytellingAcademyPosts[storytellingAcademyPosts.length - 1]
                  .alt
              }
            />
            <div className="absolute top-2 end-2 items-center flex flex-row gap-1">
              <span className=" rounded-2xl text-xs font-medium bg-primary-100 text-primary-800 py-1.5 px-3 dark:bg-gray-900">
                9 min. read
              </span>
              <span className="border-[1px]  bg-opacity-50 backdrop-blur-lg border-neutral-600 rounded-2xl text-xs font-medium bg-neutral-900 text-white py-1.5 px-3 dark:bg-gray-900">
                Storytelling
              </span>
            </div>
          </div>

          <div className="mt-3">
            <h3
              className={`text-xl max-w-[22.5rem] font-semibold ${
                mode === "news" ? "text-neutral-900" : "text-white"
              }`}
            >
              {
                storytellingAcademyPosts[storytellingAcademyPosts.length - 1]
                  .heading
              }
            </h3>
            <p
              className={`mt-1 font-[200] max-w-[22.5rem] ${
                mode === "news" ? "text-neutral-700" : "text-neutral-200"
              }`}
            >
              {
                storytellingAcademyPosts[storytellingAcademyPosts.length - 1]
                  .subheading
              }
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default News;
