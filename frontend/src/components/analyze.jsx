import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Analyze() {
  const [jobDescription, setJobDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("any");
  const [analyzing, setAnalyzing] = useState(false);
  const [done, setDone] = useState(false);
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);


  useEffect(() => {

    fetchRoles();

  }, []);

  const fetchRoles = async () => {

    try {

      const response =

        await axios.get(

          "http://127.0.0.1:8000/get-roles"

        );

      setRoles(

        response.data.roles

      );

    }

    catch (error) {

      console.log(error);

    }

  }
  const handleRoleChange = (e) => {

    const value = e.target.value;

    setRole(value);

    if (value === "") {

      setSuggestions([]);

      return;

    }

    const filtered = roles.filter(

      (r) =>

        r.toLowerCase().includes(

          value.toLowerCase()

        )

    );

    setSuggestions(filtered);

  };


  const analyzeResume = () => {
    if (!jobDescription.trim()) return;
    setAnalyzing(true);
    setDone(false);
    // Simulate API call — replace with your actual AI API call
    setTimeout(() => {
      setAnalyzing(false);
      setDone(true);
    }, 2500);
  };

  const runAnalysis = async () => {

    if (!jobDescription.trim()) {

      alert("Enter Job Description");

      return;

    }
    
    try {

      setAnalyzing(true);

      await axios.post(

        "http://127.0.0.1:8000/save-job",

        {

          job_title: role,

          job_description: jobDescription,

          required_skills: skills,

          experience: experience

        }

      );

      const response =
        await axios.post(

          "http://127.0.0.1:8000/analyze",

          {
            job_description: jobDescription
          }
        );

      setAnalyzing(false);

      navigate(

        "/results",

        {

          state: {

            results:
              response.data.results

          }

        }

      );

    }

    catch (error) {

      setAnalyzing(false);

      console.log(error);

      alert("Failed");


    }
  };



  return (
    <div className="max-w-2xl mx-auto bg-black">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-medium text-gray-400">Analyze Resumes</h1>
        <p className="text-sm text-gray-400 mt-1">
          Enter job details and let AI match the best candidates.
        </p>
      </div>
      {/*role for job*/}
      <div className="relative">
        <label className="block text-lg font-medium text-gray-400">
          Role
        </label>
        <input
          type="text"
          value={role}
          onChange={handleRoleChange}
          placeholder="Frontend Developer"
          className="w-full px-3 py-2.5 mt-2 border border-gray-200 rounded-lg text-white"
        />
        {
          suggestions.length > 0 && (
            <div className="absolute w-full bg-white border rounded-lg mt-1 shadow-lg z-10">
              {
                suggestions.map(
                  (item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setRole(item);
                        setSuggestions([]);
                      }}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {item}
                    </div>
                  )
                )}
            </div>
          )
        }

      </div>

      {/* Job Description */}
      <div className="  rounded-xl  mb-4">
        <label className="block text-lg font-medium text-gray-400 mb-2">
          Job Description
        </label>
        <textarea
          rows={5}
          placeholder="Paste the job description here... e.g. We are looking for a React developer with 2+ years experience..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 resize-none"
        />
        {!jobDescription.trim() && (
          <p className="text-xs text-red-200 mt-1.5">⚠ Job description is required to analyze.</p>
        )}
      </div>

      {/* Required Skills */}
      <div className=" border  rounded-xl  mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Required Skills
          <span className="text-gray-500 font-normal ml-1">(comma separated)</span>
        </label>
        <input
          type="text"
          placeholder="e.g. React, Node.js, MongoDB, Tailwind CSS"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 placeholder:text-gray-400"
        />

        {/* Skill Tags Preview */}
        {skills && (
          <div className="flex flex-wrap gap-2 mt-3">
            {skills.split(",").map((s, i) =>
              s.trim() ? (
                <span
                  key={i}
                  className="bg-blue-50 text-red-950 text-xs font-medium px-2.5 py-1 rounded-full"
                >
                  {s.trim()}
                </span>
              ) : null
            )}
          </div>
        )}
      </div>

      {/* Experience Level */}
      <div className="  rounded-xl  mb-6">
        <label className="block text-sm font-medium text-gray-400 mb-3">
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
              className={`py-2 rounded-lg text-sm font-medium border transition-colors ${experience === opt.value
                ? "bg-blue-50 text-red-950 border-blue-200"
                : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Analyze Button */}
      <div className="flex justify-center items-center">
        <button
          onClick={runAnalysis}
          disabled={analyzing || !jobDescription.trim()}
          className={`w-64 py-3 rounded-xl text-sm font-medium transition-colors justify-center flex items-center ${analyzing || !jobDescription.trim()
            ? "bg-white text-black cursor-pointer hover:bg-red-950 hover:text-white hover:border-white hover:border-2"
            : "bg-gray-900 text-white hover:bg-red-950"
            }`}
        >
          {analyzing ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.3" />
                <path d="M21 12a9 9 0 00-9-9" />
              </svg>
              Analyzing resumes...
            </span>
          ) : (
            "Run Analysis"
          )}
        </button>
      </div>


      {/* Success Message
      {done && (
        <div className="mt-4 bg-green-50 border border-green-100 rounded-xl p-4 flex items-center gap-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <div>
            <p className="text-sm font-medium text-green-700">Analysis complete!</p>
            <p className="text-xs text-green-600 mt-0.5">
              Results are ready.{" "}
              <a href="/results" className="underline font-medium">View results →</a>
            </p>
          </div>
        </div>
      )} */}

    </div>
  );
}