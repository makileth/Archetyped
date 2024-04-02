import {
    CloudArrowUpIcon,
    LockClosedIcon,
    ServerIcon,
  } from "@heroicons/react/20/solid";
  
  import Image from "next/image";
  const features = [
    {
      name: "Simple and Effortless",
      description:
        "Whether you're a seasoned adventurer or a wide-eyed novice, our platform ensures that character creation is a breeze - no magic wands required!",
      icon: "/assets/time-fast.svg",
    },
    {
      name: "Enriching Character Personalities",
      description:
        "Unlock the secret to creating truly captivating characters with our special blend of thought-provoking questions. Pour these personality potions into your character's narrative and watch their story unfold in whimsical and unexpected ways.",
      icon: "/assets/enrich.svg",
    },
  
    {
      name: "Comprehensive for DMs",
      description:
        "With character profiles that sparkle with essential details, DMs can effortlessly weave your character into their fantastical tale, leaving them mesmerized by your enchanting creation.",
      icon: "/assets/user-check.svg",
    },
    {
      name: "Free & Epic!",
      description:
        "Unlock the potential of your character without any financial burdens. Enjoy!",
      icon: "/assets/kite.svg",
    },
  ];
  
  export default function Features() {
    return (
      <div className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 ">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-primary">
                  Unleash Your Character's Persona
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Bring Your{" "}
                  <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
                    Characters
                  </span>{" "}
                  to Life
                </p>
                {/* <p className="mt-6 text-lg leading-8 text-gray-600">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Maiores impedit perferendis suscipit eaque, iste dolor
                  cupiditate blanditiis ratione.
                </p> */}
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                  {features.map((feature) => (
                    <div
                      key={feature.name}
                      className="relative flex flex-col gap-2 pl-3"
                    >
                      <dt className=" gap-2 flex flex-row font-semibold text-gray-900">
                        <Image 
                         src={feature.icon} 
                         alt="feature icon"
                         width={24}
                         height={24}
                        />
                        {feature.name}
                      </dt>{" "}
                      <dd className="inline">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <Image
              src="/assets/artwork.jpg"
              alt="Product screenshot"
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
              width={2432}
              height={1442}
            />
          </div>
        </div>
      </div>
    );
  }
  