import type { WebhookEvent } from "@clerk/clerk-sdk-node";
import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const evt = req.body.evt as WebhookEvent;
    switch (evt.type) {
      case 'user.created':
        // Handle user creation event
        const userData = evt.data; // User data received in the event
        console.log(userData)
        break;
      // Add cases for other event types if needed
      default:
        // Handle unknown event types
        res.status(400).json({ error: 'Unsupported event type' });
    }
    res.status(200).end(); // Send a response indicating successful processing
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while processing the webhook event" });
  }
};

export default handler;
