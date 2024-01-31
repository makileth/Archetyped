import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  
 if (req.method === 'POST') {
    const { user } = req.body;

    try {
      // Extract the necessary fields from the user object
      const { id } = user;

      // Create a new User record in the database
      const newUser = await prisma.user.create({
        data: {
          id: id,
        },
      });

      // Send a successful response
      res.status(200).json(newUser);
    } catch (error) {
      // Log the error and send an error response
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating the user' });
    }
 } else {
    // Handle any non-POST requests
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
 }
}
