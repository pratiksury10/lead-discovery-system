// backend/controllers/discoverController.js
const db = require("../db/db");
const axios = require("axios");

const HUNTER_API_KEY = process.env.HUNTER_API_KEY;

exports.discoverContacts = async (req, res) => {
  const companyId = req.params.company_id;

  db.get(`SELECT * FROM companies WHERE id = ?`, [companyId], async (err, company) => {
    if (err || !company) return res.status(404).json({ error: "Company not found" });

    const domain = company.website;
    const hunterUrl = `https://api.hunter.io/v2/domain-search?domain=${domain}&api_key=${HUNTER_API_KEY}`;

    try {
      const response = await axios.get(hunterUrl);
      const emails = response.data.data.emails;

      const decisionMakers = emails.filter((e) =>
        e.position?.toLowerCase().includes("ceo") ||
        e.position?.toLowerCase().includes("cto") ||
        e.position?.toLowerCase().includes("founder") ||
        e.position?.toLowerCase().includes("vp")
      );

      decisionMakers.forEach((person) => {
        db.run(
          `INSERT INTO contacts (company_id, name, title, email, linkedin_url) VALUES (?, ?, ?, ?, ?)`,
          [companyId, person.first_name + " " + person.last_name, person.position, person.value, person.linkedin],
          (err) => {
            if (err) console.error("Failed to insert contact:", err.message);
          }
        );
      });

      res.status(200).json({
        message: "Contacts discovered and stored",
        count: decisionMakers.length,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Failed to fetch data from Hunter.io" });
    }
  });
};
