import axios from "axios";

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_IDS: string[] = process.env.DISCORD_CHANNELS?.split(",") || [];

if (!DISCORD_TOKEN) {
  console.error("❌ Missing DISCORD_TOKEN environment variable");
}

if (CHANNEL_IDS.length === 0) {
  console.error(
    "❌ Missing DISCORD_CHANNELS environment variable or it is empty"
  );
}

export const postToDiscord = async (message: string) => {
  try {
    for (const channelId of CHANNEL_IDS) {
      const response = await axios.post(
        `https://discord.com/api/v10/channels/${channelId}/messages`,
        {
          content: message,
        },
        {
          headers: {
            Authorization: DISCORD_TOKEN,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(`✅ Posted to channel ${channelId}: ${response.status}`);
    }
  } catch (error: any) {
    if (error.response) {
      console.error("❌ Error posting to Discord:", error.response.data);
    } else {
      console.error("❌ Unexpected error:", error);
    }
  }
};
