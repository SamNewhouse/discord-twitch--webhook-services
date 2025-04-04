import axios from "axios";
import { Check, X } from "lucide-react";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import BaseLayout from "../4-layouts/BaseLayout";

const secretPassword = process.env.DISCORD_API_SECRET;

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
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("channels", channels);
      localStorage.setItem("message", message);
      localStorage.setItem("discordToken", discordToken);
    }
  }, [channels, message, discordToken]);

  const handleLiveClick = async () => {
    setIsLoading(true);
    setIsSuccess(null);

    console.log("📤 Sending live message to Discord...");

    const channelsArray = channels.split(",").map((channel) => channel.trim());

    if (password !== secretPassword) {
      console.error("❌ Incorrect password");
      setIsSuccess(false);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/discord-message", {
        channels: channelsArray,
        message,
        discordToken,
      });

      if (response.status === 200) {
        setIsSuccess(true);
        console.log("✅", response.data.message);
      } else {
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("❌ Error sending message to Discord:", error);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BaseLayout className="home">
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-center text-2xl font-bold mb-6">Go Live</h2>

          <input
            type="text"
            placeholder="Enter Discord Channels (comma-separated)"
            value={channels}
            onChange={(e) => setChannels(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded bg-gray-50 mb-4"
          />

          <textarea
            placeholder="Enter your message (e.g., 'I'm live!')"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded bg-gray-50 mb-4"
          />

          <input
            type="text"
            placeholder="Enter Discord OAuth Token"
            value={discordToken}
            onChange={(e) => setDiscordToken(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded bg-gray-50 mb-4"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded bg-gray-50 mb-6"
          />

          <button
            onClick={handleLiveClick}
            disabled={isLoading}
            className={`w-full p-3 rounded text-white font-bold flex items-center justify-center gap-2
              ${
                isLoading
                  ? "bg-gray-400"
                  : isSuccess === true
                  ? "bg-green-500"
                  : isSuccess === false
                  ? "bg-red-500"
                  : "bg-blue-500 hover:bg-blue-600"
              } 
              transition-colors duration-300 ease-in-out`}
          >
            {isLoading ? (
              <span>Loading...</span>
            ) : isSuccess === true ? (
              <>
                <Check size={20} />
                <span>Success!</span>
              </>
            ) : isSuccess === false ? (
              <>
                <X size={20} />
                <span>Failed</span>
              </>
            ) : (
              "Send Live Notification"
            )}
          </button>
        </div>
      </div>
    </BaseLayout>
  );
};

export default HomePage;
