// Index for all api calls
const API_BASE = "/api";

// Create a new user account
export async function createUser(username, email, password) {
  const response = await fetch(`${API_BASE}/users/create`, {
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
    const response = await fetch(`${API_BASE}/users/login`, {
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
    const response = await fetch(`${API_BASE}/users/me`, {
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
  await fetch(`${API_BASE}/logs/logout`, {
    method: "POST",
    credentials: "include",
  });
  localStorage.removeItem("userId");
}

// Create a log
export async function createLog(things) {
  // Add userId as stored from during either login or creation
  const userId = localStorage.getItem("userId");
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // Post to backend
  const response = await fetch(`${API_BASE}/logs/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, things, timeZone }),
  });

  return await response.json();
}

// Fetch a past log for a given date
export async function getLog(targetDate) {
  // Add userId as stored from during either login or creation
  const userId = localStorage.getItem("userId");
  // Get timeZone from browser
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // Fetch from backend
  const response = await fetch(
    `${API_BASE}/logs/get?userId=${userId}&date=${targetDate}&timeZone=${timeZone}`,
  );
  return await response.json();
}

// Get streak
export async function getStreak() {
  // Add userId as stored from during either login or creation
  const userId = localStorage.getItem("userId");
  if (!userId) {
    throw new Error("Log in to see your streak.");
  }
  // Get timeZone from browser
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const response = await fetch(
    `${API_BASE}/streak/get?timeZone=${timeZone}&userId=${userId}`,
  );

  if (!response.ok) {
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const responseData = await response.json();
      throw new Error(responseData.error || "Unable to load your streak.");
    }
    throw new Error(`Unable to load your streak (HTTP ${response.status}).`);
  }

  return await response.json();
}
