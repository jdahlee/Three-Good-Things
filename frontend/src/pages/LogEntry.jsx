import { useState } from "react";
import { createLog } from "../services/requests";
import { styles } from "../styles";

const LogEntry = () => {
  const [logEntry1, setLogEntry1] = useState("");
  const [logEntry2, setLogEntry2] = useState("");
  const [logEntry3, setLogEntry3] = useState("");

  const handleSave = async () => {
    const logs = [logEntry1, logEntry2, logEntry3];
    const result = await createLog(logs);
    console.log("Created Log:", result);
    setLogEntry1("");
    setLogEntry2("");
    setLogEntry3("");
    if (result.error) {
      alert(`${result.error}`);
    }
  };

  return (
    <div className={styles.body}>
      <h1 className="text-white">Write three good things about today!</h1>
      <div className={styles.logGrid}>
        <div className={styles.textareaWrapper}>
          <textarea
            value={logEntry1}
            onChange={(e) => setLogEntry1(e.target.value)}
            placeholder="Log 1: "
            className={styles.textarea}
          />
        </div>
        <div className={styles.textareaWrapper}>
          <textarea
            value={logEntry2}
            onChange={(e) => setLogEntry2(e.target.value)}
            placeholder="Log 2: "
            className={styles.textarea}
          />
        </div>
        <div className={styles.textareaWrapper}>
          <textarea
            value={logEntry3}
            onChange={(e) => setLogEntry3(e.target.value)}
            placeholder="Log 3: "
            className={styles.textarea}
          />
        </div>
      </div>

      <button onClick={handleSave} className="mt-10">
        Save
      </button>
    </div>
  );
};

export default LogEntry;
