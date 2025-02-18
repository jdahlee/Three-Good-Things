import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ ...props }) => {
  return (
    <nav>
      <ul className="flex pt-5 px-3 space-x-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
