import Link from "next/link";

export default function page() {
  return (
    <div className="grid items-center min-h-screen gap-4 px-4 text-center md:px-6">
      <div className=" flex flex-col gap-2">
        <h1 className="text-4xl text-neutral-900 font-bold tracking-tight">
          No Publications
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Stay tuned for updates!
        </p>
        <Link href="/academy" className="text-neutral-700 underline">
          Go Back
        </Link>
      </div>
    </div>
  );
}
