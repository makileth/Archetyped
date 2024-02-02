"use client";

import * as React from "react";
import Link from "next/link";
import { useSession } from "@clerk/nextjs";
import {
  OrganizationSwitcher,
  SignOutButton,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";

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
const navigation = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Create a Character", href: "/create" },
  { name: "Manage my Characters", href: "/manage" },
  { name: "Learn Character Design (Coming Soon)", href: "/" },
];

// const components: { title: string; href: string; description: string }[] = [
//   {
//     title: "Learn the Basics",
//     href: "/",
//     description: "Master the fundamental principles and delve into creation",
//   },
//   {
//     title: "Crafting a Unique Backstory",
//     href: "/",
//     description:
//       "Learn to create compelling and distinctive character backstories.",
//   },
//   {
//     title: "Making Appearance Unique",
//     href: "/",
//     description:
//       "Explore techniques to ensure your characters stand out visually and leave a lasting impression.",
//   },
//   {
//     title: "Character Personality Development",
//     href: "/",
//     description: "Understand how to breathe life into your characters.",
//   },
//   {
//     title: "Building Character Relationships",
//     href: "/",
//     description: "Weave intricate relationships between your characters",
//   },
//   {
//     title: "Practicing Character's voice",
//     href: "/",
//     description: "Discover the art of immitating voices like a pro",
//   },
// ];

export function Topbar() {
  const { isSignedIn } = useSession();

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const [isScrolled, setIsScrolled] = React.useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 0);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    isSignedIn && (
      <>
        <NavigationMenu
          className={`md:block hidden mx-auto rounded-2xl text-black fixed py-1 mt-1 px-2  inset-x-0 top-0 z-50 ${
            isScrolled
              ? "bg-opacity-50 bg-white backdrop-blur-2xl"
              : " bg-white"
          }`}
        >
          <NavigationMenuList className="gap-0.5">
            <NavigationMenuItem className="cursor-pointer">
              <Link href="/" legacyBehavior passHref>
                <Image
                  className="w-4/5 h-4/5 mt-2"
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
                  className={`${navigationMenuTriggerStyle()}    hover:bg-neutral-300 rounded-[3rem] py-[0.45rem] h-[2rem] px-4 text-sm font-medium `}
                >
                  Menu
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className=" h-[2rem]  bg-transparent ">
                Getting started
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex shadow-around bg-gradient-to-r from-slate-100 to-pink-100  h-full w-full select-none flex-col justify-end rounded-md from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <Image
                          className="w-2/5 h-2/5 mt-2"
                          src="/assets/logo.svg"
                          width={125}
                          height={125}
                          alt="logo"
                        />
                        <div className=" mt-4 text-lg font-medium">
                          CharacterVerse
                        </div>
                        <hr className="my-1"/>
                        <p className="text-sm font-medium leading-tight text-muted-foreground">
                          It's a portal to crafting characters that resonate
                          deeply in your tabletop narratives. 
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/menu" title="Open Menu">
                    Discover different options in our menu
                  </ListItem>
                  <ListItem href="/create" title="Create a Character">
                    Your character journey begins with just a click.
                  </ListItem>
                  <ListItem href="/manage" title="Manage my Characters">
                    Open, share, and edit your character sheets with ease.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className=" h-[2rem] bg-transparent  ">
                Learn Character Design
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
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
            <NavigationMenuItem>
              <div className=" lg:flex lg:flex-1 lg:justify-end">
                {isSignedIn ? (
                  <SignedIn>
                    <div>
                      <UserButton afterSignOutUrl="/sign-in" />
                    </div>
                  </SignedIn>
                ) : (
                  <div className="flex flex-row gap-4">
                    <NavigationMenuItem>
                      <Link href="/sign-in" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={`${navigationMenuTriggerStyle()}    hover:bg-neutral-300 rounded-[3rem] py-[0.45rem] h-[2rem] px-4 text-sm font-medium `}
                        >
                          Sign In
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <Link href="/sign-up" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={`${navigationMenuTriggerStyle()} hover:bg-neutral-300 rounded-[3rem] py-[0.45rem] h-[2rem] px-4 text-sm font-medium `}
                        >
                          Sign Up
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  </div>
                )}
              </div>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div
          className={`fixed inset-x-0  md:hidden top-0 z-50 ${
            isScrolled ? "bg-white bg-opacity-50 backdrop-blur-2xl" : ""
          }`}
        >
          <nav
            className="flex items-center justify-between py-3 px-4"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
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
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
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
                  <div>
                    <UserButton afterSignOutUrl="/sign-in" />
                  </div>
                </SignedIn>
              ) : (
                <div className="flex flex-row gap-4">
                  <Link className="px-4 py-2 text-black" href="/sign-in">
                    <p>&larr; Sign in</p>
                  </Link>

                  <Link
                    className="px-4 py-2 bg-black rounded-[10px] text-white hover:bg-white hover:border-1 hover:border-black duration-300 transition"
                    href="/sign-up"
                  >
                    <p>Sign up</p>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>

        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
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
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
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
                <div className="py-6">
                  {isSignedIn ? (
                    <SignedIn>
                      <div>
                        <UserButton afterSignOutUrl="/sign-in" />
                      </div>
                    </SignedIn>
                  ) : (
                    <Link
                      className="px-4 py-2 bg-black rounded-[10px] text-white"
                      href="/sign-in"
                    >
                      <p>Sign in</p>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </>
    )
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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-cyan-100 hover:text-cyan-100-foreground focus:bg-cyan-100 focus:text-cyan-100-foreground",
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
