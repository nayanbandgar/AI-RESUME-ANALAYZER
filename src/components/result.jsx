import { useState } from "react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from "recharts";

const mockResults = [
  {
    id: 1,
    name: "Aarav Sharma",
    role: "React Developer",
    email: "aarav@email.com",
    score: 92,
    experience: "3+ years",
    status: "top",
    skills: ["React", "Node.js", "MongoDB"],
    strengths: ["Strong frontend skills", "Good communication", "Team player"],
    weaknesses: ["Limited DevOps knowledge", "No cloud experience"],
    aiSummary: "Aarav is an excellent match for this role. His React and Node.js expertise aligns perfectly with the job requirements. Highly recommended for interview.",
    skillScores: [
      { skill: "React", score: 95 },
      { skill: "Node.js", score: 85 },
      { skill: "MongoDB", score: 80 },
      { skill: "TypeScript", score: 70 },
      { skill: "CSS", score: 90 },
    ],
    radarData: [
      { subject: "Technical", value: 92 },
      { subject: "Communication", value: 80 },
      { subject: "Experience", value: 85 },
      { subject: "Leadership", value: 70 },
      { subject: "Problem Solving", value: 90 },
    ],
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Full Stack Developer",
    email: "priya@email.com",
    score: 85,
    experience: "1-3 years",
    status: "top",
    skills: ["React", "Python", "MySQL"],
    strengths: ["Fast learner", "Full stack experience", "Good problem solver"],
    weaknesses: ["Less experience with testing", "Limited React Native knowledge"],
    aiSummary: "Priya shows strong full stack capabilities. Her Python skills are a bonus. Recommended for a technical interview round.",
    skillScores: [
      { skill: "React", score: 88 },
      { skill: "Python", score: 82 },
      { skill: "MySQL", score: 78 },
      { skill: "CSS", score: 85 },
      { skill: "REST APIs", score: 80 },
    ],
    radarData: [
      { subject: "Technical", value: 85 },
      { subject: "Communication", value: 75 },
      { subject: "Experience", value: 70 },
      { subject: "Leadership", value: 65 },
      { subject: "Problem Solving", value: 88 },
    ],
  },
  {
    id: 3,
    name: "Rohan Mehta",
    role: "Frontend Developer",
    email: "rohan@email.com",
    score: 78,
    experience: "1-3 years",
    status: "review",
    skills: ["React", "Tailwind", "TypeScript"],
    strengths: ["UI/UX awareness", "Clean code", "Good portfolio"],
    weaknesses: ["No backend experience", "Limited database knowledge"],
    aiSummary: "Rohan has solid frontend skills but lacks backend experience. Consider for frontend-only roles.",
    skillScores: [
      { skill: "React", score: 82 },
      { skill: "Tailwind", score: 90 },
      { skill: "TypeScript", score: 75 },
      { skill: "HTML/CSS", score: 92 },
      { skill: "Git", score: 70 },
    ],
    radarData: [
      { subject: "Technical", value: 78 },
      { subject: "Communication", value: 70 },
      { subject: "Experience", value: 60 },
      { subject: "Leadership", value: 55 },
      { subject: "Problem Solving", value: 75 },
    ],
  },
  {
    id: 4,
    name: "Sneha Joshi",
    role: "Backend Developer",
    email: "sneha@email.com",
    score: 65,
    experience: "Fresher",
    status: "review",
    skills: ["Node.js", "Express", "MongoDB"],
    strengths: ["Strong in algorithms", "Good academic background"],
    weaknesses: ["No production experience", "Limited teamwork exposure"],
    aiSummary: "Sneha is a fresher with good technical knowledge. May need mentoring. Suitable for junior backend role.",
    skillScores: [
      { skill: "Node.js", score: 65 },
      { skill: "Express", score: 60 },
      { skill: "MongoDB", score: 70 },
      { skill: "SQL", score: 55 },
      { skill: "Git", score: 60 },
    ],
    radarData: [
      { subject: "Technical", value: 65 },
      { subject: "Communication", value: 60 },
      { subject: "Experience", value: 30 },
      { subject: "Leadership", value: 40 },
      { subject: "Problem Solving", value: 70 },
    ],
  },
  {
    id: 5,
    name: "Karan Singh",
    role: "React Developer",
    email: "karan@email.com",
    score: 55,
    experience: "Fresher",
    status: "rejected",
    skills: ["React", "CSS", "HTML"],
    strengths: ["Basic React knowledge", "Eager to learn"],
    weaknesses: ["No real project experience", "Weak in JavaScript fundamentals", "No version control knowledge"],
    aiSummary: "Karan does not meet the minimum requirements for this role. Not recommended at this stage.",
    skillScores: [
      { skill: "React", score: 55 },
      { skill: "CSS", score: 65 },
      { skill: "HTML", score: 70 },
      { skill: "JavaScript", score: 45 },
      { skill: "Git", score: 30 },
    ],
    radarData: [
      { subject: "Technical", value: 55 },
      { subject: "Communication", value: 50 },
      { subject: "Experience", value: 20 },
      { subject: "Leadership", value: 30 },
      { subject: "Problem Solving", value: 50 },
    ],
  },
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

const scoreColor = (score) => {
  if (score >= 80) return "#16a34a";
  if (score >= 60) return "#ca8a04";
  return "#dc2626";
};

// Score Gauge Component
function ScoreGauge({ score }) {
  const radius = 54;
  const stroke = 10;
  const circumference = Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = scoreColor(score);

  return (
    <div className="flex flex-col items-center">
      <svg width="130" height="75" viewBox="0 0 130 75">
        <path
          d={`M 10 70 A ${radius} ${radius} 0 0 1 120 70`}
          fill="none" stroke="#f3f4f6" strokeWidth={stroke} strokeLinecap="round"
        />
        <path
          d={`M 10 70 A ${radius} ${radius} 0 0 1 120 70`}
          fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
        <text x="65" y="68" textAnchor="middle" fontSize="22" fontWeight="600" fill={color}>
          {score}%
        </text>
      </svg>
      <p className="text-xs text-gray-400 -mt-1">Overall Match Score</p>
    </div>
  );
}

export default function Results() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const filtered =
    filter === "all" ? mockResults : mockResults.filter((r) => r.status === filter);

  return (
    <div className="flex gap-4 max-w-5xl mx-auto relative">

      {/* Results List */}
      <div className={`flex flex-col gap-3 transition-all duration-300 ${selected ? "w-[45%]" : "w-full"}`}>
        <div className="mb-2">
          <h1 className="text-xl font-medium text-gray-900">Analysis Results</h1>
          <p className="text-sm text-gray-400 mt-1">Click a candidate to view detailed report.</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-1">
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

        {filtered.map((r) => (
          <div
            key={r.id}
            onClick={() => setSelected(r)}
            className={`bg-white border rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-all ${
              selected?.id === r.id
                ? "border-blue-300 ring-2 ring-blue-100"
                : "border-gray-100 hover:border-gray-200"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 text-sm font-medium flex items-center justify-center shrink-0">
              {r.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-sm font-medium text-gray-900 truncate">{r.name}</p>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${statusStyle[r.status]}`}>
                  {statusLabel[r.status]}
                </span>
              </div>
              <p className="text-xs text-gray-400">{r.role}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-lg font-medium" style={{ color: scoreColor(r.score) }}>{r.score}%</p>
              <p className="text-[10px] text-gray-400">match</p>
            </div>
          </div>
        ))}
      </div>

      {/* Slide-in Detail Panel */}
      {selected && (
        <div className="w-[55%] bg-white border border-gray-100 rounded-2xl p-5 overflow-y-auto max-h-[85vh] sticky top-0 animate-slide-in">

          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 text-base font-medium flex items-center justify-center">
                {selected.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p className="text-base font-medium text-gray-900">{selected.name}</p>
                <p className="text-xs text-gray-400">{selected.role} · {selected.experience}</p>
                <p className="text-xs text-blue-400 mt-0.5">{selected.email}</p>
              </div>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="text-gray-300 hover:text-gray-500 transition-colors mt-1"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Score Gauge */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4 flex justify-center">
            <ScoreGauge score={selected.score} />
          </div>

          {/* Skills Progress Bars */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-3">Skills Match</p>
            <div className="flex flex-col gap-2.5">
              {selected.skillScores.map((s) => (
                <div key={s.skill}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-500">{s.skill}</span>
                    <span className="text-xs font-medium" style={{ color: scoreColor(s.score) }}>{s.score}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${s.score}%`, backgroundColor: scoreColor(s.score) }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Radar Chart */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Candidate Profile</p>
            <div className="bg-gray-50 rounded-xl p-3">
              <ResponsiveContainer width="100%" height={200}>
                <RadarChart data={selected.radarData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#6b7280" }} />
                  <Radar dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Score Breakdown</p>
            <div className="bg-gray-50 rounded-xl p-3">
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={selected.skillScores} barSize={20}>
                  <XAxis dataKey="skill" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #f3f4f6" }}
                    cursor={{ fill: "#f9fafb" }}
                  />
                  <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                    {selected.skillScores.map((s, i) => (
                      <Cell key={i} fill={scoreColor(s.score)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-green-50 rounded-xl p-3">
              <p className="text-xs font-medium text-green-700 mb-2">✓ Strengths</p>
              <ul className="flex flex-col gap-1">
                {selected.strengths.map((s, i) => (
                  <li key={i} className="text-xs text-green-600">· {s}</li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 rounded-xl p-3">
              <p className="text-xs font-medium text-red-500 mb-2">✗ Weaknesses</p>
              <ul className="flex flex-col gap-1">
                {selected.weaknesses.map((w, i) => (
                  <li key={i} className="text-xs text-red-400">· {w}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* AI Summary */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <p className="text-xs font-medium text-blue-600 mb-1">🤖 AI Summary</p>
            <p className="text-xs text-blue-500 leading-relaxed">{selected.aiSummary}</p>
          </div>

        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slideIn 0.25s ease;
        }
      `}</style>
    </div>
  );
}