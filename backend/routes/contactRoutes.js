const express = require("express");
const router = express.Router();
const db = require("../db/db");

//Testing routes
router.get("/", (req, res) => {
   db.all(`
    SELECT contacts.*, companies.name AS company_name
    FROM contacts
    LEFT JOIN companies ON contacts.company_id = companies.id
    ORDER BY contacts.id DESC
  `, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

//Actual POST route to save contacts
router.post("/", (req, res) => {
  const { company_name, emails } = req.body;

  //Validate inputs
  if (!company_name || !Array.isArray(emails)) {
    return res.status(400).json({ message: "Invalid data format" });
  }

  //Find company ID from the name
  db.get("SELECT id FROM companies WHERE name = ?", [company_name], (err, row) => {
    if (err) {
      console.error("🔴 DB Error (find company):", err.message);
      return res.status(500).json({ message: "Database error" });
    }

    if (!row) {
      return res.status(404).json({ message: "Company not found" });
    }

    const companyId = row.id;

    //Insert each contact
    emails.forEach((e) => {
      db.run(
        `INSERT INTO contacts (company_id, name, title, email, linkedin_url) VALUES (?, ?, ?, ?, ?)`,
        [companyId, e.name, e.title, e.email, e.linkedin_url],
        (err) => {
          if (err) console.error("🔴 Insert contact failed:", err.message);
        }
      );
    });

    res.status(201).json({ message: "✅ Contacts saved successfully" });
  });
});

module.exports = router;

