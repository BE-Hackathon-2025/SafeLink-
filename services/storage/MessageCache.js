// app/services/storage/MessageCache.js
// Local persistent message database with SQLite fallback

import * as fs from "fs";
import path from "path";

// Lazy import SQLite for React Native; fallback to JSON for Node testing
let SQLite;
try {
  SQLite = (await import("react-native-sqlite-storage")).default;
} catch {
  console.log("[SafeLink] ⚙️ Using JSON fallback for MessageCache");
}

// Database filename for JSON mode
const DB_PATH = path.resolve("SafeLink_MessageCache.json");

class MessageCache {
  constructor() {
    this.isSQLite = !!SQLite;
    this.db = null;
    this.memoryCache = []; // fallback
  }

  // Initialize SQLite or load JSON
  async init() {
    if (this.isSQLite) {
      this.db = SQLite.openDatabase(
        { name: "safelink.db", location: "default" },
        () => console.log("[SafeLink] 📦 SQLite DB opened"),
        (err) => console.error("[SafeLink] ❌ SQLite open error:", err)
      );

      await this.createTable();
    } else {
      if (!fs.existsSync(DB_PATH)) {
        fs.writeFileSync(DB_PATH, JSON.stringify([]));
      } else {
        this.memoryCache = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
      }
      console.log("[SafeLink] 📄 Loaded JSON cache");
    }
  }

  async createTable() {
    if (!this.db) return;
    const query = `
      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        senderId TEXT,
        receiverId TEXT,
        data TEXT,
        encrypted INTEGER,
        signature TEXT,
        status TEXT,
        timestamp TEXT,
        hopCount INTEGER,
        retryCount INTEGER,
        meta TEXT
      );
    `;
    await this.executeSql(query);
  }

  async executeSql(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          sql,
          params,
          (_, result) => resolve(result),
          (_, err) => reject(err)
        );
      });
    });
  }

  // Save a new message
  async storeMessage(msg) {
    if (this.isSQLite && this.db) {
      const q = `
        INSERT OR REPLACE INTO messages
        (id, senderId, receiverId, data, encrypted, signature, status, timestamp, hopCount, retryCount, meta)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `;
      await this.executeSql(q, [
        msg.id,
        msg.senderId,
        msg.receiverId,
        msg.data,
        msg.encrypted ? 1 : 0,
        msg.signature,
        msg.status,
        msg.timestamp,
        msg.hopCount || 0,
        msg.retryCount || 0,
        JSON.stringify(msg.meta || {}),
      ]);
    } else {
      this.memoryCache.push(msg);
      fs.writeFileSync(DB_PATH, JSON.stringify(this.memoryCache, null, 2));
    }
    console.log(`[SafeLink] 💾 Stored message ${msg.id}`);
  }

  // Update existing message (status, retries, etc.)
  async updateMessage(msg) {
    if (this.isSQLite && this.db) {
      const q = `
        UPDATE messages SET
          status = ?, retryCount = ?, hopCount = ?
        WHERE id = ?;
      `;
      await this.executeSql(q, [
        msg.status,
        msg.retryCount,
        msg.hopCount,
        msg.id,
      ]);
    } else {
      const idx = this.memoryCache.findIndex((m) => m.id === msg.id);
      if (idx !== -1) {
        this.memoryCache[idx] = msg;
        fs.writeFileSync(DB_PATH, JSON.stringify(this.memoryCache, null, 2));
      }
    }
    console.log(`[SafeLink] 🔄 Updated message ${msg.id} (${msg.status})`);
  }

  // Fetch all messages
  async getAllMessages() {
    if (this.isSQLite && this.db) {
      const res = await this.executeSql("SELECT * FROM messages;");
      const rows = [];
      for (let i = 0; i < res.rows.length; i++) rows.push(res.rows.item(i));
      return rows;
    } else {
      return JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
    }
  }

  // Fetch failed messages only
  async getFailedMessages() {
    const all = await this.getAllMessages();
    return all.filter((m) => m.status === "failed");
  }

  // Delete a message
  async deleteMessage(id) {
    if (this.isSQLite && this.db) {
      await this.executeSql("DELETE FROM messages WHERE id = ?;", [id]);
    } else {
      this.memoryCache = this.memoryCache.filter((m) => m.id !== id);
      fs.writeFileSync(DB_PATH, JSON.stringify(this.memoryCache, null, 2));
    }
    console.log(`[SafeLink] 🗑️ Deleted message ${id}`);
  }

  // Clear all messages (for reset or test)
  async clearAll() {
    if (this.isSQLite && this.db) {
      await this.executeSql("DELETE FROM messages;");
    } else {
      this.memoryCache = [];
      fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
    }
    console.log("[SafeLink] 🧹 Cleared all cached messages");
  }
}

export default new MessageCache();
