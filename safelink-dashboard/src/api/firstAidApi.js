// src/api/firstAidApi.js

import axios from "axios";
import { API_BASE_URL } from "../config/api.js";

export async function getFirstAidInstructions(description, includeImages = true) {
  const res = await axios.post(`${API_BASE_URL}/first-aid`, {
    description,
    includeImages,
  });
  return res.data.instructions;
}

