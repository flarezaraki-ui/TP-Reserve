

const UserService = {

  getProfile(userId){
    return apiRequest(API_CONFIG.userService, `/api/View/users/${userId}`);
  },

  async modifyProfile(userDetails){
    const userId = getSession().user.userId;
    const email = getSession().user.email;
    const updatedUserDetails = {
      User_id: userId,
      User_email: email,
      User_picture: userDetails.User_picture || document.getElementById("userPicture").value,
      UserName: userDetails.User_prefered_username || document.getElementById("userPreferredUsername").value
    };

    const response = await apiRequest(API_CONFIG.userService, "/api/Modify/user", "PUT", updatedUserDetails);

    // Update the local session data instantly so the UI reflects the change
    const currentSession = getSession();
    if (currentSession && currentSession.user) {
      currentSession.user.prefered_username = updatedUserDetails.UserName;
      // Re-save session using your existing storage mechanism (matching auth.js structure)
      localStorage.setItem("session_user", JSON.stringify(currentSession.user));
    }

    return response;
  },

  decodeJWT(token) {
  const payload = token.split(".")[1];
  const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
  return decoded;
  },

  // Calls your User Service login route. That Lambda is assumed to
  // authenticate against Cognito and return a token + basic profile.
  async login(email, password) {
    console.log(`${API_CONFIG.userService}/api/User/Login`, email, password);
    const res = await fetch(`${API_CONFIG.userService}/api/User/Login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      throw new Error("Invalid email or password");
    }

    const data = await res.json();
    console.log("Raw response:", data);

    const claims = this.decodeJWT(data.idToken);
    console.log("Decoded ID token claims:", claims);

    saveSession(data.accessToken, {
      email: claims.email,
      prefered_username: claims.preferred_username,
      userId: data.user_id,
    });

    console.log("Session after login:", getSession());

    return data;
  },

  async signup(userDetails) {
  console.log(`${API_CONFIG.userService}/api/User/Register`, userDetails);
  const res = await fetch(`${API_CONFIG.userService}/api/User/Register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userDetails)
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Signup failed: ${text}`);
  }

  return res.json();
},
  async confirmSignup({email, confirmationCode}) {
    const res = await fetch(`${API_CONFIG.userService}/api/User/Confirm`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, confirmationCode })
    });

    if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Confirmation failed: ${text}`);
  }

    return res.json();

  },
};
