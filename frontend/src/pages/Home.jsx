import React from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ ...props }) => {
  const navigate = useNavigate();

  const handleLogClick = () => {
    navigate("/log");
  };

  const handlePastEntries = () => {
    navigate("/pastentries");
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center p-5 space-y-6 bg-white text-black">
      <h1 className="text-3xl font-bold">Welcome to Three Good Things</h1>

      <p className="text-lg text-black max-w-md text-center">
        A way to reflect on the positive moments in your life. Write three good
        things every day.
      </p>

      <button
        className="mt-6 px-6 py-3 bg-blue-700 text-black ounded-lg hover:bg-blue-600 transition"
        onClick={handleLogClick}
      >
        Log Three Good Things
      </button>

      <button
        className="mt-6 px-6 py-3 bg-blue-700 text-black rounded-lg hover:bg-blue-600 transition"
        onClick={handlePastEntries}
      >
        Look at Past Entries
      </button>
    </div>
  );
};

export default Home;
