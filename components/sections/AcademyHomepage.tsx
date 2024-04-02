import React from "react";
import SectionLabel from "../ui/SectionLabel";
import ReactDOM from "react-dom";
import { useState } from "react";
import useMouse from "@react-hook/mouse-position";
import { motion, useTransform } from "framer-motion";
import Link from "next/link";
const Academy = () => {
  const characterTips = [
    {
      title: "Understand Your Character's Motivations",
      paragraph:
        "The key to creating compelling characters is understanding their motivations. What drives them? What do they want? Knowing this will make your characters feel real and relatable.",
      image: "https://source.unsplash.com/random/100x100?character1",
    },
    {
      title: "Develop a Backstory",
      paragraph:
        "A rich backstory can add depth to your characters. It helps readers understand why your character is the way they are. Consider their past experiences, family, and personal struggles.",
      image: "https://source.unsplash.com/random/100x100?character2",
    },
    {
      title: "Make Them Complex",
      paragraph:
        "Complex characters are more interesting than one-dimensional ones. They have flaws, strengths, and weaknesses. This complexity makes them more relatable and keeps readers engaged.",
      image: "https://source.unsplash.com/random/100x100?character3",
    },
  ];
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
      backgroundColor: "neutral-900",
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

  return (
    <div
      ref={ref}
      className="md:mx-10 mx-2 px-8 xl:px-4 my-24 overflow-hidden bg-neutral-900 rounded-2xl py-24 lg:my-56"
    >
      <motion.div
        variants={variants}
        className="circle"
        animate={cursorVariant}
        transition={spring}
      >
        <span className="cursorText">{cursorText}</span>
      </motion.div>
      <div className="max-w-[81.5rem] xl:pl-0 flex flex-col items-start mx-auto text-center mb-10 lg:mb-14">
        <SectionLabel labelText="Learning" darkmode={true} />
        <h2 className="text-4xl text-white font-bold md:text-5xl md:leading-tight dark:text-white">
          Academy
        </h2>
        <p className="mt-1 text-neutral-200 dark:text-gray-400">
          Stay in the know
        </p>
      </div>

      <div className="w-full lg:max-w-[81.5rem] mx-auto bg-neutral-800 rounded-2xl px-8 py-10 flex flex-row overflow-auto  ">
        {characterTips.map((tip, index) => (
          <Link
            className="w-max group project hover:cursor-none dark:focus:outline-none px-2"
            href="#"
            onMouseEnter={projectEnter}
            onMouseLeave={projectLeave}
          >
            <div className="relative w-[20rem] h-[25rem] md:h-[35rem] rounded-2xl overflow-hidden">
              <img
                className="size-full absolute top-0 start-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl"
                src={tip.image}
                alt={tip.title}
              />
              <span className="absolute top-0 end-0 rounded-se-xl rounded-es-xl text-xs font-medium bg-gray-800 text-white py-1.5 px-3 dark:bg-gray-900">
                Sponsored
              </span>
            </div>

            <div className="mt-3">
              <h3 className="text-xl font-semibold text-white">{tip.title}</h3>
              <p className="mt-1 font-[200] text-neutral-200 dark:text-gray-200">
                {tip.paragraph}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Academy;
