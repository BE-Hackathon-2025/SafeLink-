// app/services/storage/SyncManager.js
// Offline message synchronization + resilience layer

import MessageRelay from "../mesh/MessageRelay.js";
import MessageCache from "./MessageCache.js";
import AnalyticsLogger from "./AnalyticsLogger.js";
import HealthMonitor from "./HealthMonitor.js";
import NodeDiscovery from "../mesh/NodeDiscovery.js";
import RouterAI from "../ai/RouterAI.js";

class SyncManager {
  constructor() {
    this.syncInterval = 10000; // every 10 seconds
    this.healthReportInterval = 30000; // every 30 seconds
    this.isOnline = true; // assume online at start
    this.isSyncing = false;
    this.lastSyncTime = null;
    this.healthLog = [];
  }

  // Initialize SyncManager and background tasks
  async init() {
    console.log("[SafeLink] 🔄 SyncManager initializing...");
    await MessageCache.init();
    this.startAutoSync();
    this.startHealthLoop();
  }

  // Check mesh connectivity (simple heuristic)
  async checkConnectivity() {
    const peers = NodeDiscovery.getPeers();
    const connected = peers && peers.length > 0;
    this.isOnline = connected;
    return connected;
  }

  // Perform sync: resend failed/pending messages and update cache
  async sync() {
    if (this.isSyncing) return;
    this.isSyncing = true;

    console.log("[SafeLink] 🔁 Sync cycle started...");
    const connected = await this.checkConnectivity();

    const failedMessages = await MessageCache.getFailedMessages();
    const pendingMessages = (await MessageCache.getAllMessages()).filter(
      (m) => m.status === "pending"
    );

    if (!connected) {
      console.log("[SafeLink] ⚠️ Offline mode — messages queued locally.");
      this.isSyncing = false;
      return;
    }

    const allToSync = [...failedMessages, ...pendingMessages];
    if (allToSync.length === 0) {
      console.log("[SafeLink] ✅ No messages to sync.");
      this.isSyncing = false;
      return;
    }

    for (const msg of allToSync) {
      console.log(`[SafeLink] 🔁 Syncing message ${msg.id}...`);
      await MessageRelay.deliverWithRetry(msg);
      await MessageCache.updateMessage(msg);
    }

    this.lastSyncTime = new Date().toISOString();
    console.log(
      `[SafeLink] ✅ Sync complete at ${this.lastSyncTime} (${allToSync.length} messages processed)`
    );

    this.isSyncing = false;
  }

  // Auto sync loop every X seconds
  startAutoSync() {
    setInterval(async () => {
      try {
        await this.sync();
      } catch (err) {
        console.error("[SafeLink] ❌ AutoSync error:", err.message);
      }
    }, this.syncInterval);
    console.log("[SafeLink] ♻️ AutoSync running every 10s");
  }

  // Health reporting loop
  startHealthLoop() {
    setInterval(async () => {
      const health = await HealthMonitor.collect();
      this.healthLog.push(health);
      console.log(`[SafeLink] 📈 Health snapshot: ${health.reliabilityScore}`);

      // Optional: broadcast health to peers or send to backend
      if (health.reliabilityScore === "Critical") {
        console.log(
          "🚨 Network unstable — triggering AI rerouting recalibration..."
        );
        await RouterAI.recalculateRoutes?.();
      }
    }, this.healthReportInterval);
    console.log("[SafeLink] 🩺 HealthMonitor loop active");
  }

  // Manual flush to clear old messages
  async clearOldMessages(hours = 24) {
    console.log(`[SafeLink] 🧹 Clearing messages older than ${hours}h`);
    await MessageRelay.pruneOldMessages(hours);
  }

  // Export all logs + metrics (for diagnostics or sync upload)
  async exportDiagnostics() {
    const health = await HealthMonitor.collect();
    const messages = await MessageCache.getAllMessages();
    const metrics = AnalyticsLogger.getMetrics();

    const report = {
      timestamp: new Date().toISOString(),
      totalMessages: messages.length,
      metrics,
      health,
      lastSync: this.lastSyncTime,
    };

    console.log("[SafeLink] 📤 Exporting diagnostics report...");
    return report;
  }

  // Force immediate sync manually
  async forceSync() {
    console.log("[SafeLink] ⚡ Manual sync triggered...");
    await this.sync();
  }

  stopAll() {
    console.log("[SafeLink] 🛑 SyncManager stopped (manual call)");
    this.isOnline = false;
  }

  // Rescue event sync methods
  async syncAllRescueEvents() {
    try {
      // Dynamic import to avoid circular dependency
      const RescueLogger = (await import("./RescueLogger")).default;
      const RescueSync = (await import("./RescueSync")).default;
      
      const events = await RescueLogger.getAllEvents();
      if (events.length === 0) {
        console.log("[SafeLink][SyncManager] No rescue events to sync");
        return { success: 0, failed: 0 };
      }

      return await RescueSync.syncAll(events);
    } catch (error) {
      console.error("[SafeLink][SyncManager] Rescue sync error:", error);
      return { success: 0, failed: 0 };
    }
  }

  async autoSyncRescueEvent(event) {
    try {
      const RescueSync = (await import("./RescueSync")).default;
      await RescueSync.autoSync(event);
    } catch (error) {
      console.error("[SafeLink][SyncManager] Auto-sync rescue error:", error);
    }
  }
}

export default new SyncManager();
