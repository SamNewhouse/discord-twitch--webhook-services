import { NextApiRequest, NextApiResponse } from "next";
import { postToDiscord } from "../../services/postToDiscord";

const TWITCH_USER_ID = process.env.TWITCH_USER_ID;
const TWITCH_USERNAME = process.env.TWITCH_USERNAME;
const DISCORD_CHANNELS = process.env.DISCORD_CHANNELS?.split(",") || [];
const DISCORD_TOKEN = process.env.DISCORD_TOKEN!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const eventData = req.body;
      console.log(
        "Received Twitch event data:",
        JSON.stringify(eventData, null, 2)
      );

      if (eventData?.subscription?.type === "stream.online") {
        const broadcasterId = eventData.data[0]?.broadcaster_user_id;
        const broadcasterName = eventData.data[0]?.broadcaster_user_name;

        console.log(`Event Data for Stream Online:`);
        console.log(`- broadcaster_user_id: ${broadcasterId}`);
        console.log(`- broadcaster_user_name: ${broadcasterName}`);

        if (broadcasterId === TWITCH_USER_ID) {
          console.log(`Stream is now online: ${TWITCH_USERNAME}`);

          // Construct message
          const message = `🎉 I'm live! Come hang out with me! 😊 https://twitch.tv/${TWITCH_USERNAME}`;

          // Send message to Discord
          await postToDiscord(DISCORD_CHANNELS, message, DISCORD_TOKEN);

          return res
            .status(200)
            .json({ message: "Twitch event processed and sent to Discord" });
        } else {
          console.log(`Stream event received, but not for: ${TWITCH_USERNAME}`);
        }
      }

      return res.status(200).json({ message: "Event received and processed" });
    } catch (error) {
      console.error("❌ Error processing event:", error);
      return res.status(500).json({ message: "Failed to process event" });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
