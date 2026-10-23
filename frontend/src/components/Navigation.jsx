import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/requests";
// import { AiFillSetting } from "react-icons/ai";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const { authUser, setAuthUser, isLoggedIn } = useAuth();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await logoutUser();
    setAuthUser(null);
    navigate("/"); // Call the logoutUser function to log out the user
  };

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
        {isLoggedIn ? (
          <>
            <li style={{ display: "flex", justifyContent: "right" }}>
              {authUser.username}
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/create">Create Account</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
        <div className="relative inline-block ml-auto" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <span className="text-4xl border-2 w-3 h-3 bg-black"></span>
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded shadow-lg z-10">
              <ul className="text-sm text-gray-700">
                <li>Light Mode</li>
                <li>Help</li>
                {isLoggedIn ? (
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="bg-transparent border-0 p-0 m-0 text-inherit text-left cursor-pointer font-inherit text-sm"
                    >
                      Log Out
                    </button>
                  </li>
                ) : null}
              </ul>
            </div>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navigation;
