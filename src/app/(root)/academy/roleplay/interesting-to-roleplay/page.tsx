"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SectionLabel from "../../../../../../components/ui/SectionLabel";
import Image from "next/image";
import { boolean, string } from "zod";

const page = () => {
  // checks if user looks at a specific header with a unique ref
  const useIntersectionObserver = (ref: any, threshold = 1) => {
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsIntersecting(entry.isIntersecting);
        },
        { threshold }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, [ref, threshold]);

    return isIntersecting;
  };

  const exploreRef = useRef(null);
  const likingRef = useRef(null);
  const flawsRef = useRef(null);
  const backstoryRef = useRef(null);
  const whykeepcompanyRef = useRef(null);
  const roomtogrowRef = useRef(null);
  const motivationRef = useRef(null);

  const scrollToSection = (ref: any) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  // trigger in view function for each unique ref
  const exploreInView = useIntersectionObserver(exploreRef);
  const likingInView = useIntersectionObserver(likingRef);
  const flawsInView = useIntersectionObserver(flawsRef);
  const backstoryInView = useIntersectionObserver(backstoryRef);
  const whykeepcompanyInView = useIntersectionObserver(whykeepcompanyRef);
  const roomtogrowInView = useIntersectionObserver(roomtogrowRef);
  const motivationInView = useIntersectionObserver(motivationRef);

  const Links = [
    {
      inViewFunction: exploreInView,
      ref: exploreRef,
      text: "Explore",
    },
    {
      inViewFunction: likingInView,
      ref: likingRef,
      text: "Liking",
    },
    {
      inViewFunction: motivationInView,
      ref: motivationRef,
      text: "Motivations",
    },
    {
      inViewFunction: whykeepcompanyInView,
      ref: whykeepcompanyRef,
      text: "Keeping company",
    },
    {
      inViewFunction: flawsInView,
      ref: flawsRef,
      text: "Flaws",
    },
    {
      inViewFunction: backstoryInView,
      ref: backstoryRef,
      text: "Backstory",
    },
    {
      inViewFunction: roomtogrowInView,
      ref: roomtogrowRef,
      text: "Room to grow",
    },
  ];

  // effect hooks to check whether the user observes a specific section

  return (
    <main className="overflow-x-hidden min-h-[100vh]">
      {/* Navigation through the headers */}
      <nav className="md:block hidden w-[6.5rem] fixed right-0 bg-transparent top-20 items-start min-h-[100vh] justify-between">
        <h4 className="text-neutral-700 text-xs">On this page</h4>
        <h2 className="text-neutral-900 text-md font-bold py-2">
          Make Your Roleplay Intersting
        </h2>
        <ul className="flex gap-2 flex-col">
          {Links.map((item: any) => (
            <li>
              <div
                className={`text-neutral-700 hover:text-neutral-900 duration-300 transition w-max max-w-[6rem] line-clamp-2 cursor-pointer text-sm ${
                  item.inViewFunction
                    ? "text-primary hover:text-primary-800"
                    : ""
                }`}
                onClick={() => scrollToSection(item.ref)}
              >
                {item.text}
              </div>
            </li>
          ))}
        </ul>
      </nav>
      {/* The page itself */}
      <section className=" flex flex-col items-start h-full mx-auto md:max-w-4xl">
        <div className="w-full md:w-[80%] ml-[2rem] md:ml-[8rem] mx-auto h-full">
          <div className="py-12 max-w-[85%]">
            <SectionLabel labelText="Roleplay" darkmode={false} />
            <h1 className="mb-4 text-4xl capitalize font-extrabold text-neutral-950 leading-[3rem] md:text-5xl md:leading-[4rem] dark:text-white">
              How to make personas that are actually interesting to roleplay as.
            </h1>
            <p className=" leading-6 mb-4 font-light text-neutral-700 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              How often do you see people make characters with no motivation
              besides getting shiny things, those who don’t feel bad for the
              character when they die? Or even better: making some juvenile
              psychopathic edgelord or some poorly constructed addict of carnal
              pleasure. Are you one of them? If yes, please - stop doing that.
            </p>
            <p className="leading-8 mb-4 font-light text-neutral-700 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              This guide is here to help you eradicate this issue.
            </p>
            <Image
              src="/assets/academyCovers/interesting-roleplay.jpg"
              width={1250}
              height={1250}
              alt="interesting roleplay image"
              className="mt-6 max-h-[25rem] md:max-h-[30rem] object-cover rounded-2xl"
            />
          </div>
          <div className="py-12 max-w-[85%]">
            <h2
              className="text-neutral-900 font-bold text-2xl md:text-3xl py-6"
              ref={exploreRef}
            >
              What do you want to explore with this character?
            </h2>
            <div className="flex flex-col leading-6 gap-6">
              <p className="text-gray-700">
                Whether a theme, concept, or personality, that’s great. Keep in
                mind to fit your character to the story though (talk to your
                dm).
              </p>
              <p className="text-gray-700">
                If all you can think of is “I just really like playing rogues”,
                then ask yourself: WHY do you even like playing rogues? Make
                your answer the character’s answer, and build from there.
              </p>
              <p className="text-gray-700">
                Trust me, everyone would genuinely enjoy role playing alongside
                a character who decided to worship Pelor just so he could heal
                people better.
              </p>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1483356256511-b48749959172?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width={1250}
              height={1250}
              alt="exploration image"
              className="mt-6 max-h-[20rem] object-cover rounded-2xl"
            />
          </div>

          <div className="py-12 max-w-[85%]">
            <h2
              className="text-neutral-900 font-bold text-2xl md:text-3xl py-6"
              ref={likingRef}
            >
              Who does your character like? And who likes your character?
            </h2>
            <div className="flex flex-col leading-6 gap-6">
              <p className="text-gray-700">
                Name at least 3 people who your character likes and who like
                your character.
              </p>
              <p className="text-gray-700">
                Whether from their backstory, or other PCs (ask if the PC
                actually likes your PC before coming up with assumptions), make
                sure at least a few people think you’re generally tolerable.
                This is the best way to really create an enjoyable character, as
                you’ll have some relations to explore right from the start.
              </p>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1567845735143-5e5d9d3f8f81?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width={1250}
              height={1250}
              alt="liking image"
              className="mt-6 max-h-[20rem] object-cover rounded-2xl"
            />
          </div>

          <div className="py-12 max-w-[85%]">
            <h2
              className="text-neutral-900 font-bold text-2xl md:text-3xl py-6"
              ref={motivationRef}
            >
              What motivates your character to do what they do?
            </h2>
            <div className="flex flex-col leading-6 gap-6">
              <p className="text-gray-700">Do not say power or money.</p>
              <p className="text-gray-700">
                Think about it: very few people crave power just for power’s
                sake. If they do, they were probably raised to do so. That’s
                also pretty boring.
              </p>
              <p className="text-gray-700">
                The possesion of power in this case should mean something to
                your character. What is it for? Elaborate.
              </p>
              <p className="text-gray-700">
                Good & simple examples of motivations are redemption, protecting
                someone/something, pursuing knowledge etc.
              </p>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1505027492977-1037f14c46fa?q=80&w=1865&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width={1250}
              height={1250}
              alt="motivation image"
              className="mt-6 max-h-[20rem] object-cover rounded-2xl"
            />
          </div>
          <div className="py-12 max-w-[85%]">
            <h2
              className="text-neutral-900 font-bold text-2xl md:text-3xl py-6"
              ref={whykeepcompanyRef}
            >
              Why anyone keeps company with your character?
            </h2>
            <div className="flex flex-col leading-6 gap-6">
              <p className="text-gray-700">Listen: This is a team game.</p>
              <p className="text-gray-700">
                People really don’t like being stolen from constantly, harassed
                for no reason, etc. Now, it’s fine to make an unlivable
                character, but show how the party can actually make them a
                better person whenever possible.
              </p>
              <p className="text-gray-700">
                All people have a good side that is triggered in certain
                situations.
              </p>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width={1250}
              height={1250}
              alt="why keep company image"
              className="mt-6 max-h-[20rem] object-cover rounded-2xl"
            />
          </div>
          <div className="py-12 max-w-[85%]">
            <h2
              className="text-neutral-900 font-bold text-2xl md:text-3xl py-6"
              ref={flawsRef}
            >
              Give your character emotional and mental flaws.
            </h2>
            <div className="flex flex-col leading-6 gap-6">
              <p className="text-gray-700">
                Don’t leave the flaws at low stats. Make it mental.
              </p>
              <p className="text-gray-700">
                For example, a character with high intelligence could act like a
                fool due to how naive they are (Maybe they are a teen noble who
                spent almost half his life in wizard school who doesn’t know a
                lot about normal life).
              </p>
              <p className="text-gray-700">
                It’s the flaws that make a character fun to roleplay, as they
                eventually grow past their flaws with help from others.
              </p>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1557108934-b63920a94b38?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width={1250}
              height={1250}
              alt="flaws image"
              className="mt-6 max-h-[20rem] object-cover rounded-2xl"
            />
          </div>
          <div className="py-12 max-w-[85%]">
            <h2
              className="text-neutral-900 font-bold text-2xl md:text-3xl py-6"
              ref={backstoryRef}
            >
              A good backstory doesn’t mean a good character
            </h2>
            <div className="flex flex-col leading-6 gap-6">
              <p className="text-gray-700">
                Backstories, for as much attention as they get and for how much
                importance people place on them, really don't mean much for your
                roleplaying.
              </p>
              <p className="text-gray-700">
                Surely, they help ground your character in the world and may
                give them some talking points or potential RP interactions, even
                reasons why are they behaving themselves in a specific way
                (people are creatures who are often driven by their past) so
                they do matter to some extent, but what REALLY matters is how
                you play your character in the present. I often see people who
                show off their 20+ pages backstories (now often auto-generated
                with AI), but end up roleplaying plain boring characters.
              </p>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1516780236580-ef416334d5b4?q=80&w=1898&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width={1250}
              height={1250}
              alt="backstory image"
              className="mt-6 max-h-[20rem] object-cover rounded-2xl"
            />
          </div>
          <div className="py-12 max-w-[85%]">
            <h2
              className="text-neutral-900 font-bold text-2xl md:text-3xl py-6"
              ref={roomtogrowRef}
            >
              Give your characters room to grow. Write only their past, not
              their future.
            </h2>
            <div className="flex flex-col leading-6 gap-6">
              <p className="text-gray-700">
                Create a skeleton of your character's personality. And then make
                it grow.
              </p>
              <p className="text-gray-700">
                Few interesting characters begin or end their stories as the
                finished article. Perhaps your scheming rogue develops a moral
                code through exposure to selfless companions. Your standoffish
                barbarian could learn the importance of cooperation and
                strategy.
              </p>
              <p className="text-gray-700">
                By leaving room for your character to evolve based on their
                experiences, you'll ensure engaging story arcs rife with
                personal growth.
              </p>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1533601017-dc61895e03c0?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width={1250}
              height={1250}
              alt="room to grow image"
              className="mt-6 max-h-[20rem] object-cover rounded-2xl"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
