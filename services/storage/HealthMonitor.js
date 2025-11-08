// app/services/storage/HealthMonitor.js
// Collects analytics from across SafeLink Mesh AI and reports system health

import AnalyticsLogger from "./AnalyticsLogger.js";
import MessageCache from "./MessageCache.js";
import RouterAI from "../ai/RouterAI.js";

class HealthMonitor {
  constructor() {
    this.status = {
      uptimeStart: Date.now(),
      totalMessages: 0,
      successRate: 0,
      avgRetries: 0,
      avgLatency: 0,
      activePeers: 0,
      failedPeers: 0,
      reliabilityScore: "Good",
      syncLag: 0,
    };
  }

  // Collect metrics from subsystems
  async collect() {
    const metrics = AnalyticsLogger.getMetrics();
    const messages = await MessageCache.getAllMessages().catch(() => []);
    const peers = await RouterAI.getAllPeers?.().catch(() => []);
    const now = Date.now();

    const delivered = metrics.delivered || 0;
    const total = metrics.total || 0;
    const failed = metrics.failed || 0;
    const pending = metrics.pending || 0;
    const successRate = total > 0 ? ((delivered / total) * 100).toFixed(1) : 0;

    const avgRetries =
      messages.length > 0
        ? (
            messages.reduce((sum, m) => sum + (m.retryCount || 0), 0) /
            messages.length
          ).toFixed(2)
        : 0;

    const uptimeHours = ((now - this.status.uptimeStart) / 3600000).toFixed(2);
    const failedPeers =
      peers?.filter((p) => p.reliability && p.reliability < 0.5)?.length || 0;
    const activePeers = peers?.length || 0;

    let reliabilityScore = "Good";
    if (successRate < 60 || failedPeers > 5) reliabilityScore = "Critical";
    else if (successRate < 80) reliabilityScore = "Warning";

    this.status = {
      uptimeHours,
      totalMessages: total,
      delivered,
      failed,
      pending,
      successRate,
      avgRetries,
      activePeers,
      failedPeers,
      reliabilityScore,
      syncLag: Math.max(0, pending - failed),
      timestamp: new Date().toISOString(),
    };

    return this.status;
  }

  // Print a human-readable summary to console
  async printSummary() {
    const s = await this.collect();
    console.log("\n🧠 [SafeLink] Network Health Summary");
    console.log("─────────────────────────────────────");
    console.table([
      { Metric: "Uptime (hrs)", Value: s.uptimeHours },
      { Metric: "Total Messages", Value: s.totalMessages },
      { Metric: "Delivered", Value: s.delivered },
      { Metric: "Failed", Value: s.failed },
      { Metric: "Pending", Value: s.pending },
      { Metric: "Success Rate", Value: `${s.successRate}%` },
      { Metric: "Avg Retries", Value: s.avgRetries },
      { Metric: "Active Peers", Value: s.activePeers },
      { Metric: "Failed Peers", Value: s.failedPeers },
      { Metric: "Reliability", Value: s.reliabilityScore },
      { Metric: "Sync Lag", Value: s.syncLag },
    ]);

    if (s.reliabilityScore === "Critical")
      console.log("🚨 Network Health Critical: too many failures or offline peers!");
    else if (s.reliabilityScore === "Warning")
      console.log("⚠️  Network Health Warning: success rate below target threshold.");
    else
      console.log("✅ Mesh Network Healthy and Stable.");
  }

  // Export health report for dashboard or logs
  async exportJSON() {
    const s = await this.collect();
    return JSON.stringify(s, null, 2);
  }

  // Reset health counters (for testing or fresh run)
  reset() {
    this.status = {
      uptimeStart: Date.now(),
      totalMessages: 0,
      successRate: 0,
      avgRetries: 0,
      avgLatency: 0,
      activePeers: 0,
      failedPeers: 0,
      reliabilityScore: "Good",
      syncLag: 0,
    };
    console.log("[SafeLink] ♻️ HealthMonitor reset.");
  }
}

export default new HealthMonitor();
