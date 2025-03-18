require("dotenv").config(); // Load environment variables at the very top

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://todo-frontend-ten-jade.vercel.app"], // ✅ Allow local & Vercel frontend
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Load environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/todoApp";

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo API",
      version: "1.0.0",
      description: "A simple API to manage tasks",
    },
    servers: [{ url: `http://localhost:${PORT}` }, { url: "https://todo-backend-x8jt.onrender.com" }], // ✅ Include Render Backend URL
  },
  apis: ["./routes/taskRoutes.js"], // Path to the route docs
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Basic route
app.get("/", (req, res) => {
  res.send("Todo API is running...");
});

// Log requests for debugging
app.use((req, res, next) => {
  console.log(`📡 ${req.method} request to ${req.url}`);
  next();
});

// ✅ Task Routes - Now moved above MongoDB connection
app.use("/tasks", taskRoutes);

// ✅ Connect to MongoDB after setting up routes
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((error) => console.error("❌ MongoDB connection error:", error));
