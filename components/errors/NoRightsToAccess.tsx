"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const NoRightsToAccess = () => {
  const router = useRouter();

  return (
    <main className="text-black min-h-[100vh] items-center max-w-4xl mx-auto py-56 mx-2">
      <div className="text-black min-h-[100vh] text-center items-center gap-8 flex flex-col ">
        <h1 className="text-4xl font-bold">
          Access Denied: Editing Permission Required ❌
        </h1>
        <p className="text-center">
          Access to editing this character is restricted to its author.
        </p>
        <Button className="rounded-full" onClick={() => router.push("/menu")}>
          Proceed to Main Menu
        </Button>
      </div>
    </main>
  );
};

export default NoRightsToAccess;
