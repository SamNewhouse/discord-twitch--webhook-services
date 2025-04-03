import { NextApiRequest, NextApiResponse } from "next";
import { postToDiscord } from "../../services/postToDiscord";

// Your secret key, set in the environment variables
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Handle incoming event data from Twitch
  if (req.method === "POST") {
    try {
      const eventData = req.body;

      console.log("Received event data:", eventData);

      if (eventData?.subscription?.type === "stream.online") {
        console.log("Stream is now online!");
        await postToDiscord();
      }

      return res.status(200).json({ message: "Event received and processed" });
    } catch (error) {
      console.error("❌ Error processing event:", error);
      return res.status(500).json({ message: "Failed to process event" });
    }
  }

  // Default response for unsupported HTTP methods
  return res.status(405).json({ message: "Method Not Allowed" });
}
