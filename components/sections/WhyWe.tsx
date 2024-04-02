import React from "react";
import SectionLabel from "../ui/SectionLabel";
import Image from "next/image";

const WhyWe = () => {
  const gridContent = [
    {
      title: "Pure Roleplay",
      paragraph:
        "Forget about boring stats. Your character's personality deserves special attention. We help you build personas that come alive.",
      icon: "/assets/enrich.svg",
    },
    {
      title: "Easy for DMs",
      paragraph:
        "Simply share your character sheet link with your GM. All the essential info, perfectly organized.",
      icon: "/assets/user-check.svg",
    },
    {
      title: "Versatility",
      paragraph:
        "Whether you're a roleplayer or a writer, we have the perfect character sheet for your needs.",
      icon: "/assets/versatility.svg",
    },
    {
      title: "Growth",
      paragraph:
        "Unlock our learning resources and gain the skills to write even more unique and compelling characters.",
      icon: "/assets/learn.svg",
    },
    {
      title: "All the tools you need",
      paragraph:
        "Everything you need to manage your characters in one place. Craft, save, edit, and share with ease.",
      icon: "/assets/tool.svg",
    },
    {
      title: "Free",
      paragraph:
        "Unleash your creativity and build amazing characters, all for free",
      icon: "/assets/kite.svg",
    },

    // Add more objects for other grid items as needed
  ];

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="w-full flex flex-col md:flex-row mb-2 md:mb-6">
          <div className="flex flex-col w-full md:pb-0 pb-6 pl-6 md:w-[52%]">
            <SectionLabel labelText="Why Archetyped?" darkmode={false} />
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              The only app your ideas need
            </h2>
            <p className="text-gray-500 sm:text-xl w-4/5 dark:text-gray-400">
              Discover unrivaled advantages
            </p>
          </div>
          <div className="w-full md:w-[50%] rounded-2xl bg-gradient-to-r from-transparent via-pink-300 to-primary p-[0.05rem]">
            <div className="w-full pl-4 h-full relative bg-white overflow-hidden rounded-2xl">
              <div className="rounded-full absolute bg-gradient-to-r w-[125%] h-[125%] blur-2xl bottom-0 right-[5] opacity-50 from-transparent to-primary" />
              <div className="flex mt-5 mb-3 w-full items-center flex-row gap-2">
                <div className="flex justify-center items-center rounded-full bg-neutral-100 h-8 w-8 dark:bg-primary-900">
                  <Image
                    src="/assets/time-fast.svg"
                    alt="feature icon"
                    width={22}
                    height={22}
                    className="object-fit "
                  />
                </div>
                <h3 className=" text-2xl text-neutral-900 font-[200]">Speed</h3>
              </div>
              <p className="text-gray-500 pb-4 max-w-[92.5%] dark:text-gray-400">
                Develop personas in 5 minutes. No bla bla - only the most
                important stuff. Make your characters as detailed as you want
                with optional fields.
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-2 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
          {gridContent.map((item, index) => (
            <div
              key={index}
              className="w-full rounded-2xl bg-gradient-to-r from-transparent via-pink-300 to-primary p-[0.05rem]"
            >
              <div className="w-full pl-4 h-full relative bg-white overflow-hidden rounded-2xl">
                <div className="rounded-full absolute bg-gradient-to-r w-[125%] h-[125%] blur-2xl bottom-0 right-[5] opacity-50 from-transparent to-primary" />
                <div className="flex mt-5 mb-3 w-full items-center flex-row gap-2">
                  <div className="flex justify-center items-center  rounded-full bg-neutral-100 h-8 w-8 dark:bg-primary-900">
                    <Image
                      src={item.icon}
                      alt="feature icon"
                      width={22}
                      height={22}
                      className="object-fit "
                    />
                  </div>
                  <h3 className=" text-2xl text-neutral-900 font-[200]">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-500 pb-4 max-w-[92.5%] dark:text-gray-400">
                  {item.paragraph}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyWe;
