import axios from "axios";

export const postToDiscord = async (
  channels: string[],
  message: string,
  discordToken: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    for (const channelId of channels) {
      await axios.post(
        `https://discord.com/api/v10/channels/${channelId}/messages`,
        { content: message },
        {
          headers: {
            Authorization: `${discordToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(`✅ Posted to channel ${channelId}`);
    }

    return { success: true };
  } catch (error: any) {
    console.error(
      "❌ Error posting to Discord:",
      error.response?.data || error.message
    );

    return {
      success: false,
      error: error.response?.data?.message || "Unknown error",
    };
  }
};
