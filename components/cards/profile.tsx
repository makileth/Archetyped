import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

const characterTips = [
  "Give your character a unique quirk or habit that sets them apart.",
  "Develop a rich backstory for your character that informs their motivations and actions.",
  "Create internal conflicts or flaws that your character must grapple with.",
  "Consider how your characters cultural background shapes their worldview and behaviors.",
  "Craft believable relationships and dynamics between your characters.",
  "Explore how your characters profession or occupation influences their personality.",
  "Incorporate symbolic elements or motifs that represent aspects of your characters journey.",
  "Give your character a distinct voice or manner of speaking.",
  "Challenge your character with moral dilemmas that test their values.",
  "Consider how your characters physical appearance affects their self-perception and interactions.",
  "Develop your characters goals and aspirations, and how they pursue them.",
  "Explore how your character reacts to and grows from adversity or trauma.",
  "Give your character a secret or mystery that drives their actions.",
  "Create a unique belief system or philosophy that your character follows.",
  "Incorporate elements of your characters favorite hobbies, interests, or passions.",
  "Develop your characters sense of humor and how they use it in different situations.",
  "Explore how your characters relationships with family or friends shape their identity.",
  "Consider how your characters age or life stage affects their outlook and experiences.",
  "Create a character arc that shows your characters growth and transformation over time.",
  "Infuse your character with a sense of vulnerability or emotional depth.",
];

function ProfilePage() {
  const { user } = useUser();
  const [randomTip, setRandomTip] = useState("");

  useEffect(() => {
    const getRandomTip = () => {
      const randomIndex = Math.floor(Math.random() * characterTips.length);
      return characterTips[randomIndex];
    };

    setRandomTip(getRandomTip());
  }, []);

  return (
    <div className="gap-6 px-4 lg:px-2">
      {user ? (
        <h1 className="text-neutral-900 text-4xl font-bold">
          Welcome,
          <span className="bg-gradient-to-r capitalize from-neutral-900 to-primary text-transparent bg-clip-text">
            {" "}
            {user.username}
          </span>
        </h1>
      ) : (
        <p className="text-neutral-900 text-[24px] font-bold">
          Loading user data...
        </p>
      )}
      <div className="flex flex-col bg-neutral-100 p-2 rounded-2xl mt-2 md:flex-row items-start md:items-center gap-1.5">
        <div className="px-2 bg-neutral-800 items-center justify-center gap-2 rounded-full flex flex-row">
          <div className="bg-primary rounded-full h-1 w-1" />
          <p className="text-white font-semibold text-[0.80rem]">Tip:</p>
        </div>
        <p className="text-neutral-700 text-md font-semibold">{randomTip}</p>
      </div>
    </div>
  );
}

export default ProfilePage;
