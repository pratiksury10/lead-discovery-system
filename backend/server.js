// backend/server.js
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || "supersecretkey",
  resave: false,
  saveUninitialized: false,
}));

// Routes
app.use("/api/login", require("./routes/authRoutes"));
app.use("/api/companies", require("./routes/companyRoutes"));
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/webhooks", require("./routes/webhookRoutes"));
app.use("/api/hunter", require("./routes/hunterRoutes"));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
