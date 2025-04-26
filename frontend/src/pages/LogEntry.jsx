import React from "react";
import { useState } from "react";
import { createLog } from "../services/requests";

const LogEntry = ({ ...props }) => {
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
    <div className="flex flex-col h-full justify-start items-center p-5">
      <h1>Write three good things about today!</h1>
      <div className="flex gap-35 mt-20">
        <div className="w-60 h-60 bg-gray-500">
          <textarea
            value={logEntry1}
            onChange={(e) => setLogEntry1(e.target.value)}
            placeholder="Log 1: "
            className="w-full h-full p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 text-gray-800 box-border"
          />
        </div>
        <div className="w-60 h-60 bg-gray-500">
          <textarea
            value={logEntry2}
            onChange={(e) => setLogEntry2(e.target.value)}
            placeholder="Log 2: "
            className="w-full h-full p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 text-gray-800"
          />
        </div>
        <div className="w-60 h-60 bg-gray-500">
          <textarea
            value={logEntry3}
            onChange={(e) => setLogEntry3(e.target.value)}
            placeholder="Log 3: "
            className="w-full h-full p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 text-gray-800"
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