"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const NoSlotsPage = () => {
  const router = useRouter();

  return (
    <div
     className="text-neutral-900 min-h-[100vh] py-36 text-center px-6 mx-auto max-w-4xl items-center gap-8 flex flex-col "
    >
      <h1 className="text-4xl font-bold">You have no more free slots 😱</h1>
      <p className="text-center max-w-2xl">
        As a free tier user, you can create up to 6 characters. Consider buying
      a subscription or deleting some characters to free up slots.
      </p>
      <Button className="rounded-full" onClick={() => router.push("/manage")}>
        Go to my characters
      </Button>
    </div>
  );
};

export default NoSlotsPage;
