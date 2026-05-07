import { useState } from "react";

export default function Analyze() {
  const [jobDescription, setJobDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("any");
  const [analyzing, setAnalyzing] = useState(false);
  const [done, setDone] = useState(false);

  const handleAnalyze = () => {
    if (!jobDescription.trim()) return;
    setAnalyzing(true);
    setDone(false);
    // Simulate API call — replace with your actual AI API call
    setTimeout(() => {
      setAnalyzing(false);
      setDone(true);
    }, 2500);
  };

  return (
    <div className="max-w-2xl mx-auto">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-medium text-gray-900">Analyze Resumes</h1>
        <p className="text-sm text-gray-400 mt-1">
          Enter job details and let AI match the best candidates.
        </p>
      </div>

      {/* Job Description */}
      <div className="bg-white border border-gray-100 rounded-xl p-5 mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Job Description
        </label>
        <textarea
          rows={5}
          placeholder="Paste the job description here... e.g. We are looking for a React developer with 2+ years experience..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 resize-none"
        />
        {!jobDescription.trim() && (
          <p className="text-xs text-red-400 mt-1.5">⚠ Job description is required to analyze.</p>
        )}
      </div>

      {/* Required Skills */}
      <div className="bg-white border border-gray-100 rounded-xl p-5 mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Required Skills
          <span className="text-gray-400 font-normal ml-1">(comma separated)</span>
        </label>
        <input
          type="text"
          placeholder="e.g. React, Node.js, MongoDB, Tailwind CSS"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
        />

        {/* Skill Tags Preview */}
        {skills && (
          <div className="flex flex-wrap gap-2 mt-3">
            {skills.split(",").map((s, i) =>
              s.trim() ? (
                <span
                  key={i}
                  className="bg-blue-50 text-blue-600 text-xs font-medium px-2.5 py-1 rounded-full"
                >
                  {s.trim()}
                </span>
              ) : null
            )}
          </div>
        )}
      </div>

      {/* Experience Level */}
      <div className="bg-white border border-gray-100 rounded-xl p-5 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Experience Level
        </label>
        <div className="grid grid-cols-4 gap-2">
          {[
            { value: "any", label: "Any" },
            { value: "fresher", label: "Fresher" },
            { value: "mid", label: "1–3 years" },
            { value: "senior", label: "3+ years" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setExperience(opt.value)}
              className={`py-2 rounded-lg text-sm font-medium border transition-colors ${
                experience === opt.value
                  ? "bg-blue-50 text-blue-600 border-blue-200"
                  : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Analyze Button */}
      <button
        onClick={handleAnalyze}
        disabled={analyzing || !jobDescription.trim()}
        className={`w-full py-3 rounded-xl text-sm font-medium transition-colors ${
          analyzing || !jobDescription.trim()
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-900 text-white hover:bg-gray-700"
        }`}
      >
        {analyzing ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.3"/>
              <path d="M21 12a9 9 0 00-9-9"/>
            </svg>
            Analyzing resumes...
          </span>
        ) : (
          "Run Analysis"
        )}
      </button>

      {/* Success Message */}
      {done && (
        <div className="mt-4 bg-green-50 border border-green-100 rounded-xl p-4 flex items-center gap-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <div>
            <p className="text-sm font-medium text-green-700">Analysis complete!</p>
            <p className="text-xs text-green-600 mt-0.5">
              Results are ready.{" "}
              <a href="/results" className="underline font-medium">View results →</a>
            </p>
          </div>
        </div>
      )}

    </div>
  );
}