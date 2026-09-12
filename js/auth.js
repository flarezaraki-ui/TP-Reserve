

const AUTH_STORAGE_KEY = "jp_auth_session";

function saveSession(token, user) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ token, user }));
}

function getSession() {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

function clearSession() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

function isLoggedIn() {
  return !!getSession();
}

// Every request to Room / Event / Reservation service should include this.
function authHeaders() {
  const session = getSession();
  const headers = { "Content-Type": "application/json" };
  if (session && session.token) {
    headers["Authorization"] = `Bearer ${session.token}`;
  }
  return headers;
}

// Call this at the top of any page that requires login (e.g. dashboard.html)
function requireLogin() {
  if (!isLoggedIn()) {
    window.location.href = "login.html";
  }
}

function logout() {
  clearSession();
  window.location.href = "login.html";
}
