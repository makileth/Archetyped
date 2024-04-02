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

  const mechanicalRef = useRef(null);
  const DaydreamingRef = useRef(null);
  const flawsRef = useRef(null);
  const backstoryRef = useRef(null);
  const whykeepcompanyRef = useRef(null);
  const roomtogrowRef = useRef(null);
  const EvolutionRef = useRef(null);

  const scrollToSection = (ref: any) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  // trigger in view function for each unique ref
  const mechanicalInView = useIntersectionObserver(mechanicalRef);
  const DaydreamingInView = useIntersectionObserver(DaydreamingRef);
  const flawsInView = useIntersectionObserver(flawsRef);
  const backstoryInView = useIntersectionObserver(backstoryRef);
  const whykeepcompanyInView = useIntersectionObserver(whykeepcompanyRef);
  const roomtogrowInView = useIntersectionObserver(roomtogrowRef);
  const EvolutionInView = useIntersectionObserver(EvolutionRef);

  const Links = [
    {
      inViewFunction: mechanicalInView,
      ref: mechanicalRef,
      text: "Mechanical space",
    },
    {
      inViewFunction: DaydreamingInView,
      ref: DaydreamingRef,
      text: "Daydreaming",
    },
    {
      inViewFunction: EvolutionInView,
      ref: EvolutionRef,
      text: "Evolutions",
    },
  ];

  // effect hooks to check whether the user observes a specific section

  return (
    <main className="overflow-x-hidden min-h-[100vh]">
      {/* Navigation through the headers */}
      <nav className="md:block hidden w-[6.5rem] max-w-[6rem] fixed right-0 bg-transparent top-20 items-start min-h-[100vh] justify-between">
        <h4 className="text-neutral-700 text-xs">On this page</h4>
        <h2 className="text-neutral-900 text-md font-bold py-2">
          Come up with character ideas easily
        </h2>
        <ul className="flex gap-2 flex-col">
          {Links.map((item: any) => (
            <li>
              <div
                className={`text-neutral-700 hover:text-neutral-900 max-w-[6rem] duration-300 transition w-max  line-clamp-2 cursor-pointer text-sm ${
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
            <SectionLabel labelText="Character Creation" darkmode={false} />
            <div className="my-1.5">
              <span className=" rounded-2xl text-xs font-medium bg-primary-100 text-primary-800 py-1.5 px-3 dark:bg-gray-900">
                7 min. read
              </span>
            </div>

            <h1 className="mb-4 text-4xl capitalize font-extrabold text-neutral-950 leading-[3rem] md:text-5xl md:leading-[4rem] dark:text-white">
              Come up with character ideas easily. This is how.
            </h1>
            <p className=" leading-6 mb-4 font-light text-neutral-700 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Sometimes you're just out of ideas. Or don't know what to do.
              Breathing life into a memorable character can be hard.
            </p>
            <p className="leading-8 mb-4 font-light text-neutral-700 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              I am about to share the secret with you on how to shape your ideas
              better and implement them into reality faster.
            </p>
            <Image
              src="/assets/academyCovers/ideas.jpg"
              width={1250}
              height={1250}
              alt="interesting roleplay image"
              className="mt-6 max-h-[25rem] md:max-h-[30rem] object-cover rounded-2xl"
            />
          </div>
          <div className="py-12 max-w-[85%]">
            <h2
              className="text-neutral-900 font-bold text-2xl md:text-3xl py-6"
              ref={mechanicalRef}
            >
              Begin by identifying basic mechanical space for the character
            </h2>
            <div className="flex flex-col leading-6 gap-6">
              <p className="text-gray-700">
                if you’re ttrpg player, think of who would you like to play as.
                As a writer or GM, outline how this character will influence and
                propel the narrative (essentially: what is their purpose in this
                story? Why do they exist?).
              </p>
              <p className="text-gray-700">
                Don't be afraid to blend different, sometimes even contradictory
                archetypes, like a... cleric / warlock multiclass? This way
                you'll construct a unique foundation.
              </p>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1585166059782-f28143545183?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width={1250}
              height={1250}
              alt="exploration image"
              className="mt-6 max-h-[20rem] object-cover rounded-2xl"
            />
          </div>

          <div className="py-12 max-w-[85%]">
            <h2
              className="text-neutral-900 font-bold text-2xl md:text-3xl py-6"
              ref={DaydreamingRef}
            >
              Daydreaming plays a huge role in creating process
            </h2>
            <div className="flex flex-col leading-6 gap-6">
              <p className="text-gray-700">
                Yeah, for real. Usually ideas come to you randomly. Let your
                imagination roam freely. Go for an immersive walk or run while
                listening to music fitting your character's theme to spark
                flashes of inspiration. Allow ideas to surface organically
                without restraint before reining them in later.
              </p>
              <p className="text-gray-700">
                Think of the setting of your story. Make sure to craft concepts
                that fit the campaign setting & lore well. The more the
                character is connected to the story and the world (especially
                their concept & goals) the better. It will make them much more
                relevant, which means that there will be more opportunities for
                the character development.
              </p>
              <p className="text-gray-700">
                Next step: go back to the character concept. Compose 2-4 concise
                sentences outlining their formative past - just enough to
                provide context while leaving room for evolution based on
                in-game events. Maybe your rift-linked drow was orphaned during
                a demonic incursion, gaining powers from a dark benefactor. Also
                at this stage you can think of some traits & flaws. What was
                your character like? How do they behave themselves?
              </p>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width={1250}
              height={1250}
              alt="Daydreaming image"
              className="mt-6 max-h-[20rem] object-cover rounded-2xl"
            />
          </div>

          <div className="py-12 max-w-[85%]">
            <h2
              className="text-neutral-900 font-bold text-2xl md:text-3xl py-6"
              ref={EvolutionRef}
            >
              Embrace Evolution
            </h2>
            <div className="flex flex-col leading-6 gap-6">
              <p className="text-gray-700">
                Remember that your new character is just a skeleton Even with
                all that preparation, view this as just your character's
                starting point, not their full predetermined arc. The most
                memorable personas respond dynamically to the twists and turns
                of the living narrative. Remain flexible to capitalize on
                organic opportunities for impactful growth that neither you nor
                your fellow players could have initially predicted.
              </p>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1535231540604-72e8fbaf8cdb?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width={1250}
              height={1250}
              alt="Evolution image"
              className="mt-6 max-h-[20rem] object-cover rounded-2xl"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
