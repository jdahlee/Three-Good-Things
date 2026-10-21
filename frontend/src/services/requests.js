// Index for all api calls
const API_BASE = "http://localhost:5000"; // Update if deployed

// Create a new user account
export async function createUser(username, email, password) {
  const response = await fetch(`${API_BASE}/api/users/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
    credentials: "include",
  });

  const responseData = await response.json();

  // set current userId if successful creation
  if (responseData && responseData["user_id"]) {
    localStorage.setItem("userId", responseData["user_id"]);
  }

  return responseData;
}

// Login a user using POST method and allowing session cookies
export async function loginUser(username, password) {
  try {
    const response = await fetch(`${API_BASE}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    const responseData = await response.json();

    if (!response.ok || !responseData["user_id"]) {
      throw new Error("Login failed");
    }

    localStorage.setItem("userId", responseData["user_id"]);
    return responseData;
  } catch (error) {
    console.error("Login error:", error.message);
    return { error: "Login failed" };
  }
}

// retrieve the current logged-in user
// if the backend sees this function return null, it treats it as if the user is logged out
export async function getCurrentUser() {
  try {
    const response = await fetch(`${API_BASE}/api/users/me`, {
      credentials: "include",
    });
    // if the response is not ok, return null to indicate no user is logged in
    if (!response.ok) return null;
    // succesful: return response body as a JSON object containing user_id and username
    return await response.json();
    // if any other errors occur (network issues), return null to indicate no user is logged in i/o crashing the app
  } catch {
    return null;
  }
}

// Logout a user
export async function logoutUser() {
  await fetch(`${API_BASE}/api/logs/logout`, {
    method: "POST",
    credentials: "include",
  });
  localStorage.removeItem("userId");
}

// Create a log
export async function createLog(things) {
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
export async function getLog(targetDate) {
  // Add userId as stored from during either login or creation
  const userId = localStorage.getItem("userId");

  // Fetch from backend
  const response = await fetch(
    `${API_BASE}/api/logs/get?userId=${userId}&date=${targetDate}`,
  );
  return await response.json();
}
