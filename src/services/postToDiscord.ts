import axios from "axios";

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const TWITCH_USERNAME = process.env.TWITCH_USERNAME;
const CHANNEL_IDS: string[] = process.env.DISCORD_CHANNELS?.split(",") || [];

if (!DISCORD_TOKEN) {
  console.error("❌ Missing DISCORD_TOKEN environment variable");
}

if (!TWITCH_USERNAME) {
  console.error("❌ Missing TWITCH_USERNAME environment variable");
}

if (CHANNEL_IDS.length === 0) {
  console.error(
    "❌ Missing DISCORD_CHANNELS environment variable or it is empty"
  );
}

const discordMessage = `🎉 I'm live! Come hang out with me! 😊 https://twitch.tv/${TWITCH_USERNAME}`;

export const postToDiscord = async () => {
  try {
    // Post to each channel listed in DISCORD_CHANNELS
    for (const channelId of CHANNEL_IDS) {
      const response = await axios.post(
        `https://discord.com/api/v10/channels/${channelId}/messages`,
        {
          content: discordMessage, // The message to post
        },
        {
          headers: {
            Authorization: `Bearer ${DISCORD_TOKEN}`, // Make sure to add 'Bearer'
            "Content-Type": "application/json",
          },
        }
      );

      console.log(`✅ Posted to channel ${channelId}: ${response.status}`);
    }
  } catch (error: any) {
    if (error.response) {
      console.error(
        "❌ Error posting to Discord:",
        error.response?.data || error.message
      );
    } else {
      console.error("❌ Unexpected error:", error);
    }
  }
};
