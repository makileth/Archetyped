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

  const UnwrittenPastRef = useRef(null);
  const StepbystepbuildingRef = useRef(null);

  const scrollToSection = (ref: any) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  // trigger in view function for each unique ref
  const UnwrittenPastInView = useIntersectionObserver(UnwrittenPastRef);
  const StepbystepbuildingInView = useIntersectionObserver(
    StepbystepbuildingRef
  );

  const Links = [
    {
      inViewFunction: UnwrittenPastInView,
      ref: UnwrittenPastRef,
      text: "Unwritten Past",
    },
    {
      inViewFunction: StepbystepbuildingInView,
      ref: StepbystepbuildingRef,
      text: "Step-by-step building",
    },
  ];

  // effect hooks to check whether the user observes a specific section

  return (
    <main className="overflow-x-hidden min-h-[100vh]">
      {/* Navigation through the headers */}
      <nav className="md:block hidden w-[6.5rem] max-w-[6rem] fixed right-0 bg-transparent top-20 items-start min-h-[100vh] justify-between">
        <h4 className="text-neutral-700 text-xs">On this page</h4>
        <h2 className="text-neutral-900 text-md font-bold py-2">
          Backstory basics
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
            <h1 className="mb-4 text-4xl capitalize font-extrabold text-neutral-950 leading-[3rem] md:text-5xl md:leading-[4rem] dark:text-white">
              How to create a backstory? Learn the basics.
            </h1>
            <p className=" leading-6 mb-4 font-light text-neutral-700 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Do characters need a backstory? What it is and how it affects your
              fictional personas.
            </p>

            <Image
              src="/assets/academyCovers/backstory.jpg"
              width={1250}
              height={1250}
              alt="interesting roleplay image"
              className="mt-6 max-h-[25rem] md:max-h-[30rem] object-cover rounded-2xl"
            />
          </div>
          <div className="py-12 max-w-[85%]">
            <h2
              className="text-neutral-900 font-bold text-2xl md:text-3xl py-6"
              ref={UnwrittenPastRef}
            >
              The Beauty of an Unwritten Past
            </h2>
            <div className="flex flex-col leading-6 gap-6">
              <p className="text-gray-700">
                Before we jump into backstory-crafting, consider this: sometimes
                the most compelling characters don't need a meticulously mapped
                history at all. Think about Lightning McQueen from Cars - when
                we first meet the rookie racecar sensation, the announcers
                simply say "he came into this season practically unknown"...and
                that's it. No 10-page tragic origin or shocking plot twist that
                made him who he is today. Sometimes a character's mystique lies
                in their mysterious ambiguity.
              </p>
              <p className="text-gray-700">
                It's like meeting a new friend - you don't need their entire
                life history to pick up on their core personality, hopes, fears,
                and driving motivations. Those deep characterizations emerge
                gradually through shared experiences.
              </p>
              <p className="text-gray-700">
                Decide: Backstory first or backstory second.
              </p>
              <p className="text-gray-700">
                Most protagonists and a lot of antagonists are built backstory
                first just so that they have compelling motivation from the
                get-go. Secondary characters don't need it that much.
              </p>
              <p className="text-gray-700">
                On the other hand, backstory second is like baking a bread. Put
                it into the oven, and see what result comes after. In other
                words, play and watch. Let them enter the story. You can feel a
                character and what they desire, what their goals are, their
                fears, without having a backstory. Then—halfway through the
                story—it will dawn on you what might have happened to them in
                their past.
              </p>
              <p className="text-gray-700">
                The biggest risks of an overly complex personal history are A)
                making it harder to justify why this character with 50 pages of
                unresolved main problems and worries are still following the
                main narrative path, and B) coming up with heavy conflicts, like
                with serious entities (for example, an evil god) could bring
                problems to the whole party. If you do feel compelled to
                incorporate a truly atypical background, always align with your
                GM to ensure it contributes to an engaging experience for
                everyone.
              </p>
              <p className="text-gray-700">
                When developing your persona, avoid writing too much backstory
                from the start - this can "frontload" their arc and box you into
                a restricted narrative instead of allowing for dynamic evolution
                and growth. Apart from very broad strokes about their nature and
                motivations, leave the finer details delightfully blank until
                you gain inspiration from where the living story ends up taking
                them.
              </p>
              <p className="text-gray-700">
                The best characters, like real people, are molded gradually
                through shared experiences rather than predetermined entirely
                from their first appearance. Free yourself from the pressures of
                an encyclopedic backstory, and relish the organic process of
                getting to know your imaginary compatriot's rich inner depths
                one layer at a time.
              </p>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1623697899811-f2403f50685e?q=80&w=1903&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width={1250}
              height={1250}
              alt="exploration image"
              className="mt-6 max-h-[20rem] object-cover rounded-2xl"
            />
          </div>

          <div className="py-12 max-w-[85%]">
            <h2
              className="text-neutral-900 font-bold text-2xl md:text-3xl py-6"
              ref={StepbystepbuildingRef}
            >
              Step-by-step building
            </h2>
            <div className="flex flex-col leading-6 gap-6">
              <p className="text-gray-700">
                Now, let's dive into crafting a rich, engaging backstory for
                your character:
              </p>
              <p className="text-gray-700">
                <strong>Start with the Present:</strong>
                No matter who your character is, begin by sketching out their
                current state and work backwards from there. Draw inspiration
                from real life individuals or fictional works you find
                intriguing. Think about how you recount formative events in your
                own personal history. You can even take notes on the backstories
                of relatives, famous figures, or beloved book/movie characters.
                Remember, no person is completely good or evil - even villains
                perceive themselves as the heroes of their own narratives.
                Resist flat, one-dimensional portrayals.
              </p>
              <p className="text-gray-700">
                <strong>Map Out a Lifeline Plot:</strong> out the key events and
                periods that shaped your character's journey to the present day.
                What was their childhood like? Who were the pivotal people they
                interacted with (try limiting it to 2-3 well-developed side
                characters)? When did they first experience love, tragedy, or
                any life-altering moments? Continuing chronicling these critical
                experiences until you reach modern times, being sure to pinpoint
                that transformative, perspective-shifting event.
              </p>
              <p className="text-gray-700">
                <strong>Add a Conflict:</strong>
                The driving force behind memorable stories is when characters'
                motivations clash in an engaging way. Establish a scenario where
                Character 1 wants Outcome A to occur, while Character 2 (or an
                outside force) is actively pursuing the mutually exclusive
                Outcome B. If A happens, B cannot - and vice versa. For example,
                an environmental activist might seek to preserve a forest's
                biodiversity, while a real estate developer has lucrative plans
                to raze it for a new resort. Their conflicting goals create
                narrative tension. However, this opposing force doesn't have to
                be another character - it could manifest as an internal
                struggle, societal obstacles, or the whims of fate. Maybe an orc
                wishes to become a world-traveling merchant, but their
                intimidating appearance breeds fear and rejection in other
                civilized races. The scale of your conflict can be as large or
                small as you want.
              </p>
              <p className="text-gray-700">
                <strong>Ensure Backstory Relevance:</strong> When fleshing out
                your character's personal history, it's tempting to include
                every seemingly amusing or fascinating anecdote. However, focus
                your backstory detailing on elements that directly inform
                current motivations, personality traits, and the central
                conflicts they'll face in the main narrative. Aim for
                conciseness over comprehensiveness - just enough context to
                produce a fully realized, dynamic persona primed for an
                immersive story experience.
              </p>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1603050785682-e8304e078c39?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width={1250}
              height={1250}
              alt="Stepbystepbuilding image"
              className="mt-6 max-h-[20rem] object-cover rounded-2xl"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
