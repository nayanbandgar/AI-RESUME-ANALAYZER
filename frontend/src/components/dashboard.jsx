

import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend
} from "recharts";
import { useNavigate } from "react-router-dom";



export default function Dashboard() {

  const [topCandidates, setTopCandidate] = useState([]);
  const [recentResumes, setRecentResumes] = useState([]);
  const [averageScore, setAverageScore] = useState(0);
  const [stats, setStats] = useState({
    total_resumes: 0,
  });
  const [roleCounts, setRoleCounts] = useState([]);
const navigate = useNavigate();
const [chartData, setChartData] = useState([]);
const [minScore, setMinScore] = useState([]);
const [maxScore, setMaxScore] = useState([]);
const [candidates, setCandidates] = useState([]);
const matchingCount = candidates.filter((candidate) => {
  const score = Number(candidate.score || 0);

  return score >= minScore && score <= maxScore;
}).length;

const COLORS = [
  "#22c55e", // Green
  "#f97316", // Orange
  "#eab308", // Yellow
  "#ef4444"  // Red
];
  useEffect(() => {
    fetchStats();
    fetchTopCandidate();
    fetchRecentResumes();
  }, []);

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
  const fetchStats = async () => {
    const response = await axios.get(
      "http://127.0.0.1:8000/dashboard-stats"
    );

    setStats(response.data);
  };

  const fetchTopCandidate = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/top-candidates"
      );

      setTopCandidate(response.data.candidates || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRecentResumes = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/recent-resumes"
      );

      setRecentResumes(response.data.resumes || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  fetchRoleCounts();
}, []);

const fetchRoleCounts = async () => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/role-wise-count"
    );

    setRoleCounts(response.data.roles);
  } catch (error) {
    console.log(error);
  }
};
 useEffect(()=>{
  fetchAverageScore();
 },[]);

  const fetchAverageScore = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/average-score"
      );

      setAverageScore(
        response.data.average_score
      );

    } catch (error) {
      console.log(error);
    }
  };
  
useEffect(() => {
  fetchMatchDistribution();
}, []);

const fetchMatchDistribution = async () => {
  const response = await axios.get(
    "http://127.0.0.1:8000/match-distribution"
  );

  setChartData([
  {
    name: "80%+ Match",
    value: response.data.green
  },
  {
    name: "60-79% Match",
    value: response.data.orange
  },
  {
    name: "40-59% Match",
    value: response.data.yellow
  },
  {
    name: "0-39% Match",
    value: response.data.red
  }
]);
}
  return (
    <div className="flex fixed flex-wrap gap-6 p-6 ">



      {/* Top Candidates */}
      <div className="  h-60 shadow  lg:col   ">

        <h2 className="text-xl font-bold  text-white ">
          Top Candidates
        </h2>
        <div className="flex items-center gap-4">
          <h2 className=" whitespace-nowrap text-gray-300 mb-2">
            Highest Matching Candidates for Open Position
          </h2>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <div className="flex gap-4 flex-wrap ">

          {topCandidates.map((candidate, index) => (
            <div
              key={candidate.email || index}
              className="bg-red-100 p-4 shadow hover:shadow-lg  border border-red-300 transition"
            >

              <div className="flex justify-between items-start">

                <div>
                  <h3 className="font-semibold text-sm text-red-950 uppercase">
                    {candidate.candidate_name}
                  </h3>

                  <p className="text-sm text-blue-600">
                    {candidate.email}
                  </p>
                   <p className="  text-sm font-semibold text-red-900 lowercase ">{candidate.role}</p>

                  <div className="bg-green-700 text-white text-center mt-4 w-16 font-extrabold ">
                    {Math.round(candidate.score)}%
                  </div>
                </div>
               




              </div>



              <div className="flex flex-wrap gap-2 ">

                {candidate.skills?.slice(0, 4).map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}

              </div>

              <div className="  mt-2 border-t  border-black">
                <button
                  className="mt-2 w-full bg-red-100 text-black py-2 border  border-red-800 rounded-lg font-bold hover:bg-red-700 hover:text-white transition"
                  onClick={() =>
                    window.open(
                      `http://127.0.0.1:8000/view-resume/${candidate.email}`,
                      "_blank"
                      
                    )
                  }
                >
                  View Resume
                </button></div>


            </div>

          ))}

        </div>


      </div>


      {/* Recent Resumes */}
      <div className="bg-red-100   grid h-64 shadow  w-96">

        <h2 className="text-xl  text-red-950 font-bold p-2  ">
          Recent Resumes
        </h2>
        <div className=" rounded-xl px-2 mx-2 mb-2 ">
          {recentResumes.length === 0 ? (
            <p>No resumes found.</p>
          ) : (
            recentResumes.map((resume, index) => (
              <div
                key={resume.candidate_email || index} 
                className="border-b p-2 flex justify-between items-center bg-red-100 mt-2 rounded-xl border-red-300 hover:bg-red-200 "
              >
                <div><p className="font-medium text-red-900 uppercase ">
                  {resume.candidate_name}
                </p>

                  <p className="text-sm text-blue-600">
                    {resume.candidate_email}
                  </p></div>

                <div className="flex justify-end   "><p className="text-xs text-red-500 text-left  ">
                  {new Date(
                    resume.uploaded_at
                  ).toLocaleString()}
                </p></div>
              </div>



            ))

          )}
        </div>
      </div>

      <div>
         {/* Total Resume */}
      <div className="flex m-0">
        <div><div className="bg-red-100 p-2 w-96 h-22  shadow border-r  border-red-300">
          <h2 className="text-xl font-bold text-center">
            Total Resumes
          </h2>

          <p className="text-4xl font-bold text-red-700 text-center mt-2">
            {stats.total_resumes}
          </p>
        </div></div>
        <div>
          <div className="bg-red-100 p-2  w-80 h-22  shadow border-r  border-red-300">
            <h2 className="text-xl font-bold text-center">
              Avg Match Score
            </h2>

            <p className="text-4xl font-bold text-green-900 text-center mt-2">
                {averageScore}%
            </p>
          </div>
        </div>
        <div>
          <div className="bg-red-100 p-2  w-80 h-22 shadow">
            <h2 className="text-xl font-bold text-center">
             Upload Resumes
            </h2>
<button
    onClick={() => navigate("/upload")}
    className=" border-2 border-dashed border-blue-700 text-blue-950 px-4 py-1 rounded-lg hover:bg-blue-700  hover:text-white mx-16 mt-2"
  >
    + Upload Resume
  </button>
            
          </div>
        </div>
      </div>
      <div className="flex">
         {/* department hiring  */}

  <div className="bg-red-100 p-5 my-5  shadow ">

  <h2 className="text-lg font-bold mb-4 text-red-950">
      Role Hiring Overview
  </h2>
  <div className="flex gap-4 lg:col ">
  {roleCounts.map((role, index) => (
    <div
      key={index}
      className="justify-between items-center  py-3 bg-yellow-600 rounded-2xl  h-36 w-32 border-red-700 "
    >
      <div className="font-medium text-center text-white uppercase p-3">
        {role._id || "Unknown Role"}
      </div>
     
      <div>
      <span className="bg-red-900 text-white  py-1  my-4 px-6 ">
        {role.count} Resumes
      </span>
      </div>
      <div className="w-full rounded-full h-2 mt-2">
      
       <p className="text-xs font-bold text-green-800 mt-3 text-center">
      {role.percentage}% total candidates
    </p>
      </div>
    </div>
    
  ))}
  </div>

  
</div>

{/* custom score range */}
<div>
   <div className="bg-red-100  shadow p-5 w-66 h-57 mt-5 mx-10">

  <h2 className="text-xl font-bold text-red-950 mb-3">
    Custom Score Range
  </h2>

  <div className="flex gap-3 mb-2">

    <input
      type="number"
      min="0"
      max="100"
      value={minScore}
      onChange={(e) => setMinScore(Number(e.target.value))}
      className="w-full rounded-lg  text-center border-2 border-yellow-600"
      placeholder="Min"
    />

    <input
      type="number"
      min="0"
      max="100"
      value={maxScore}
      onChange={(e) => setMaxScore(Number(e.target.value))}
      className="w-full  rounded-lg  text-center border-2 border-yellow-600 "
      placeholder="Max"
    />

  </div>

  <div className="bg-white rounded-lg m-5">

    <p className="text-gray-600 text-xs text-center">
      Matching Candidates
    </p>

    <p className="text-xl font-bold text-green-700 text-center">
      {matchingCount}
    </p>

  </div>

  <button
  onClick={() =>
    navigate(`/candidates?min=${minScore}&max=${maxScore}`)
  }
  className="bg-red-800 text-center p-3 rounded-xl text-white mx-12"
>
  View Resumes
</button>

</div>
  </div></div>
     
</div>
      
  {/* matching distribution */}
      <div className="bg-red-100 p-5 rounded-xl h-84 shadow">
  <h2 className="text-lg font-bold mb-4 text-red-950">
    Candidate Match Distribution
  </h2>
<div className=" flex">  <PieChart width={300} height={250}>
    <Pie
      data={chartData}
      dataKey="value"
      cx="50%"
      cy="50%"
      outerRadius={80}
      label
      className=" flex "
    >
      {chartData.map((entry, index) => (
        <Cell
          key={index}
          fill={COLORS[index]}
        />
      ))}
    </Pie>
<div> <Tooltip />
    <Legend /></div>
    
  </PieChart></div>
 
</div>
</div>
    


  );
}