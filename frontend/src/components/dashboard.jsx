import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [topCandidates, setTopCandidate] = useState([]);
  const [stats, setStats] = useState({
    total_resumes: 0,
    
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {

    const response = await axios.get(
      "http://127.0.0.1:8000/dashboard-stats"
    );

    setStats(response.data);
  };
  useEffect(() => {
  fetchTopCandidate();
}, []);

const fetchTopCandidate = async () => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/top-candidates"
    );

    setTopCandidate(response.data.candidates);

  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="grid grid-cols-2 gap-6">

      <div className="bg-red-100 w-56 h-30 p-6 rounded-xl shadow">
        <h2 className="text-black text-xl font-bold mb-2 text-center">
          Total Resumes
        </h2>

        <p className="text-4xl font-bold text-red-950 mb-2 text-center">
          {stats.total_resumes}
        </p>
      </div>
      <div className="bg-red-100 p-6 rounded-2xl shadow">

  <div className="flex justify-between items-center mb-5">
    <h2 className="text-xl font-bold text-gray-800">
      Top Matching Candidates
    </h2>

    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
      Top 5
    </span>
  </div>

  {topCandidates.length === 0 ? (
    <p className="text-gray-500">
      No candidates found
    </p>
  ) : (
    topCandidates.map((candidates, index) => (
      <div
        key={index}
        className="flex items-center justify-between p-4 mb-3 border rounded-xl hover:shadow-md transition"
      >
        <div className="flex items-center gap-4">

          {/* Rank */}
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center font-bold text-red-700">
            #{index + 1}
          </div>

          {/* Candidate Info */}
          <div>
            <h3 className="font-semibold text-gray-800">
              {candidates.candidate_name}
            </h3>

            <p className="text-sm text-gray-500">
              {candidates.email}
            </p>
          </div>

        </div>

        {/* Score */}
        <div className="text-right">

          <p className="text-2xl font-bold text-green-600">
            {candidates.score}%
          </p>

          <p className="text-xs text-gray-400">
            Match Score
          </p>

        </div>
        <div className="flex flex-wrap gap-1 mt-2">
  {candidates.skills?.slice(0,3).map((skill,index)=>(
    <span
      key={index}
      className="text-xs px-2 py-1 bg-blue-100 rounded-full"
    >
      {skill}
    </span>
  ))}
</div>
      </div>
    ))
  )}

</div>
      

       
      </div>
    
  
  );
}