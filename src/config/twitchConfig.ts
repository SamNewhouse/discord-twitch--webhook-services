import dotenv from "dotenv";

dotenv.config();

export const twitchConfig = {
  CLIENT_ID: process.env.TWITCH_CLIENT_ID!,
  OAUTH_TOKEN: process.env.TWITCH_OAUTH_TOKEN!,
  USER_ID: process.env.TWITCH_USER_ID!,
  CALLBACK_URL: process.env.WEBHOOK_URL!,
  WEBHOOK_SECRET: process.env.WEBHOOK_SECRET!,
};
