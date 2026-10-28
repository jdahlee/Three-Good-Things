import { useNavigate } from "react-router-dom";
import { styles } from "../styles";

const Home = () => {
  const navigate = useNavigate();

  const handleLogClick = () => {
    navigate("/log");
  };

  const handlePastEntries = () => {
    navigate("/pastentries");
  };

  return (
    <div className={`${styles.root} ${styles.body} `}>
      <h1 className={`${styles.h1} font-bold`}>Welcome to Three Good Things</h1>
      <p className="text-lg text-white max-w-md text-center">
        A way to reflect on the positive moments in your life. Write three good
        things every day.
      </p>
      <button className={`${styles.button} mt-6`} onClick={handleLogClick}>
        Log Three Good Things
      </button>

      <button className={`${styles.button} mt-6`} onClick={handlePastEntries}>
        Look at Past Entries
      </button>
    </div>
  );
};

export default Home;
