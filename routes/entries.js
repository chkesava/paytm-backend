const express = require("express");
const Entry = require("../models/Entry");

const router = express.Router();

// Route to get all entries without pagination
router.get("/", async (req, res) => {
  try {
    const entries = await Entry.find().sort({ date: -1 }); // No limit or skip applied
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: "Error fetching entries" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    const newEntry = await Entry.create({ text });
    res.json(newEntry);
  } catch (error) {
    res.status(500).json({ error: "Error adding entry" });
  }
});

module.exports = router;
