/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DISCORD_TOKEN: process.env.DISCORD_TOKEN,
    DISCORD_CHANNELS: process.env.DISCORD_CHANNELS,
    TWITCH_CLIENT_ID: process.env.TWITCH_CLIENT_ID,
    TWITCH_CLIENT_SECRET: process.env.TWITCH_CLIENT_SECRET,
    TWITCH_OAUTH_TOKEN: process.env.TWITCH_OAUTH_TOKEN,
    TWITCH_USER_ID: process.env.TWITCH_USER_ID,
    TWITCH_USERNAME: process.env.TWITCH_USERNAME,
    WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,
    CALLBACK_URL: process.env.CALLBACK_URL,
    PORT: process.env.PORT,
  },
};

export default nextConfig;
