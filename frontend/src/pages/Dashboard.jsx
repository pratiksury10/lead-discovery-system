// src/pages/Dashboard.jsx
import React, { useState } from "react";

const Dashboard = () => {
  const [form, setForm] = useState({
    name: "",
    website: "",
    funding_stage: "Seed",
  });
  const [message, setMessage] = useState("");

  const [domain, setDomain] = useState("");
  const [hunterResult, setHunterResult] = useState(null);
  const [hunterError, setHunterError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Company added successfully!");
        setForm({ name: "", website: "", funding_stage: "Seed" });
      } else {
        setMessage("❌ " + (data.message || "Failed to add company."));
      }
    } catch (err) {
      setMessage("❌ Something went wrong.");
    }
  };

  const handleDomainSearch = async () => {
    setHunterResult(null);
    setHunterError("");

    if (!domain) return setHunterError("Please enter a domain.");

    try {
      const res = await fetch(`http://localhost:5000/api/hunter/domain-search?domain=${domain}`, {
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setHunterResult(data.data); // Hunter returns under `data`
      } else {
        setHunterError(data.error || "Failed to fetch Hunter data");
      }
    } catch (err) {
      setHunterError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Company</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Company Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Website</label>
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 font-medium">Funding Stage</label>
            <select
              name="funding_stage"
              value={form.funding_stage}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="Seed">Seed</option>
              <option value="Series A">Series A</option>
              <option value="Series B">Series B</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm font-medium">{message}</p>}
      </div>

      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">🔍 Hunter Domain Search</h2>
        <div className="flex mb-4">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="e.g. stripe.com"
            className="flex-grow border px-3 py-2 rounded-l"
          />
          <button
            onClick={handleDomainSearch}
            className="bg-green-600 text-white px-4 py-2 rounded-r"
          >
            Search
          </button>
        </div>

        {hunterError && <p className="text-red-500">{hunterError}</p>}

        {hunterResult && (
            <div className="mt-4 border p-4 rounded bg-gray-50">
                <h3 className="text-lg font-bold mb-1">{hunterResult.organization}</h3>
                <p className="text-sm mb-2 text-gray-600">{hunterResult.description}</p>
                <p><strong>📍 Location:</strong> {hunterResult.city}, {hunterResult.state}</p>

                <h4 className="mt-4 font-semibold mt-4">📧 Emails</h4>
                <ul className="list-disc ml-6 text-sm mb-4">
                {hunterResult.emails.slice(0, 5).map((email, i) => (
                    <li key={i}>
                    <span className="font-medium">{email.value}</span> — {email.position || "N/A"} ({email.department})
                    </li>
                ))}
                </ul>

                <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={async () => {
                    try {
                    const res = await fetch("http://localhost:5000/api/contacts", {
                        method: "POST",
                        headers: {
                        "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify({
                        company_name: hunterResult.organization,
                        emails: hunterResult.emails.slice(0, 5).map((e) => ({
                            name: `${e.first_name} ${e.last_name}`,
                            title: e.position,
                            email: e.value,
                            linkedin_url: e.linkedin,
                        })),
                        }),
                    });

                    const data = await res.json();
                    if (res.ok) {
                        alert("✅ Contacts saved successfully!");
                    } else {
                        alert("❌ Failed to save contacts: " + data.message);
                    }
                    } catch (err) {
                    alert("❌ Error saving contacts.");
                    }
                }}
                >
                💾 Save These Contacts
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;



