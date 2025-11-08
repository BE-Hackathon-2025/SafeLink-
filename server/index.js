// server/index.js

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const messagesRouter = require("./routes/messages");
const peersRouter = require("./routes/peers");
const logsRouter = require("./routes/logs");
const rescuesRouter = require("./routes/rescues");
const helpRequestsRouter = require("./routes/helpRequests");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", ts: new Date().toISOString() });
});

app.use("/api/messages", messagesRouter);
app.use("/api/peers", peersRouter);
app.use("/logs", logsRouter);
app.use("/api/rescues", rescuesRouter);
app.use("/api/help-requests", helpRequestsRouter);

app.listen(PORT, () => {
  console.log(`[SafeLink][Server] 🌐 Listening on http://localhost:${PORT}`);
});

