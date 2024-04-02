import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/connect";

// Define a function to handle a PUT request
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } } // we expect to receive an object with a property params, and within that params property, there should be another property id
) => {
  // Extract the 'id' from the 'params' object
  const { id } = params;

  try {
    const character = await prisma.cocCharacter.findUnique({
      where: { id: id },
    });

    return new NextResponse(JSON.stringify(character), {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return new NextResponse(JSON.stringify("An error occurred: " + error), {
      status: 500,
    });
  }
};

export const DELETE = async (
  req: NextRequest,

  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const character = await prisma.cocCharacter.delete({
      where: { id: id },
    });

    return new NextResponse(
      JSON.stringify(
        "The following character was successfully deleted:" + character
      ),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);

    return new NextResponse(JSON.stringify("An error occurred: " + error), {
      status: 500,
    });
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } } 
) => {

  const { id } = params;

  try {
    // Parse the request body
    const body = await req.json();

    // Update the character
    const updatedCharacter = await prisma.cocCharacter.update({
      where: { id: id },
      data: body,
    });

    // Return the updated character
    return new NextResponse(JSON.stringify(updatedCharacter), {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return new NextResponse(JSON.stringify("An error occurred: " + error), {
      status: 500,
    });
  }
};
