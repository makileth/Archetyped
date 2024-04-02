import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/connect";
import { PrismaClient, Prisma } from "@prisma/client";
import { auth } from "@clerk/nextjs";

export const GET = async (req: NextRequest) => {
  const { userId, getToken } = auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const characters = await prisma.cocCharacter.findMany({
      where: {
        authorId: userId,
      },
    });

    return new NextResponse(JSON.stringify(characters), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Oops! Something went wrong!", { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const characters = await prisma.cocCharacter.create({
      data: body,
    });

    return new NextResponse(JSON.stringify(characters), { status: 201 });
  } catch (error) {
    console.error(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (error.code === "P2002") {
        console.log("There is a unique constraint violation");
      } else {
        // Generic error response for other types of errors
        return new NextResponse(
          JSON.stringify({ message: "Something went wrong!" }),
          { status: 500 }
        );
      }
    }
  }
};



  

