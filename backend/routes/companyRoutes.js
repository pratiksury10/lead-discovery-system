// backend/routes/companyRoutes.js
const express = require("express");
const router = express.Router();
const {addCompany,getCompanies,} = require("../controllers/companyController");
const {discoverContacts} = require("../controllers/discoverController");

router.post("/", addCompany);      // POST /api/companies
router.get("/", getCompanies);     // GET /api/companies
router.post("/discover/:company_id", discoverContacts); // POST /api/companies/discover/:id

module.exports = router;
