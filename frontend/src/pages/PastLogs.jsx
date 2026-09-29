import React from "react";
import { useState } from "react";


import { getLog } from "../services/requests";


const LogFind = ({ ...props }) => {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [pastLog, setPastLog] = useState(null);


  const handleFind = async () => {
    setPastLog(null);
    const targetDateString = month + "-" + day + "-" + year;
    setTargetDate(targetDateString);
    const result = await getLog(targetDateString);
    if (result.error) {
      alert(`Ran into the following problem: ${result.error}`);
    } else if (result && result.message == "Log found successfully") {
      setPastLog(result.log.body);
    }
  };


  return (
    <div className="flex flex-col h-full justify-start items-center p-5">
      <h1>Find a past log</h1>
      <div className="flex mt-8 space-x-4">
        <input
          type="text"
          placeholder="Month (mm)"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
        <input
          type="text"
          placeholder="Day (dd)"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
        <input
          type="text"
          placeholder="Year (yyyy)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>


      <button className="mt-10" onClick={handleFind}>
        Find
      </button>


      {pastLog && (
        <div className="mt-10">
          <p className="text-2xl font-bold">Log for {targetDate}</p>
          <div className="mt-4 space-y-2">
            <div>Thing 1: {pastLog.thing_1}</div>
            <div>Thing 2: {pastLog.thing_2}</div>
            <div>Thing 3: {pastLog.thing_3}</div>
          </div>
        </div>
      )}
    </div>
  );
};


export default LogFind;