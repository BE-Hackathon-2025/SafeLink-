// src/api/helpRequestApi.js

import axios from "axios";
import { API_BASE_URL } from "../config/api.js";

export async function createHelpRequest(requestData) {
  const res = await axios.post(`${API_BASE_URL}/help-requests`, requestData);
  return res.data;
}

export async function fetchHelpRequests(status = null) {
  const url = status 
    ? `${API_BASE_URL}/help-requests?status=${status}`
    : `${API_BASE_URL}/help-requests`;
  const res = await axios.get(url);
  return res.data.requests || [];
}

export async function fetchPendingRequests() {
  const res = await axios.get(`${API_BASE_URL}/help-requests/pending`);
  return res.data.requests || [];
}

export async function fetchActiveRequests() {
  const res = await axios.get(`${API_BASE_URL}/help-requests/active`);
  return res.data.requests || [];
}

export async function updateRequestStatus(id, status) {
  const res = await axios.patch(`${API_BASE_URL}/help-requests/${id}/status`, { status });
  return res.data;
}

export async function updateHelpRequestStatus(id, status) {
  return updateRequestStatus(id, status);
}

