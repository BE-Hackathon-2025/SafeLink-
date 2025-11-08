// app/services/storage/ReliefRequestStore.js
// Persistent store for relief / donation requests

import * as fs from "fs";
import path from "path";

const RELIEF_DB_PATH = path.resolve("SafeLink_ReliefRequests.json");

const EARTH_RADIUS_KM = 6371;
function toRad(deg) { return (deg * Math.PI) / 180; }
function distanceKm(a, b) {
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

class ReliefRequestStore {
  constructor() {
    this.cache = [];
    this.initialized = false;
  }

  async init() {
    if (this.initialized) return;
    if (!fs.existsSync(RELIEF_DB_PATH)) {
      fs.writeFileSync(RELIEF_DB_PATH, JSON.stringify([]));
    }
    this.cache = JSON.parse(fs.readFileSync(RELIEF_DB_PATH, "utf8"));
    this.initialized = true;
    console.log("[SafeLink][Relief] 📄 Loaded relief requests store");
  }

  save() {
    fs.writeFileSync(RELIEF_DB_PATH, JSON.stringify(this.cache, null, 2));
  }

  async createRequest(request) {
    await this.init();
    this.cache.push(request);
    this.save();
    console.log(`[SafeLink][Relief] 💾 Created relief request ${request.id}`);
    return request;
  }

  async updateStatus(id, status) {
    await this.init();
    const idx = this.cache.findIndex((r) => r.id === id);
    if (idx === -1) return null;
    this.cache[idx].status = status;
    this.cache[idx].updatedAt = new Date().toISOString();
    this.save();
    console.log(`[SafeLink][Relief] 🔄 Updated request ${id} → ${status}`);
    return this.cache[idx];
  }

  async getOpenRequests() {
    await this.init();
    return this.cache.filter((r) => r.status === "open" || r.status === "partial");
  }

  async getAllRequests() {
    await this.init();
    return this.cache;
  }

  async getRequestsByArea(center, radiusKm) {
    await this.init();
    if (!center || radiusKm == null) return this.getOpenRequests();

    const withCoords = this.cache.filter(
      (r) =>
        r.location &&
        typeof r.location.lat === "number" &&
        typeof r.location.lon === "number"
    );

    return withCoords.filter((r) => {
      const d = distanceKm(center, r.location);
      return d <= radiusKm && (r.status === "open" || r.status === "partial");
    });
  }

  async clearAll() {
    this.cache = [];
    this.save();
    console.log("[SafeLink][Relief] 🧹 Cleared all relief requests");
  }
}

export default new ReliefRequestStore();
