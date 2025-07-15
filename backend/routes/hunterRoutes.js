const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/domain-search", async (req, res) => {
  const { domain } = req.query;
  const apiKey = process.env.HUNTER_API_KEY;

  if (!domain) {
    return res.status(400).json({ error: "Domain is required in query param" });
  }

  if (!apiKey) {
    return res.status(500).json({ error: "Missing Hunter API Key in environment" });
  }

  try {
    const response = await axios.get("https://api.hunter.io/v2/domain-search", {
      params: {
        domain,
        api_key: apiKey,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Hunter API error:", error.response?.data || error.message);
    console.log("Hunter API Key Loaded:", process.env.HUNTER_API_KEY);
    return res.status(500).json({
      error: "Failed to fetch data from Hunter API",
      details: error.response?.data || error.message,
    });
  }
});

module.exports = router;


