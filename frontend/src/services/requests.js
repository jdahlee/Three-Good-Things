// Index for all api calls
const API_BASE = "http://127.0.0.1:5000"; // Update if deployed

// Create a new user account
// TODO test this method
export async function createUser(username, email, password) {
  const response = await fetch(`${API_BASE}/api/users/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  const responseData = await response.json();

  // set current userId if successful creation
  if (responseData && responseData["user_id"]) {
    localStorage.setItem("userId", responseData["user_id"]);
  }

  return responseData;
}

// Login a user
// TODO implement + test
export async function loginUser(username, password) {
  const response = await fetch(
    `${API_BASE}/api/users/login?username=${username}&password=${password}`
  );

  const responseData = await response.json();

  // set current userId if successful creation
  if (responseData && responseData["user_id"]) {
    localStorage.setItem("userId", responseData["user_id"]);
  }

  return responseData;
}

// Logout a user
// TODO implement + test
export function logoutUser() {
  // clear the userId key from localStorage
}

// Create a log
// TODO implement + test
export async function createLog(things) {
  // TODO determine how you want things to be structure. Example as an array vs a map

  // Add userId as stored from during either login or creation
  const userId = localStorage.getItem("userId");

  // Post to backend
  const response = await fetch(`${API_BASE}/api/logs/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, things }),
  });

  return await response.json();
}

// Fetch a past log for a given date
// TODO implement + test
export async function getLog(targetDate) {
  // Add userId as stored from during either login or creation
  const userId = localStorage.getItem("userId");

  // Fetch from backend
  const response = await fetch(
    `${API_BASE}/api/entries?userId=${userId}&date=${targetDate}`
  );
  return await response.json();
}
