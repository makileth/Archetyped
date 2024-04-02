"use client";

import * as React from "react";
import Link from "next/link";
import { useSession, useUser } from "@clerk/nextjs";
import {
  OrganizationSwitcher,
  SignOutButton,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
const components: { title: string; href: string; description: string }[] = [
  {
    title: "Coming Soon",
    href: "/",
    description: "Stay tuned!",
  },
];
import { Dialog } from "@headlessui/react";
import { usePathname } from "next/navigation";
import ChooseTemplate from "../ui/chooseTemplate";
const navigation = [
  { name: "Menu", href: "/menu" },
  { name: "Create a Character", href: "/create" },
  { name: "Manage my Characters", href: "/manage" },
  { name: "Academy", href: "/academy" },
];

export function Topbar() {
  const pathname = usePathname();
  const isAcademyPage = pathname.includes("/academy");

  const getStartedOptions = [
    {
      title: "My Characters",
      body: "Open, share, and edit with ease",
      icon: "/assets/manage.svg",
      link: "/manage",
    },
  ];
  const { user } = useUser();
  const { isSignedIn } = useSession();

  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  const [isVisible, setIsVisible] = React.useState(true);
  const [prevScrollPos, setPrevScrollPos] = React.useState(0);

  React.useEffect(() => {
    const handleScrollHide = () => {
      const currentScrollPos = window.scrollY;

      // if we go down - visible is false
      const visible = prevScrollPos > currentScrollPos;

      setIsVisible(visible);
      setPrevScrollPos(currentScrollPos);
    };

    // Add the scroll event listener to the window
    window.addEventListener("scroll", handleScrollHide);

    return () => {
      // remove on unmount
      window.removeEventListener("scroll", handleScrollHide);
    };
  }, [prevScrollPos]);

  const handleScrollBg = () => {
    const scrollY = window.scrollY; // current position
    setIsScrolled(scrollY > 0);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScrollBg);
    return () => window.removeEventListener("scroll", handleScrollBg);
  }, []);

  return (
    <>
      <NavigationMenu
        className={`md:block hidden mx-auto rounded-full  ${
          isVisible ? "visible" : "hidden"
        }  text-neutral-900 fixed py-2 mt-2 px-2  inset-x-0 top-0 z-50 ${
          isScrolled ? " bg-white bg-opacity-70 backdrop-blur-2xl" : " bg-white"
        }`}
        style={{
          transition: "transform 0.3s ease-in-out",
          transform: isVisible ? "translateY(0)" : "translateY(-150%)",
        }}
      >
        <NavigationMenuList className="">
          <NavigationMenuItem className="cursor-pointer absolute lg:top-[0.35rem] left-[-2rem] lg:left-0">
            <Link href="/" legacyBehavior passHref>
              <Image
                className="w-3/5 h-3/5 lg:w-[70%] lg:h-[70%] mx-auto"
                src="/assets/logo.svg"
                width={125}
                height={125}
                alt="logo"
              />
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/menu" legacyBehavior passHref>
              <NavigationMenuLink
                style={{ backgroundColor: "transparent" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f5f6f7";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                className={`duration-300 transition bg-transparent hover:bg-neutral-200 rounded-full py-[0.45rem] h-[2rem] px-4 text-sm font-medium `}
              >
                Menu
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="duration-300 transition hover:bg-neutral-200 rounded-full h-[2rem] pl-4 pr-1.5 bg-transparent ">
              Get started
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid grid-cols-1 gap-1.5 p-4 md:w-[300px] lg:w-[400px]">
                <ChooseTemplate page="topbar" />
                {getStartedOptions.map((item) => (
                  <Link
                    href={item.link}
                    className="w-full group rounded-2xl bg-gradient-to-r from-transparent  to-primary p-[0.05rem]"
                  >
                    <div className="w-full pl-4 h-full relative bg-white overflow-hidden rounded-2xl">
                      <div className="rounded-full group-hover:block hidden absolute bg-gradient-to-r w-[125%] h-[125%] blur-2xl bottom-0 right-[5] opacity-50 from-transparent to-primary" />
                      <div className="flex mt-4 mb-1.5 w-full items-center flex-row gap-2">
                        <div className="flex justify-center items-center  rounded-lg bg-neutral-100 h-8 w-8 dark:bg-primary-900">
                          <Image
                            src={item.icon}
                            alt="feature icon"
                            width={18}
                            height={18}
                            className="object-fit "
                          />
                        </div>
                        <h3 className=" text-lg text-neutral-900 font-[200]">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-gray-500 pb-4 text-sm max-w-[92.5%] dark:text-gray-400">
                        {item.body}
                      </p>
                    </div>
                  </Link>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/academy" legacyBehavior passHref>
              <NavigationMenuLink
                style={{ backgroundColor: "transparent" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f5f6f7";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                className={`duration-300 transition bg-transparent hover:bg-neutral-200  rounded-full py-[0.45rem] h-[2rem] px-4 text-sm font-medium `}
              >
                Academy
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {/* TODO: Make "About" section */}
          {/* <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink
                  style={{ backgroundColor: "transparent" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f5f6f7";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                  className={`${navigationMenuTriggerStyle()}    hover:bg-neutral-300 rounded-[3rem] py-[0.45rem] h-[2rem] px-4 text-sm font-medium `}
                >
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem> */}
          <NavigationMenuItem className="absolute right-0">
            <div className=" lg:flex lg:flex-1 lg:justify-end">
              {isSignedIn ? (
                <SignedIn>
                  <div>
                    <UserButton afterSignOutUrl="/sign-in" />
                  </div>
                </SignedIn>
              ) : (
                <NavigationMenuItem>
                  <Link href="/sign-up" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`duration-300 transition bg-neutral-950 text-white hover:bg-primary hover:text-neutral-900 hover:outline-[10px] hover:outline-neutral-500  rounded-full py-[0.45rem] h-[2rem] px-4 text-sm font-medium `}
                    >
                      Join Beta
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}
            </div>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className={`fixed inset-x-0 md:hidden top-0 z-50`}>
        <nav
          className="flex items-center justify-between py-3 px-4"
          aria-label="Global"
        >
          <div className={`flex lg:flex-1 ${isAcademyPage && "pl-12"}`}>
            <Link href="/">
              <Image
                className="w-full h-full"
                src="/assets/logo-mobile.svg"
                width={125}
                height={125}
                alt="logo"
              />
            </Link>
          </div>
          <div className="flex z-[100] bg-neutral-900 py-1 px-3 rounded-full lg:hidden">
            <button
              type="button"
              className="-m-2.5 items-center flex gap-1 flex-row justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setIsOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6 text-primary" aria-hidden="true" />
              <h4 className="font-bold text-white">Menu</h4>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary duration-300 transition topbarHover"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {isSignedIn ? (
              <SignedIn>
                <div className="">
                  <UserButton afterSignOutUrl="/sign-in" />
                </div>
              </SignedIn>
            ) : (
              <div className="flex flex-row gap-4">
                <Link className="px-4 py-2 text-neutral-900" href="/sign-in">
                  <p>&larr; Sign in</p>
                </Link>

                <Link
                  className="px-4 py-2 bg-neutral-900 rounded-[10px] text-white hover:bg-white hover:border-1 hover:border-neutral-900 duration-300 transition"
                  href="/sign-up"
                >
                  <p>Sign up</p>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
      {isOpen && (
        <>
          <div className="fixed w-full h-full bg-neutral-900 opacity-50 z-[80] backdrop-blur-2xl" />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 100 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="fixed top-3 left-[32.5%] sm:left-[65%] w-full z-[1000]  "
          >
            <div className="w-[65%] sm:w-[15rem] bg-white rounded-2xl">
              <div className="flex items-center justify-between">
                <a href="#" className="ml-4 mt-2">
                  <Link href="/">
                    <Image
                      className="w-4/5 h-4/5 mt-2"
                      src="/assets/logo.svg"
                      width={125}
                      height={125}
                      alt="logo"
                    />
                  </Link>
                </a>
                <button
                  type="button"
                  className=" rounded-md p-2.5 text-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="w-full flex flex-col">
                  <div className="space-y-2 mx-auto py-6">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="py-6 w-full flex">
                    {isSignedIn ? (
                      <SignedIn>
                        <div className="ml-4 flex gap-2 py-2 px-3 items-center rounded-2xl bg-neutral-100 flex-row">
                          <UserButton afterSignOutUrl="/sign-in" />
                          <span className="text-neutral-800 capitalize">
                            {user?.username}
                          </span>
                        </div>
                      </SignedIn>
                    ) : (
                      <Link
                        className="px-4 py-2 bg-neutral-900 rounded-[10px] text-white"
                        href="/sign-in"
                      >
                        <p>Sign in</p>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-violet-100 hover:text-cyan-100-foreground focus:bg-violet-100 focus:text-cyan-100-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Topbar;
