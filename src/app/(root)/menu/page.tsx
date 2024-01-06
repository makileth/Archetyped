"use client";

import Image from "next/image";
import { UserButton, currentUser, useUser } from "@clerk/nextjs";

import ProfilePage from "../../../../components/cards/profile";
import CreateChar from "../../../../components/cards/CreateChar";
import ManageChar from "../../../../components/cards/ManageChar";

export default function Menu() {
  // const user = await currentUser();

  // if (!user) return null;

  return (
    <section className="min-h-[100vh] max-w-4xl mx-auto py-36">
      <ProfilePage />
      <div className="flex flex-1 flex-col md:flex-row my-12 gap-6 mx-auto">
        <CreateChar />
        <ManageChar />
      </div>
    </section>
  );
}
