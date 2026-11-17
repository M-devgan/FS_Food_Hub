import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

// Allow requests only from our React frontend
const allowedOrigins = ["http://localhost:5173"];

// CORS configuration
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (origin && allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Parse JSON requests
app.use(express.json());

// Test route
app.get("/", (_req, res) => {
  res.send("FoodieHub Backend is running!");
});

app.listen(PORT, () => {
  console.log(`Backend server is running at http://localhost:${PORT}`);
});