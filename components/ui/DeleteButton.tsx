"use client";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const DeleteButton = ({
  id,
  refetchCharacters,
}: {
  id: string;
  refetchCharacters: () => void;
}) => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const { user } = useUser();

  const userId = user?.id;

  const handleDelete = async () => {
    const response = await fetch(`https://character-verse.vercel.app/api/CharSheets/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId,
      }),
    });

    if (response.ok) {
      await refetchCharacters();
      toast("💥 Character deleted successfully");
    } else {
      const data = await response.json();
      console.log(data);
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="text-red-500 hover:border-transparent hover:text-white w-max h-[1.50rem] border-[0.5px] border-neutral-200 justify-center items-center bg-white hover:bg-red-500 transition duration-300 rounded-full absolute top-1.5 right-2">
        <div className="flex flex-row justify-between items-center">
          <div className=" w-[1rem] h-[1rem] justify-center items-center ml-2 bg-red-500 rounded-full">
            <Image
              src="/assets/delete-badge.svg"
              alt="delete image"
              width={12}
              height={12}
              className="mx-auto mt-0.5"
            />
          </div>
          <p className="px-2 font-semibold text-sm">Delete</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-black">Are you absolutely sure?</DialogTitle>
          <DialogDescription className="pt-1 pb-6">
            This action cannot be undone. This will permanently delete your
            character from our servers.
          </DialogDescription>
          <div className=" flex flex-row gap-2">
            {/* <button
              onClick={handleDelete}
              className="bg-red-500 px-4 py-2 rounded-md w-max text-white hover:bg-black transition duration-300"
              type="submit"
            >
              Delete
            </button>
            <button
              type="submit"
              className="bg-white border-[2px] hover:border-transparent border-neutral-600 px-4 py-2 rounded-md w-max text-black hover:text-white hover:bg-black transition duration-300"
            >
              Cancel
            </button> */}
            <DialogClose asChild>
              <Button
                onClick={handleDelete}
                className="bg-red-500 px-4 py-2 rounded-md w-max text-white hover:bg-black transition duration-300"
                type="submit"
              >
                Delete
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="button"
                className="hover:bg-black hover:text-white "
                variant="secondary"
              >
                Close
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;
