// src/pages/Results.jsx
import React, { useEffect, useState } from "react";

const Results = () => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  const fetchContacts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/contacts", {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setContacts(data);
      }
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter((contact) =>
    contact.company_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Enriched Contacts</h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by company name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full border text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border">Company</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">LinkedIn</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No contacts found.
                  </td>
                </tr>
              ) : (
                filteredContacts.map((contact) => (
                  <tr key={contact.id}>
                    <td className="border px-4 py-2">{contact.company_name}</td>
                    <td className="border px-4 py-2">{contact.name}</td>
                    <td className="border px-4 py-2">{contact.title}</td>
                    <td className="border px-4 py-2">{contact.email}</td>
                    <td className="border px-4 py-2">
                      <a
                        href={contact.linkedin_url}
                        className="text-blue-600 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Results;
