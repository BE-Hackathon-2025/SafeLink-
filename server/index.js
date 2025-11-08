// server/index.js

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const messagesRouter = require("./routes/messages");
const peersRouter = require("./routes/peers");
const logsRouter = require("./routes/logs");
const rescuesRouter = require("./routes/rescues");
const helpRequestsRouter = require("./routes/helpRequests");
const firstAidRouter = require("./routes/firstAid");
const medaiRouter = require("./routes/medai");
const routesRouter = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || "development";

// CORS configuration for production
const corsOptions = {
  origin: NODE_ENV === "production" 
    ? process.env.FRONTEND_URL 
      ? process.env.FRONTEND_URL.split(",").map(url => url.trim())
      : "*"
    : "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.get("/health", (req, res) => {
  res.json({ status: "ok", ts: new Date().toISOString() });
});

app.use("/api/messages", messagesRouter);
app.use("/api/peers", peersRouter);
app.use("/logs", logsRouter);
app.use("/api/rescues", rescuesRouter);
app.use("/api/help-requests", helpRequestsRouter);
app.use("/api/first-aid", firstAidRouter);
app.use("/api/medai", medaiRouter);
app.use("/api/routes", routesRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`[SafeLink][Server] 🌐 Server running on port ${PORT}`);
  console.log(`[SafeLink][Server] 🌍 Environment: ${NODE_ENV}`);
  if (NODE_ENV === "production") {
    console.log(`[SafeLink][Server] ✅ Production mode enabled`);
  }
});

