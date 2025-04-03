import { NextApiRequest, NextApiResponse } from "next";
import { postToDiscord } from "../../services/postToDiscord";
import { validateWebhook } from "../../utils/validateWebhook";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const isValid = validateWebhook(req, res); // Check if webhook is valid
    if (!isValid) {
      return; // If validation fails, return early (response has already been sent)
    }

    try {
      const message = "Twitch stream is now online!";
      await postToDiscord(message);

      res.status(200).json({ message: "Event received and posted to Discord" });
    } catch (error) {
      console.error("Error posting to Discord:", error);
      res.status(500).json({ error: "Failed to post to Discord" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
