
import prisma from '@/app/utils/connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from "next/server";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === 'POST') {

//     const { username } = req.body;

//     if (!username) {
//       return res.status(400).json({ error: 'Username is required' });
//     }

//     try {
//       const user = await prisma.user.create({
//         data: {
//           username: username,
//           onboarded: true,
//         },
//       });

//       res.status(201).json(user);
//     } catch (error) {
//       console.error('Error creating user:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method Not Allowed' });
//   }
// }

export const POST = async (req: NextRequest) => {
  try {
    // Destructure username from the request body
    const { username } = await req.json();

    // Check if username is provided
    if (!username) {
      return new NextResponse(JSON.stringify({ error: 'Username is required' }), { status: 400 });
    }

    // Create user using Prisma
    const user = await prisma.user.create({
      data: {
        username: username,
        onboarded: true,
      },
    });

    // Respond with the created user
    return new NextResponse(JSON.stringify(user), { status: 201 });
  } catch (error) {
    // Handle errors
    console.error('Error creating user:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};
