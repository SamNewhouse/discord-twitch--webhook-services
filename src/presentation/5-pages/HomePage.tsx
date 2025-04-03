import { NextPage } from "next";
import { postToDiscord } from "../../services/postToDiscord";
import LiveButton from "../1-atoms/LiveButton";
import BaseLayout from "../4-layouts/BaseLayout";

const HomePage: NextPage = () => {
  const handleLiveClick = async () => {
    try {
      console.log("📤 Sending live message to Discord...");
      const message = "Twitch stream is now online!";
      await postToDiscord(message);
    } catch (error) {
      console.error("❌ Error:", error);
    }
  };

  return (
    <BaseLayout className="home">
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="mt-6">
          <LiveButton onClick={handleLiveClick}>Go Live</LiveButton>
        </div>
      </div>
    </BaseLayout>
  );
};

export default HomePage;
