import { NextApiRequest, NextApiResponse } from "next";
import { postToDiscord } from "../../services/postToDiscord";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { channels, message, discordToken } = req.body;

      if (!channels || !message || !discordToken) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      await postToDiscord(channels, message, discordToken);

      return res
        .status(200)
        .json({ message: "Message sent to Discord successfully" });
    } catch (error) {
      console.error("❌ Error sending message to Discord:", error);
      return res
        .status(500)
        .json({ error: "Failed to send message to Discord" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
