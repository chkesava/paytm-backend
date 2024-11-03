const express = require("express");
const Entry = require("../models/Entry");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const entries = await Entry.find()
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

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
