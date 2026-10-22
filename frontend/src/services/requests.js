// Index for all api calls
const API_BASE = "/api";

// Create a new user account
export async function createUser(username, email, password) {
  const response = await fetch(`${API_BASE}/users/create`, {
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
export async function loginUser(username, password) {
  try {
    const response = await fetch(
      `${API_BASE}/users/login?username=${encodeURIComponent(
        username,
      )}&password=${encodeURIComponent(password)}`,
    );

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

// Logout a user
export function logoutUser() {
  // clear the userId key from localStorage
  localStorage.removeItem("userId");
}

// Create a log
export async function createLog(things) {
  // Add userId as stored from during either login or creation
  const userId = localStorage.getItem("userId");

  // Post to backend
  const response = await fetch(`${API_BASE}/logs/create`, {
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
    `${API_BASE}/logs/get?userId=${userId}&date=${targetDate}`,
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
