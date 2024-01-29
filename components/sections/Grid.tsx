"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Grid() {
  const router = useRouter();
  return (
    <section className="md:max-w-6xl w-screen mx-auto pt-12">
      <div className="px-3 flex flex-col md:grid md:grid-cols-1 gap-6">
        <div
          className="bg-gradient-to-r py-[4rem] from-[#ffa8a8] shadow-2xl via-[#ffe3f9] to-white rounded-lg p-6 space-y-4 transition-all duration-500 ease-in-out transform  relative group w-full"
          style={{
            backgroundImage: "linear-gradient(45deg, #E37272, #ffa8a8, white)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r  from-pink-400 to-primary opacity-0 group-hover:opacity-20 rounded-lg blur-[50px] transition-all duration-500 ease-in-out " />
          <div className="md:w-3/4 w-full md:h-[90%] h-[50%] bg-black rounded-2xl    absolute bottom-[22rem] left-[7.5rem] md:bottom-[10rem] md:left-[30rem] overflow-hidden">
            <div className="flex flex-row w-full h-full">
              <div className="w-1/3 h-full">
                <Image
                  src="/assets/grid-img1.jpg"
                  alt="grid image"
                  width={250}
                  height={250}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="w-1/3 h-full">
                <Image
                  src="/assets/grid-img2.jpg"
                  alt="grid image"
                  width={250}
                  height={250}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="w-1/3 h-full">
                <Image
                  src="/assets/grid-img3.jpg"
                  alt="grid image"
                  width={250}
                  height={250}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col pl-2 items-start gap-4 justify-between z-10">
            <div className="p-5 bg-white opacity-50 rounded-lg">
              <BookOpenIcon className="text-black opacity-100" />
            </div>

            <h2 className="text-white font-semibold text-xl">
              Create Characters you've always wanted
            </h2>
            <p className="text-slate-100 z-10 md:w-[25rem]">
              In the realm of character creation, Character Verse stands apart,
              emphasizing the richness of personality and the art of roleplay.
              It's not just an app; it's a portal to crafting characters that
              resonate deeply in your tabletop narratives. Say farewell to the
              intricacies of stats and skills, and welcome a tool that allows
              you to focus on the heart and soul of your characters. With
              Character Verse, your tabletop adventures are not just campaigns;
              they're immersive stories waiting to unfold.
            </p>
            <Button
              onClick={() => {
                router.push("/create");
              }}
              className="bg-white opacity-50 hover:bg-black hover:text-white backdrop-blur-2xl text-black text-opacity-100 z-10 transition-all duration-500 ease-in-out transform "
            >
              Start Creating
            </Button>
          </div>
        </div>
        <div className="md:grid md:grid-cols-3 gap-6 w-full">
          <div className="bg-neutral-100  shadow-2xl rounded-lg p-6 space-y-4 transition-all duration-300 ease-in-out transform  mb-6 md:mb-0 border-[1px] border-neutral-300 hover:border-primary  relative group col-span-2">
            <div className="absolute inset-0 bg-pink-500 opacity-0 group-hover:opacity-10 rounded-lg blur-[50px] transition-all duration-500 ease-in-out" />
            <div className="flex items-start pl-2 gap-4 flex-col justify-between z-10">
              <div className="p-5 shadow-lg bg-blue-100 opacity-50 rounded-lg">
                <LightbulbIcon className="text-black opacity-100" />
              </div>
              <h2 className="text-neutral-900 text-lg font-semibold">
                Learn to make better characters & stories
              </h2>

              <p className="text-neutral-700 z-10">
                Elevate your storytelling prowess ours rich knowledge base.
                Unlock the secrets of character creation and narrative crafting,
                all at your fingertips. Our extensive resources are not just
                tools; they're your companions on a journey to refine your
                storytelling skills. Best of all, it's all here for you,
                absolutely free.
              </p>
              <Button className="bg-primary hover:bg-black ext-white backdrop-blur-2xl  text-opacity-100 z-10 transition-all duration-500 ease-in-out transform ">
                Learn More
              </Button>
            </div>
          </div>
          <div className="bg-[#295b74] rounded-lg p-6 space-y-4 transition-all duration-300 ease-in-out transform  border-[1px] border-neutral-300   relative group">
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-lg blur-[50px] transition-all duration-500 ease-in-out" />
            <div className="flex pl-2 items-start gap-4 flex-col  justify-between z-10">
              <div className="p-5 shadow-lg bg-blue-100 opacity-50 rounded-lg">
                <MessageCircleIcon className="text-black opacity-100" />
              </div>
              <h2 className="text-white font-semibold">
                Concentrate on roleplay & personality
              </h2>
              <p className="text-[#e5fafc] z-10">
                Strip away the complexities of stats and skills. Character Verse
                is your haven for character creation that revolves around pure
                roleplay and rich personalities. Focus on the essence of your
                heroes and their stories. No distractions, just the raw, untamed
                potential of your character's persona waiting to be explored.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BookOpenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function LightbulbIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  );
}

function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
    </svg>
  );
}
