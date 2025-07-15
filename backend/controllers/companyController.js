// backend/controllers/companyController.js
const db = require("../db/db");

exports.addCompany = (req, res) => {
  const { name, website, funding_stage } = req.body;
  if (!name || !website || !funding_stage) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = `INSERT INTO companies (name, website, funding_stage) VALUES (?, ?, ?)`;
  db.run(query, [name, website, funding_stage], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    res.status(201).json({ message: "Company added", id: this.lastID });
  });
};

exports.getCompanies = (req, res) => {
  db.all("SELECT * FROM companies", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json(rows);
  });
};
