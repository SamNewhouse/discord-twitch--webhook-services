import axios from "axios";

export const postToDiscord = async (
  channels: string[],
  message: string,
  discordToken: string
) => {
  try {
    for (const channelId of channels) {
      const response = await axios.post(
        `https://discord.com/api/v10/channels/${channelId}/messages`,
        { content: message },
        {
          headers: {
            Authorization: `${discordToken}`,
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
