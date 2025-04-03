import axios from "axios";

const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const OAUTH_TOKEN = process.env.TWITCH_OAUTH_TOKEN;
const CALLBACK_URL = process.env.WEBHOOK_URL || "https://localhost:3000";
const USER_ID = process.env.TWITCH_USER_ID;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

if (!CLIENT_ID || !OAUTH_TOKEN || !USER_ID || !WEBHOOK_SECRET) {
  console.error("❌ Missing necessary environment variables");
  process.exit(1);
}

export const subscribeToEventSub = async () => {
  try {
    const response = await axios.post(
      "https://api.twitch.tv/helix/eventsub/subscriptions",
      {
        type: "stream.online",
        version: "1",
        condition: {
          broadcaster_user_id: USER_ID,
        },
        transport: {
          method: "webhook",
          callback: CALLBACK_URL,
          secret: WEBHOOK_SECRET,
        },
      },
      {
        headers: {
          "Client-ID": CLIENT_ID,
          Authorization: `Bearer ${OAUTH_TOKEN}`,
        },
      }
    );
    console.log("✅ EventSub subscription successful:", response.status);
  } catch (error: any) {
    if (error.response) {
      console.error(
        "❌ Error subscribing to EventSub:",
        error.response?.data || error.message
      );
    } else {
      console.error("❌ Unexpected error:", error);
    }
  }
};
