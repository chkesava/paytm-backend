const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const counterRoutes = require("./routes/counters");
const entryRoutes = require("./routes/entries");

const path = require("path");

dotenv.config();

const app = express();

// Update CORS configuration to allow multiple origins
const allowedOrigins = ["https://kesava-scheduler.netlify.app", "http://localhost:5173"];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

app.use(express.json());

app.use(express.static(__dirname));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use("/api/counters", counterRoutes);
app.use("/api/entries", entryRoutes);
app.use(express.static(path.join(__dirname, 'public')));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html")); // Make sure this is pointing to the correct file
});

console.log(path.join(__dirname, "index.html"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
