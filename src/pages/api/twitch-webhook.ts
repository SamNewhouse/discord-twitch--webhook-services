import { NextApiRequest, NextApiResponse } from "next";
import { postToDiscord } from "../../services/postToDiscord";

// Your secret key, set in the environment variables
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Handle verification challenge request from Twitch
  if (req.method === "GET") {
    // Twitch sends a challenge to verify the webhook
    const challenge = req.query["hub.challenge"];
    const mode = req.query["hub.mode"];
    const topic = req.query["hub.topic"];
    const secret = req.query["hub.secret"];

    // Check if all parameters match
    if (mode === "subscribe" && challenge && secret === WEBHOOK_SECRET) {
      console.log(`Webhook verification successful for topic: ${topic}`);
      return res.status(200).send(challenge);
    } else {
      return res.status(400).send("Invalid verification request");
    }
  }

  // Handle incoming event data from Twitch
  if (req.method === "POST") {
    try {
      const eventData = req.body;

      console.log("Received event data:", eventData);

      // Here you can handle the event, for example, sending a message to Discord
      // You can use the `postToDiscord` function you previously set up
      await postToDiscord(`Stream update: ${eventData}`);

      return res.status(200).json({ message: "Event received and processed" });
    } catch (error) {
      console.error("Error processing event:", error);
      return res.status(500).json({ message: "Failed to process event" });
    }
  }

  // Default response if method is not GET or POST
  return res.status(405).json({ message: "Method Not Allowed" });
}
