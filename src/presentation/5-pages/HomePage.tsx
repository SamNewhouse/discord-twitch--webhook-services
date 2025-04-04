import { NextPage } from "next";
import { useEffect, useState } from "react";
import { postToDiscord } from "../../services/postToDiscord";
import BaseLayout from "../4-layouts/BaseLayout";

const HomePage: NextPage = () => {
  const [channels, setChannels] = useState<string>(
    typeof window !== "undefined" ? localStorage.getItem("channels") || "" : ""
  );
  const [message, setMessage] = useState<string>(
    typeof window !== "undefined" ? localStorage.getItem("message") || "" : ""
  );
  const [discordToken, setDiscordToken] = useState<string>(
    typeof window !== "undefined"
      ? localStorage.getItem("discordToken") || ""
      : ""
  );

  useEffect(() => {
    // Save fields to localStorage when they change
    if (typeof window !== "undefined") {
      localStorage.setItem("channels", channels);
      localStorage.setItem("message", message);
      localStorage.setItem("discordToken", discordToken);
    }
  }, [channels, message, discordToken]);

  const handleLiveClick = async () => {
    try {
      console.log("📤 Sending live message to Discord...");

      const channelsArray = channels
        .split(",")
        .map((channel) => channel.trim());

      await postToDiscord(channelsArray, message, discordToken);
    } catch (error) {
      console.error("❌ Error:", error);
    }
  };

  return (
    <BaseLayout className="home">
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-center text-2xl font-bold mb-6">Go Live</h2>

          <input
            type="text"
            placeholder="Discord Channels (comma-separated)"
            value={channels}
            onChange={(e) => setChannels(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded bg-gray-50 mb-4"
          />

          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded bg-gray-50 mb-4"
          />

          <input
            type="password"
            placeholder="Discord OAuth Token"
            value={discordToken}
            onChange={(e) => setDiscordToken(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded bg-gray-50 mb-6"
          />

          <button
            onClick={handleLiveClick}
            className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded text-white font-bold"
          >
            Send Live Notification
          </button>
        </div>
      </div>
    </BaseLayout>
  );
};

export default HomePage;
