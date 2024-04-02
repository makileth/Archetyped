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
  refetchDndCharacters,
  refetchCocCharacters,
  path,
}: {
  id: string;
  refetchDndCharacters: () => void;
  refetchCocCharacters: () => void;
  path: string;
}) => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const { user } = useUser();

  const userId = user?.id;

  const handleDelete = async () => {
    const response = await fetch(`http://localhost:3000/api/${path}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId,
      }),
    });

    if (response.ok) {
      await refetchDndCharacters();
      await refetchCocCharacters();
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
      <DialogContent className="md:w-[30%] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-neutral-900">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription className="pt-1 pb-6">
            This action cannot be undone. This will permanently delete your
            character from our servers.
          </DialogDescription>
          <div className=" flex flex-row gap-2 justify-between ">
            <DialogClose asChild className="h-[2rem]">
              <Button
                onClick={handleDelete}
                className="bg-red-500 rounded-full px-4 w-max text-white hover:bg-neutral-900 transition duration-300"
                type="submit"
              >
                Delete
              </Button>
            </DialogClose>
            <DialogClose asChild className="h-[2rem]">
              <Button
                type="button"
                className="hover:bg-neutral-900 rounded-full bg-neutral-200 hover:text-white "
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
