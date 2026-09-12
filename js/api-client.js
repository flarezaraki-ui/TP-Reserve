

async function apiRequest(baseUrl, path, method = "GET", body = null) {
  const options = {
    method,
    headers: authHeaders()
  };

  if (body !== null) {
    options.body = JSON.stringify(body);
  }

  let res;
  try {
    res = await fetch(`${baseUrl}${path}`, options);
  } catch (networkErr) {
    // This is almost always CORS or a wrong URL — see the CORS notes
    // in the setup guide if you hit this.
    throw new Error(`Network error calling ${path}: ${networkErr.message}`);
  }

  if (res.status === 401 || res.status === 403) {
    // Token missing/expired/invalid -> bounce back to login
    clearSession();
    window.location.href = "login.html";
    return null;
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API error ${res.status} on ${path}: ${text}`);
  }

  if (res.status === 204) {
    return null; // e.g. successful DELETE with no body
  }

  return res.json();
}
