import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";


const statusStyle = {
  Shortlisted: "bg-green-50 text-green-600",
  "In Review": "bg-yellow-50 text-yellow-600",
  Rejected: "bg-red-50 text-red-500",
};

export default function Candidates() {
  const [search, setSearch] = useState("");
  const [candidates, setCandidates] = useState([]);
  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/candidates"
      );

      setCandidates(response.data.candidates);
    } catch (error) {
      console.log(error);
    }
  };
  const filtered = candidates.filter((c) =>
  (c.candidate_name || "")
    .toLowerCase()
    .includes(search.toLowerCase()) ||

  String(c.role || "")
    .toLowerCase()
    .includes(search.toLowerCase()) ||

  String(c.score || "")
    .includes(search) ||

  (c.email || "")
    .toLowerCase()
    .includes(search.toLowerCase())
);

  return (
    <div className="max-w-6xl mx-auto">

      <div className="mb-6">
        <h1 className="text-xl font-medium text-gray-100">Candidates</h1>
        <p className="text-sm text-gray-400 mt-1">Manage and track all candidates.</p>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search by name or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-red-400 bg-red-100"
        />
      </div>

      {/* Table */}
      <div className="bg-red-100 border border-gray-100 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-red-200">
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-800">Name</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-800">Role</th>

              <th className="text-left px-4 py-3 text-xs font-bold text-gray-800">Email</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-800">view resume</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-800">Score</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-800">Uploaded At</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-sm text-gray-400">No candidates found.</td>
              </tr>
            ) : (
              filtered.map((c, i) => (
                <tr key={c.id} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${i === filtered.length - 1 ? "border-0" : ""}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-red-50 text-red-600 text-xs font-medium flex items-center justify-center shrink-0">
                        {
                          (c.candidate_name || "Unknown")
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        }
                      </div>
                      <span className="font-medium text-red-950">{c.candidate_name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-red-500">{c.role}</td>
                   <td className="px-4 py-3 text-blue-500 text-xs">{c.email}</td>
                    <td className="px-4 py-3 text-blue-500 text-xs"><button
    className="bg-blue-500 text-white px-3 py-1 rounded"
    onClick={() =>
      window.open(
        `http://127.0.0.1:8000/view-resume/${c.email}`,
        "_blank"
      )
    }
  >
    View Resume
  </button></td>
                  <td className="px-4 py-3 font-medium text-green-800 ">{c.score}%</td>
                  
                 
                  <td className="px-4 py-3 text-red-800">{c.uploaded_at
                    ? new Date(c.uploaded_at).toLocaleString()
                    : "N/A"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}