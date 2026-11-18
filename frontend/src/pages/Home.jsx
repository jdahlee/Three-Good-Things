import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStreak } from "../services/requests";

const Home = () => {
  const navigate = useNavigate();
  const [streak, setStreak] = useState(null);
  const [streakError, setStreakError] = useState("");
  const [loadingStreak, setLoadingStreak] = useState(true);

  useEffect(() => {
    let cancelled = false;

    getStreak()
      .then((result) => {
        if (!cancelled) {
          setStreak(result.streak);
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setStreakError(error.message);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoadingStreak(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleLogClick = () => {
    navigate("/log");
  };

  const handlePastEntries = () => {
    navigate("/pastentries");
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center p-5 space-y-6 text-white">
      <h1 className="text-3xl font-bold">Welcome to Three Good Things</h1>

      <p className="text-lg text-white max-w-md text-center">
        A way to reflect on the positive moments in your life. Write three good
        things every day.
      </p>

      <section
        className="rounded-lg bg-white/10 px-6 py-4 text-center"
        aria-live="polite"
        aria-label="Current logging streak"
      >
        {loadingStreak ? (
          <p>Loading your streak...</p>
        ) : streakError ? (
          <p>{streakError}</p>
        ) : (
          <>
            <p className="text-2xl font-bold">
              {streak} {streak === 1 ? "day" : "days"}
            </p>
            <p className="text-sm">
              {streak === 0
                ? "Start a streak by adding a log today."
                : "in a row"}
            </p>
          </>
        )}
      </section>

      <button
        className="mt-6 px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition"
        onClick={handleLogClick}
      >
        Log Three Good Things
      </button>

      <button
        className="mt-6 px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition"
        onClick={handlePastEntries}
      >
        Look at Past Entries
      </button>
    </div>
  );
};

export default Home;
