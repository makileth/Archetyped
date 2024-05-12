import Link from "next/link";
import { roleplayAcademyPosts } from "../../../../../constants";
export default function Component() {
  return (
    <div className="min-h-[100vh] py-12 lg:py-16 2xl:ml-0 md:ml-[6rem] ml-0">
      <div className="container grid items-center gap-4 px-4 text-center md:px-6 lg:gap-10">
        <div className="space-y-2">
          <h2 className="text-3xl text-neutral-900 font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Roleplay
          </h2>
          <p className="mx-auto max-w-[600px] text-neutral-500 md:text-xl/relaxed xl:text-base/relaxed dark:text-neutral-400">
            Read guidelines on how to get better at roleplaying. Even if you're shy.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {roleplayAcademyPosts.map((item) => (
            <div className="relative hover:bg-neutral-100 duration-300 transition group rounded-xl overflow-hidden shadow-inset">
              <Link
                className="absolute inset-0 focus:outline-none z-10"
                href={item.link}
              />
              <img
                alt="Cover image"
                className="aspect-[1.667] w-full object-cover rounded-2xl transition-transform"
                height="300"
                src={item.img}
                width="500"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-xl text-neutral-900 font-bold tracking-tighter">
                  {item.heading}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.subheading}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
