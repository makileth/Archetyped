import Link from "next/link";
import { Input } from "../../../../components/ui/input";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <div className="min-h-[100vh] text-neutral-900 py-16 md:py-36 overflow-hidden">
      <div className="grid max-w-3xl gap-6 px-4 py-6 mx-auto sm:grid-cols-2 sm:gap-8 md:px-6 lg:gap-6">
        <div className="gap-3 flex flex-col">
          <h1 className="text-3xl text-neutral-900 font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Changelog
          </h1>
          <p className="text-sm text-neutral-500">
            Showing 10 recent versions.
          </p>
        </div>

        <div className="space-y-4 sm:col-start-1 sm:col-span-2">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-start gap-2">
              <h2 className="text-2xl font-bold tracking-tighter">
                1.0.0 Beta
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Released on April 3, 2024
              </p>
            </div>
          </div>
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-neutral-800 dark:text-neutral-200">
              <strong>Full App Redesign:</strong> The app has undergone a
              complete redesign, offering an enhanced user experience.
            </li>
            <li className="text-neutral-800 dark:text-neutral-200">
              <strong>Rebranding:</strong> We've rebranded the app with a new
              name, a fresh logo, and new key visuals.
            </li>
            <li className="text-neutral-800 dark:text-neutral-200">
              <strong>Structural Sheet Changes:</strong> The structure of the
              sheets has been modified for improved functionality.
            </li>
            <li className="text-neutral-800 dark:text-neutral-200">
              <strong>Templates Menu:</strong> A new Templates menu has been
              introduced.
            </li>
            <li className="text-neutral-800 dark:text-neutral-200">
              <strong>Improved Menu:</strong> The menu has been revamped, now
              featuring links to the Academy, and displaying the last created
              character.
            </li>
            <li className="text-neutral-800 dark:text-neutral-200">
              <strong>Manage Menu Enhancements:</strong> The Manage menu has
              been reworked for better congruency and an improved experience.
            </li>
            <li className="text-neutral-800 dark:text-neutral-200">
              <strong>Academy Launch:</strong> Introducing the Academy! Dive
              into learning how to create better characters and stories.
              Contribute your ideas by emailing us at{" "}
              <a
                href="mailto:focyfox@gmail.com"
                className="text-primary underline"
              >
                focyfox@gmail.com
              </a>
              .
            </li>
            <li className="text-neutral-800 dark:text-neutral-200">
              <strong>New Template [Call of Cthulhu]: </strong> Unleash your
              inner investigator with the new Call of Cthulhu template.
            </li>
            <li className="text-neutral-800 dark:text-neutral-200">
              <strong>Shift+Enter Combo:</strong> Use the Shift+Enter
              combination for effortless writing and organizing long text.
            </li>
            <li className="text-neutral-800 dark:text-neutral-200">
              <strong>Performance Boost:</strong> The app now offers better
              performance for a smoother experience.
            </li>
            <li className="text-neutral-800 dark:text-neutral-200">
              <strong>Topbar Upgrade:</strong> The topbar has been upgraded for
              improved functionality.
            </li>
            <li className="text-neutral-800 dark:text-neutral-200">
              <strong>Tips Line:</strong> The Tips line on the "Menu" page is
              now functional.
            </li>
            <li className="text-neutral-800 dark:text-neutral-200">
              <strong>Bug Fixes:</strong> Numerous bugs have been squashed,
              ensuring a more stable experience.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
