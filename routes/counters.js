const express = require("express");
const Counter = require("../models/Counter");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let counters = await Counter.findOne();
    if (!counters) counters = await Counter.create({});
    res.json(counters);
  } catch (error) {
    res.status(500).json({ error: "Error fetching counters" });
  }
});

router.put("/:counter", async (req, res) => {
  try {
    const { counter } = req.params;
    const { value } = req.body;

    let counters = await Counter.findOne();
    if (!counters) counters = await Counter.create({});

    counters[counter] = value;
    await counters.save();

    res.json(counters);
  } catch (error) {
    res.status(500).json({ error: "Error updating counter" });
  }
});

module.exports = router;
