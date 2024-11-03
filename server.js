const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const counterRoutes = require("./routes/counters");
const entryRoutes = require("./routes/entries");

dotenv.config();

const app = express();

app.use(cors({ origin: "https://kesava-scheduler.netlify.app" }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use("/api/counters", counterRoutes);
app.use("/api/entries", entryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
