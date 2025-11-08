// app/services/storage/AnalyticsLogger.js

class AnalyticsLogger {
    constructor() {
      this.metrics = {
        total: 0,
        delivered: 0,
        failed: 0,
        pending: 0,
      };
      this.events = [];
    }
  
    logDelivery(message, success, receiver) {
      this.metrics.total += 1;
      if (success) this.metrics.delivered += 1;
      else this.metrics.failed += 1;
  
      const event = {
        type: "delivery",
        messageId: message.id,
        to: receiver ? receiver.id : message.receiverId,
        status: success ? "delivered" : "failed",
        hopCount: message.hopCount,
        timestamp: new Date().toISOString(),
      };
  
      this.events.push(event);
      console.log(
        `[SafeLink][Analytics] Message ${message.id} -> ${event.to} | ${event.status}`
      );
    }
  
    logPending(message) {
      this.metrics.pending += 1;
      const event = {
        type: "pending",
        messageId: message.id,
        to: message.receiverId,
        timestamp: new Date().toISOString(),
      };
      this.events.push(event);
    }
  
    getMetrics() {
      return { ...this.metrics };
    }
  
    getEvents(limit = 20) {
      return this.events.slice(-limit);
    }
  
    reset() {
      this.metrics = { total: 0, delivered: 0, failed: 0, pending: 0 };
      this.events = [];
    }
  }
  
  export default new AnalyticsLogger();
  