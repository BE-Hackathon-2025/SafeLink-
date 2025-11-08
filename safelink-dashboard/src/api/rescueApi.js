// src/api/rescueApi.js

import axios from "axios";
import { API_BASE_URL } from "../config/api.js";

export async function fetchRescueStats() {
  const res = await axios.get(`${API_BASE_URL}/rescues/stats`);
  return res.data;
}

export async function fetchRescues() {
  const res = await axios.get(`${API_BASE_URL}/rescues`);
  // API returns: { success: true, count: X, rescues: [...] }
  // Return the rescues array directly
  return res.data.rescues || [];
}

