// this file allows components to more efficiently access login state without having to repeat code: Context

import React, { useState, useEffect, useContext } from "react";
import { getCurrentUser } from "../services/requests";
import PropTypes from "prop-types";

// creates context
const AuthContext = React.createContext(null);

// shortcut for using the context in other components
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  // state to hold the current authenticated user, returns current value (null or id and username)
  // and the function to change the value of the state
  const [authUser, setAuthUser] = useState(null);
  // starts as true, signifies checking with backend
  const [loading, setLoading] = useState(true);

  async function refreshUser() {
    // waits for response about current user from backend, sets authUser to that value (null if not logged in)
    const user = await getCurrentUser();
    setAuthUser(user);
  }

  // empty list at end of useEffect means this only runs once per load/refresh
  useEffect(() => {
    // gets user, sets loading to false when done no matter what so app actually renders
    refreshUser().finally(() => setLoading(false));
  }, []);

  // isLoggedIn is true if authUser is not null, false otherwise
  const isLoggedIn = authUser !== null;

  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    refreshUser,
    loading,
  };

  // every component inside provider can read/change stuff from value
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
