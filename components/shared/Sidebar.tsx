"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import ThemeSwitch from "../ui/ToggleTheme";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PanelLeftOpen } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  const isAcademyPage = pathname.includes("/academy");
  const navigationItems = [
    {
      title: "home",
      link: "/academy",
      icon: "academySidebar/home.svg",
      text: "Home",
      alt: "home icon",
    },
    {
      title: "Get Started",
      link: "/academy/get-started",
      icon: "academySidebar/getStarted.svg",
      text: "Get Started",
      alt: "Get Started icon",
    },
    {
      title: "Character writing",
      link: "/academy/characters",
      icon: "academySidebar/char.svg",
      text: "Characters",
      alt: "Character writing icon",
    },
    {
      title: "storytelling",
      link: "/academy/storytelling",
      icon: "academySidebar/storytelling.svg",
      text: "Storytelling",
      alt: "storytelling icon",
    },
    // {
    //   title: "gamemastering",
    //   link: "/academy/worldbuilding",
    //   icon: "academySidebar/world.svg",
    //   text: "Worldbuilding",
    //   alt: "World building",
    // },
    // {
    //   title: "writing",
    //   link: "/academy/character/writing",
    //   icon: "academySidebar/writing.svg",
    //   text: "Writing",
    //   alt: "Writing",
    // },
    {
      title: "Roleplay",
      link: "/academy/roleplay",
      icon: "academySidebar/roleplay.svg",
      text: "Roleplay",
      alt: "Roleplay",
    },
  ];
  return (
    isAcademyPage && (
      <>
        <div className=" absolute top-3.5 left-2">
          <Sheet>
            <SheetTrigger className="fixed z-[100] px-2 md:hidden ">
              <PanelLeftOpen className="w-8 h-8 p-1.5 bg-neutral-900 text-primary rounded-2xl" />
            </SheetTrigger>
            <SheetContent className="md:hidden z-[101] w-[6rem]" side={"left"}>
              <SheetHeader>
                <div className="flex flex-1 z-[60]">
                  <div className="max-w-[5.35rem] left-1 top-12 h-[100vh] fixed">
                    <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-purple-50">
                      <div className="flex flex-col px-1 flex-1 ">
                        <div className="space-y-4 text-center">
                          <nav className="flex-1 space-y-3">
                            {navigationItems.map((item) => (
                              <Link
                                href={item.link}
                                title={item.title}
                                className={`flex flex-col items-center group gap-1.5 py-0.5 px-2 text-xs font-medium  transition-all duration-200 rounded-lg group  ${
                                  pathname === item.link
                                    ? " text-primary" // Apply bg-primary if the current path matches the link
                                    : " text-neutral-700 group-hover:text-neutral-900 " // Apply bg-transparent if the current path does not match the link
                                }`}
                              >
                                <div
                                  className={`w-full bg-primary duration-300 transition ease-in-out items-center rounded-xl py-1 justify-center ${
                                    pathname === item.link
                                      ? "bg-primary" // Apply bg-primary if the current path matches the link
                                      : "bg-transparent group-hover:bg-violet-200" // Apply bg-transparent if the current path does not match the link
                                  }`}
                                >
                                  <Image
                                    alt={item.alt}
                                    src={`/assets/${item.icon}`}
                                    width={18}
                                    height={18}
                                    className="m-1 mx-auto"
                                  />
                                </div>
                                <span
                                  className={`duration-300 transition   ${
                                    pathname === item.link
                                      ? " group-hover:text-primary-800 " // Apply bg-primary if the current path matches the link
                                      : " group-hover:text-neutral-900 " // Apply bg-transparent if the current path does not match the link
                                  }`}
                                >
                                  {item.text}
                                </span>
                              </Link>
                            ))}
                          </nav>
                        </div>
                      </div>
                      {/* <div className="w-full flex items-center justify-center h-[5rem]">
                        <ThemeSwitch />
                      </div> */}
                    </div>
                  </div>
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex flex-1  z-[60]">
          <div className="hidden md:flex max-w-[5.35rem] h-[100vh]  fixed md:flex-col">
            <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-purple-50">
              <div className="flex flex-col px-1 flex-1 ">
                <div className="space-y-4 text-center">
                  <nav className="flex-1 space-y-3">
                    {navigationItems.map((item) => (
                      <Link
                        href={item.link}
                        title={item.title}
                        className={`flex flex-col items-center group gap-1.5 py-0.5 px-2 text-xs font-medium  transition-all duration-200 rounded-lg group  ${
                          pathname === item.link
                            ? " text-primary" // Apply bg-primary if the current path matches the link
                            : " text-neutral-700 group-hover:text-neutral-900 " // Apply bg-transparent if the current path does not match the link
                        }`}
                      >
                        <div
                          className={`w-full bg-primary duration-300 transition ease-in-out items-center rounded-xl py-1 justify-center ${
                            pathname === item.link
                              ? "bg-primary group-hover:bg-primary-400" // Apply bg-primary if the current path matches the link
                              : "bg-transparent group-hover:bg-primary-200" // Apply bg-transparent if the current path does not match the link
                          }`}
                        >
                          <Image
                            alt={item.alt}
                            src={`/assets/${item.icon}`}
                            width={18}
                            height={18}
                            className="m-1 mx-auto"
                          />
                        </div>
                        <span
                          className={`duration-300 transition   ${
                            pathname === item.link
                              ? " group-hover:text-primary-800 " // Apply bg-primary if the current path matches the link
                              : " group-hover:text-neutral-900 " // Apply bg-transparent if the current path does not match the link
                          }`}
                        >
                          {item.text}
                        </span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
              {/* <div className="w-full flex items-center justify-center h-[5rem]">
                <ThemeSwitch />
              </div> */}
            </div>
          </div>

          <div className="flex flex-col flex-1">
            <main>
              <div className="py-6">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8"></div>
              </div>
            </main>
          </div>
        </div>
      </>
    )
  );
};
export default Sidebar;
