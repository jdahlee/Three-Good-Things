import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { AiFillSetting } from "react-icons/ai";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setOpen((prev) => !prev);

  return (
    <nav>
      <ul className="flex pt-5 px-3 space-x-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/create">Create Account</Link>
        </li>
        <div className="relative inline-block ml-auto" ref={dropdownRef}>
          <button onClick={toggleDropdown} className="p-2 hover:bg-gray-100 rounded-full">
            <AiFillSetting className="text-4xl"/>
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded shadow-lg z-10">
              <ul className="text-sm text-gray-700">
                <li>Light Mode</li>
                <li>Help</li>
              </ul>
            </div>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navigation;
