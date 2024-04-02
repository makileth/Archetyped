"use client";
import { Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";

export function CopyButton({ id, path }: { id: string; path: string }) {
  const router = useRouter();

  const [copied, setCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(
        `https://archetyped.vercel.app/${path}/${id}`
      );
      console.log("URL copied to clipboard");
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy URL: ", err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-neutral-900 flex hover:border-transparent hover:text-white w-max px-4 md:px-[2rem] h-[2rem] border-[0.5px] border-neutral-200 justify-center items-center bg-white hover:bg-neutral-900 transition duration-300 rounded-full top-1.5 right-[6rem]"
        >
          <div className="flex flex-row justify-between items-center mt-[0.10rem]">
            <div className=" w-[1rem] h-[1rem] justify-center items-center ml-2 bg-neutral-200 rounded-full">
              <Image
                src="/assets/link.svg"
                alt="edit image"
                width={12}
                height={12}
                className="mx-auto mt-[0.14rem]"
              />
            </div>
            <p className="px-2 font-semibold text-sm">Share</p>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-neutral-900">Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to see your character sheet.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={`https://archetyped.vercel.app/${path}/${id}`}
              readOnly
              className="rounded-full"
            />
          </div>

          <Button onClick={handleCopyClick} size="sm" className="px-3 h-8">
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <div className="sm:justify-start flex flex-col gap-3">
          <p
            className={`text-green-500 text-sm ${
              copied == true ? "block" : "hidden"
            }`}
          >
            Copied to the clipboard!
          </p>
          <DialogClose asChild>
            <Button
              type="button"
              className="hover:bg-neutral-900 rounded-full transition duration-300 w-[25%] hover:text-white"
              variant="secondary"
              onClick={() => {
                setCopied(false);
              }}
            >
              Close
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
