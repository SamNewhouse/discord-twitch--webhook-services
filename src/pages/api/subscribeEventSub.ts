import { NextApiRequest, NextApiResponse } from "next";
import { subscribeToEventSub } from "../../services/subscribeEventSub";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await subscribeToEventSub();
      res.status(200).json({ message: "Successfully subscribed to EventSub" });
    } catch (error) {
      console.error("❌ Error:", error);
      res.status(500).json({ error: "Failed to subscribe to EventSub" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
