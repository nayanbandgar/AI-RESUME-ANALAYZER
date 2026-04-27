import { useState } from "react";

const mockResults = [
  { id: 1, name: "Aarav Sharma", role: "React Developer", score: 92, skills: ["React", "Node.js", "MongoDB"], status: "top" },
  { id: 2, name: "Priya Patel", role: "Full Stack Developer", score: 85, skills: ["React", "Python", "MySQL"], status: "top" },
  { id: 3, name: "Rohan Mehta", role: "Frontend Developer", score: 78, skills: ["React", "Tailwind", "TypeScript"], status: "review" },
  { id: 4, name: "Sneha Joshi", role: "Backend Developer", score: 65, skills: ["Node.js", "Express", "MongoDB"], status: "review" },
  { id: 5, name: "Karan Singh", role: "React Developer", score: 55, skills: ["React", "CSS", "HTML"], status: "rejected" },
];

const statusStyle = {
  top: "bg-green-50 text-green-600",
  review: "bg-yellow-50 text-yellow-600",
  rejected: "bg-red-50 text-red-500",
};

const statusLabel = {
  top: "Top Match",
  review: "Review",
  rejected: "Low Match",
};

export default function Result() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? mockResults : mockResults.filter((r) => r.status === filter);

  return (
    <div className="max-w-3xl mx-auto">

      <div className="mb-6">
        <h1 className="text-xl font-medium text-gray-900">Analysis Results</h1>
        <p className="text-sm text-gray-400 mt-1">AI-ranked candidates based on job match score.</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-5">
        {["all", "top", "review", "rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
              filter === f
                ? "bg-gray-900 text-white"
                : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
            }`}
          >
            {f === "all" ? "All" : statusLabel[f]}
          </button>
        ))}
      </div>

      {/* Results List */}
      <div className="flex flex-col gap-3">
        {filtered.map((r) => (
          <div key={r.id} className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-4">

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 text-sm font-medium flex items-center justify-center shrink-0">
              {r.name.split(" ").map((n) => n[0]).join("")}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-medium text-gray-900">{r.name}</p>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusStyle[r.status]}`}>
                  {statusLabel[r.status]}
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-2">{r.role}</p>
              <div className="flex flex-wrap gap-1">
                {r.skills.map((s) => (
                  <span key={s} className="bg-gray-50 border border-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Score */}
            <div className="text-right shrink-0">
              <p className="text-lg font-medium text-gray-900">{r.score}%</p>
              <p className="text-[10px] text-gray-400">match score</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}