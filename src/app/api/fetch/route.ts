
import prisma from "@/app/utils/connect";
import { NextResponse } from "next/server";



export const GET = async () => {
  try {
    const characters = await prisma.character.findMany();
    return new NextResponse(JSON.stringify(characters), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Oops! Something went wrong!", { status: 500 });
  }
};

export const POST = () => {
  return new NextResponse("Hi", { status: 200 });
};
