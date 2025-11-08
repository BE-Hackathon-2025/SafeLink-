// src/api/firstAidApi.js

import axios from "axios";

const API_BASE = "http://localhost:4000/api";

export async function getFirstAidInstructions(description) {
  const res = await axios.post(`${API_BASE}/first-aid`, {
    description,
  });
  return res.data.instructions;
}

