// src/components/HunterSearch.jsx
import React, { useState } from "react";
import axios from "axios";

const HunterSearch = () => {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    try {
      const res = await axios.get(`http://localhost:5000/api/hunter/domain-search`, {
        params: { domain },
        withCredentials: true,
      });
      setResult(res.data.data); // Hunter returns data inside `data`
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data. Please check domain or API key.");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🔍 Find Emails by Domain</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="e.g. stripe.com"
          className="p-2 border rounded w-full"
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          Search
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {result && (
        <div className="mt-4 border p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">{result.organization}</h3>
          <p>🌐 Website: {domain}</p>
          <p>🏢 Industry: {result.industry}</p>
          <p>📍 Location: {result.city}, {result.state}, {result.country}</p>

          <h4 className="font-bold mt-4">📧 Emails:</h4>
          <ul className="list-disc ml-6">
            {result.emails.slice(0, 5).map((email, index) => (
              <li key={index}>
                <strong>{email.value}</strong> — {email.position || "Unknown Position"} ({email.department})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HunterSearch;
