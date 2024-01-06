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
    const character = await prisma.character.findUnique({
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

// export const DELETE = async (
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) => {

//   const { id } = params;

//   console.log('The Session is:' + session)

//   console.log('The ID is:' + id)

//   if (session?.user.isAdmin) {

//     try {

//       console.log('The Session is:' + session)

//       console.log('The ID is:' + id)

//       const character = await prisma.character.delete({
//         where: { id: id },
//       });

//       return new NextResponse(
//         JSON.stringify(
//           "The following character was successfully deleted:" + character
//         ),
//         {
//           status: 200,
//         }
//       );
//     } catch (error) {
//       console.log(error);

//       return new NextResponse(JSON.stringify("An error occurred: " + error), {
//         status: 500,
//       });
//     }
//   }
//   return new NextResponse(JSON.stringify("You are not an admin!"), {
//     status: 403,
//   });
  

// };