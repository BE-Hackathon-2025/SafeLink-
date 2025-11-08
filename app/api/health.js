// app/api/health.js

import API_CONFIG from "./config.js";

export async function fetchHealth() {
  try {
    const res = await fetch(`${API_CONFIG.BASE_URL}/health`);
    return await res.json();
  } catch (err) {
    console.log("[SafeLink][API] Health fetch error:", err.message);
    return { status: "offline", error: err.message };
  }
}

