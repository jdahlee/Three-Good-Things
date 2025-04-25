import React from "react";
import { useState } from "react";

const LogEntry = ({ ...props }) => {
  const [logEntry1, setLogEntry1] = useState("");
  const [logEntry2, setLogEntry2] = useState("");
  const [logEntry3, setLogEntry3] = useState("");

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

      <button className="mt-10">Save</button>
    </div>
  );
};

export default LogEntry;