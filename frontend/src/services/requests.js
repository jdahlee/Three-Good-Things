// Index for all api calls
const API_BASE = "http://127.0.0.1:5000"; // Update if deployed

// Create a new user account
export async function createAccount(username, email, password) {
  const response = await fetch(`${API_BASE}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  return await response.json();
}

// Submit a "3 Good Things" log
export async function makeLog(user_id, things) {
  const response = await fetch(`${API_BASE}/api/entries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id, things }),
  });
  return await response.json();
}

// Fetch a past log for a given date
export async function getLog(user_id, targetDate) {
  const response = await fetch(
    `${API_BASE}/api/entries?user_id=${user_id}&date=${targetDate}`
  );
  return await response.json();
}
