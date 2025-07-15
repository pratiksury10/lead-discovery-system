# 🧠 Lead Discovery System – Appliflow Backend Intern Assignment

This is a simple backend-driven Lead Discovery System that collects company data and enriches it with decision-maker contact details using the **Hunter.io API** and **n8n workflow automation**.

---

## 🚀 Features

- ✅ Secure login
- ✅ Add & store company information (name, website, funding stage)
- ✅ n8n workflow for lead enrichment via Hunter.io
- ✅ Contact discovery: emails, titles, LinkedIn
- ✅ Display enriched contact data in table view
- ✅ SQLite database (lightweight, easy setup)

---

## 📁 Project Structure
Lead-Discovery-System/
│
├── backend/
│ ├── server.js # Main Express server
│ ├── db/
│ │ └── db.js # SQLite database + schema
│ ├── routes/
│ │ ├── authRoutes.js # Login route
│ │ ├── companyRoutes.js # Company add/list
│ │ ├── contactRoutes.js # Contacts get/save
│ │ ├── webhookRoutes.js # n8n webhook to accept enriched data
│ │ └── hunterRoutes.js # Optional route to test Hunter API directly
│ └── .env # API keys, secrets, etc.
│
├── frontend/ # (Optional) Simple frontend with login + dashboard
│
└── README.md # 

## 🧪 APIs Used

- [Hunter.io API](https://hunter.io/api) for domain search & email discovery
- [n8n](https://n8n.io/) for workflow automation

## 🧰 Setup Instructions

###
1. Clone the repo
```bash
git clone https://github.com/your-username/lead-discovery-system.git
cd lead-discovery-system


2. Install backend dependencies
bash
CopyEdit
cd backend
npm install


3. Setup .env file
env
CopyEdit
PORT=5000
SESSION_SECRET=supersecretkey
HUNTER_API_KEY=your_hunter_api_key


4. Start backend server
bash
CopyEdit
node server.js
# or nodemon server.js
Server runs at: http://localhost:5000

________________________________________

🧬 n8n Workflow
You can import the n8n workflow (JSON export in the repo) which does:
1.	Trigger manually
2.	GET companies from your /api/companies
3.	Extract domain from company website
4.	Fetch contacts from Hunter.io
5.	POST enriched data to /api/webhooks/n8n-leads

Method	Endpoint	Description
POST	/api/login	Basic login (hardcoded user)
POST	/api/companies	Add a company
GET	/api/companies	List all companies
GET	/api/contacts	List all enriched contacts
POST	/api/webhooks/n8n-leads	Receive contacts from n8n

📊 Database (SQLite)
Tables created automatically in backend/db/data.db:
•	companies: id, name, website, funding_stage, created_at
•	contacts: id, company_id, name, title, email, linkedin_url


