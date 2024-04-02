"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SectionLabel from "../../../../../components/ui/SectionLabel";
import Image from "next/image";
import { boolean, string } from "zod";

const page = () => {
  // effect hooks to check whether the user observes a specific section

  return (
    <main className="overflow-x-hidden min-h-[100vh]">
      {/* Navigation through the headers */}

      {/* The page itself */}
      <section className=" flex flex-col items-start h-full mx-auto md:max-w-4xl">
        <div className="w-full md:w-[80%] ml-[2rem] md:ml-[8rem] mx-auto h-full">
          <div className="py-12 max-w-[85%]">
            <SectionLabel labelText="How to use Academy" darkmode={false} />
            <h1 className="mb-4 text-4xl capitalize font-extrabold text-neutral-950 leading-[3rem] md:text-5xl md:leading-[4rem] dark:text-white">
              Get Started
            </h1>
            <p className=" leading-6 mb-4 font-light text-neutral-700 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              This is where stories begin
            </p>

            <Image
              src="https://images.unsplash.com/photo-1607893407846-49905270209e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width={1250}
              height={1250}
              alt="abstract image"
              className="mt-6 max-h-[25rem] md:max-h-[30rem] object-cover rounded-2xl"
            />
          </div>
          <div className="py-12 max-w-[85%]">
            <h2 className="text-neutral-900 font-bold text-2xl md:text-3xl py-6">
              What's Narrative Academy?
            </h2>
            <div className="flex flex-col leading-6 gap-6">
              <p className="text-gray-700">
                At Narrative Academy, we believe that everyone has a story to
                tell, and we're here to help you bring yours to life. Whether
                you're a seasoned writer looking to hone your craft or a budding
                storyteller eager to explore the world of character creation,
                you've come to the right place.
              </p>
              <p className="text-gray-700">
                Our mission is simple: to empower you with the knowledge and
                tools you need to unleash your creative potential. Dive deep
                into our comprehensive resources and discover a treasure trove
                of insights on creating captivating characters, crafting
                compelling plots, and mastering the art of roleplay
              </p>
              <p className="text-gray-700">
                Explore a diverse range of topics, from character building and
                world-building to plot development and narrative techniques.
              </p>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width={1250}
              height={1250}
              alt="book image"
              className="mt-6 max-h-[20rem] object-cover rounded-2xl"
            />
          </div>
          <div className="py-12 max-w-[85%]">
            <h2 className="text-neutral-900 font-bold text-2xl md:text-3xl py-6">
              Contribution
            </h2>
            <div className="flex flex-col leading-6 gap-6">
              <p className="text-gray-700 ">
                We strive to be more than just a learning platform. Join a
                vibrant community of ttrpg players, united by a passion for
                creativity and a love for stories. Connect with fellow writers,
                share your ideas, and collaborate on projects that inspire and
                delight.
              </p>
              <p className="text-gray-700 ">
                Our mission is simple: to empower you with the knowledge and
                tools you need to unleash your creative potential. Dive deep
                into our comprehensive resources and discover a treasure trove
                of insights on creating captivating characters, crafting
                compelling plots, and mastering the art of roleplay
              </p>
              <p className="text-gray-700 ">
                So, do you have some awesome ideas or stories you'd like to
                share? We'd love to hear from you! Contribute your ideas by
                emailing us at{" "}
                <a
                  href="mailto:focyfox@gmail.com"
                  className="text-primary underline"
                >
                  focyfox@gmail.com
                </a>
              </p>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1484589065579-248aad0d8b13?q=80&w=1959&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width={1250}
              height={1250}
              alt="abstract image"
              className="mt-6 max-h-[20rem] object-cover rounded-2xl"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
