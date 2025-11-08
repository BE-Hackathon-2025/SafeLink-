// app/api/sync.js

import API_CONFIG from "./config.js";

export async function pushDiagnostics(report) {
  try {
    const res = await fetch(`${API_CONFIG.BASE_URL}/sync/diagnostics`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(report),
    });
    return await res.json();
  } catch (err) {
    console.log("[SafeLink][API] Diagnostics push error:", err.message);
    return { ok: false, error: err.message };
  }
}

