"use client";
import Link from "next/link";
import Image from "next/image";
import {
  OrganizationSwitcher,
  SignOutButton,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";

import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSession } from "@clerk/nextjs";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Marketplace", href: "/" },
  { name: "About", href: "/about" },
];

const Topbar = () => {

  
  const { isSignedIn } = useSession();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isSignedIn && (
    <header
      className={`fixed inset-x-0 top-0 z-50 ${
        isScrolled ? "bg-white bg-opacity-50 backdrop-blur-2xl" : ""
      }`}
    >
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Character Verse</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
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
              <Link
                className="px-4 py-2 text-black"
                href="/sign-in"
              >
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
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
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
                    {/* <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  src="/assets/exit.webp"
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton> */}
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
    </header>
    // <nav className="topbar">
    //   <Link href="/" className="flex items-center gap-4">
    //     <Image src="/assets/CustomThreadsLogo.svg" alt="" width={48} height={48} />
    //     <p className="max-xs:hidden text-black text-[24px] font-bold">Character<span className="text-blue-500">Verse</span></p>
    //   </Link>
    //   <div className="flex items-center gap-1">
    //     <div className=" flex flex-row">
    //       <SignedIn>
    //         <div>
    //           <UserButton afterSignOutUrl="/sign-in"/>
    //         </div>
    //         {/* <SignOutButton>
    //           <div className="flex cursor-pointer">
    //             <Image
    //               src="/assets/exit.webp"
    //               alt="logout"
    //               width={24}
    //               height={24}
    //             />
    //           </div>
    //         </SignOutButton> */}
    //       </SignedIn>
    //     </div>
    //   </div>
    // </nav>
  );
};

export default Topbar;
