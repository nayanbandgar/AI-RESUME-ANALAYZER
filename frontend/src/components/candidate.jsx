import { useState } from "react";

const allCandidates = [
  { id: 1, name: "Aarav Sharma", role: "React Developer", email: "aarav@email.com", score: 92, status: "Shortlisted" },
  { id: 2, name: "Priya Patel", role: "Full Stack Developer", email: "priya@email.com", score: 85, status: "Shortlisted" },
  { id: 3, name: "Rohan Mehta", role: "Frontend Developer", email: "rohan@email.com", score: 78, status: "In Review" },
  { id: 4, name: "Sneha Joshi", role: "Backend Developer", email: "sneha@email.com", score: 65, status: "In Review" },
  { id: 5, name: "Karan Singh", role: "React Developer", email: "karan@email.com", score: 55, status: "Rejected" },
];

const statusStyle = {
  Shortlisted: "bg-green-50 text-green-600",
  "In Review": "bg-yellow-50 text-yellow-600",
  Rejected: "bg-red-50 text-red-500",
};

export default function Candidates() {
  const [search, setSearch] = useState("");

  const filtered = allCandidates.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto">

      <div className="mb-6">
        <h1 className="text-xl font-medium text-gray-900">Candidates</h1>
        <p className="text-sm text-gray-400 mt-1">Manage and track all candidates.</p>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text"
          placeholder="Search by name or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-400">Name</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-400">Role</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-400">Score</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-400">Status</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-400">Email</th>
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
                      <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 text-xs font-medium flex items-center justify-center shrink-0">
                        {c.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="font-medium text-gray-800">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{c.role}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{c.score}%</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusStyle[c.status]}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-blue-500 text-xs">{c.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}