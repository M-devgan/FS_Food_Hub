import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("FoodieHub Backend is running!");
});

app.listen(PORT, () => {
  console.log(`Backend server is running at http://localhost:${PORT}`);
});