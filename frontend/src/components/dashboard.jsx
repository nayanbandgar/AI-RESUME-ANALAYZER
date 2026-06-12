// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Dashboard() {
//   const [topCandidates, setTopCandidate] = useState([]);
//   const [recentResumes, setRecentResumes] = useState([]);
//   const [showResumes, setShowResumes] = useState(false);
//   const [stats, setStats] = useState({
//     total_resumes: 0,
    
//   });

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const fetchStats = async () => {

//     const response = await axios.get(
//       "http://127.0.0.1:8000/dashboard-stats"
//     );

//     setStats(response.data);
//   };
//   useEffect(() => {
//   fetchTopCandidate();
// }, []);

// const fetchTopCandidate = async () => {
//   try {
//     const response = await axios.get(
//       "http://127.0.0.1:8000/top-candidates"
//     );

//     setTopCandidate(response.data.candidates);

//   } catch (error) {
//     console.log(error);
//   }
// };
// useEffect(() => {
//   fetchRecentResumes();
// }, []);

// const fetchRecentResumes = async () => {
//   try {
//     const response = await axios.get(
//       "http://127.0.0.1:8000/recent-resumes"
//     );

//     setRecentResumes(response.data.resumes);

//   } catch (error) {
//     console.log(error);
//   }
// };

// const ResumeCard = ({ name, role, match, skills, image }) => {
//   return (
//     <div className="bg-white shadow-md rounded-xl p-5 w-64 hover:shadow-lg transition-all duration-300">
//       {/* Candidate Photo */}
//       <img
//         src={image}
//         alt={name}
//         className="w-20 h-20 rounded-full mx-auto border-4 border-indigo-500"
//       />

//       {/* Candidate Info */}
//       <h3 className="text-lg font-semibold text-gray-800 text-center mt-3">
//         {name}
//       </h3>
//       <p className="text-sm text-gray-500 text-center">{role}</p>

//       {/* Match Badge */}
//       <div className="flex justify-center mt-2">
//         <span
//           className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
//             match >= 90
//               ? "bg-green-500"
//               : match >= 80
//               ? "bg-yellow-500"
//               : "bg-red-500"
//           }`}
//         >
//           {match}% Match
//         </span>
//       </div>

//       {/* Skills */}
//       <div className="mt-3 text-center text-xs text-gray-600">
//         {skills.join(" • ")}
//       </div>

//       {/* View Resume Button */}
//       <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
//         View Resume
//       </button>
//     </div>
//   );
// };



//   return (
//     <div className="grid grid-cols-2 gap-6">
//      <div className="bg-red-100 p-5 rounded-xl shadow">
//   <h2 className="text-lg font-semibold mb-4">
//     Top Candidates
//   </h2>

//   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//     {topCandidates.map((candidate, index) => (

//       <div
//         key={index}
//         className="border rounded-xl p-4 hover:shadow-lg transition"
//       >

//         <div className="flex items-center justify-between">

//           <div>
//             <h3 className="font-semibold text-lg">
//               {candidate.candidate_name}
//             </h3>

//             <p className="text-sm text-gray-500">
//               {candidate.email}
//             </p>
//           </div>

//           <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
//             {candidate.score}%
//           </div>

//         </div>

//         <div className="mt-3">
//           <p className="text-sm text-gray-600">
//             {candidate.ai_summary}
//           </p>
//         </div>

//         <div className="flex flex-wrap gap-2 mt-3">

//           {candidate.skills?.slice(0, 4).map((skill, i) => (
//             <span
//               key={i}
//               className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
//             >
//               {skill}
//             </span>
//           ))}
//           <button className="text-xs text-white bg-blue-500 hover:underline"
//          onClick={() =>
//     window.open(
//       `http://127.0.0.1:8000/view-resume/${candidate.email}`,
//       "_blank"
//     )
//   }
//         >
//             View Resumes
//           </button>
// {showResumes && (
//   <div className="mt-4">
//     {recentResumes.map((resume, index) => (
//       <div
//         key={index}
//         className="bg-white p-4 rounded-xl shadow mb-3"
//       >
//         <h3 className="font-semibold">
//           {resume.candidate_name}
//         </h3>

//         <p className="text-sm text-gray-500">
//           {resume.candidate_email}
//         </p>

//         <p className="text-xs text-gray-400">
//           {new Date(resume.uploaded_at).toLocaleString()}
//         </p>
//       </div>
//     ))}
//   </div>
// )}
//         </div>

//       </div>

//     ))}

//   </div>
// </div>
      
      
// {/* LIST OF RECENT RESUMES */}

//       <div className="bg-red-100 p-5 rounded-xl max-w-72 shadow">
//   <h2 className="text-lg font-semibold mb-4">
//     Recent Resumes
//   </h2>

//   {recentResumes.map((resume, index) => (
//     <div
//       key={index}
//       className="border-b py-3"
//     >
//       <p className="font-medium">
//         {resume.candidate_name}
//       </p>

//       <p className="text-sm text-gray-500">
//         {resume.candidate_email}
//       </p>

//       <p className="text-xs text-gray-400">
//         {new Date(
//           resume.uploaded_at
//         ).toLocaleString()}
//       </p>
//     </div>
//   ))}
// </div>
// {/* total resumes */}
// <div className="bg-red-100 w-56 h-30 p-6 rounded-xl shadow">
//         <h2 className="text-black text-xl font-bold mb-2 text-center">
//           Total Resumes
//         </h2>

//         <p className="text-4xl font-bold text-red-950 mb-2 text-center">
//           {stats.total_resumes}
//         </p>
//       </div>

       
//       </div>
    
  
//   );
// }
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {

  const [topCandidates, setTopCandidate] = useState([]);
  const [recentResumes, setRecentResumes] = useState([]);
  const [stats, setStats] = useState({
    total_resumes: 0,
  });

  useEffect(() => {
    fetchStats();
    fetchTopCandidate();
    fetchRecentResumes();
  }, []);

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

  return (
    <div className="flex  flex-wrap gap-6">

     

      {/* Top Candidates */}
      <div className="  rounded-xl shadow  lg:col ">

        <h2 className="text-xl font-bold  text-white ">
          Top Candidates
        </h2>
        <div class="flex items-center gap-4">
    <h2 class=" whitespace-nowrap text-gray-300 mb-2">
        Highest Matching Candidates for Open Position
    </h2>
    <div class="flex-1 border-t border-gray-300"></div>
</div>

        <div className="flex gap-4 flex-wrap "> 

          {topCandidates.map((candidate, index) => (
            <div
              key={candidate.email || index}
              className="bg-red-100 rounded-xl p-4 shadow hover:shadow-lg  border border-red-300 transition"
            >

              <div className="flex justify-between items-start">

                <div>
                  <h3 className="font-semibold text-lg text-red-950">
                    {candidate.candidate_name}
                  </h3>

                  <p className="text-sm text-gray-800">
                    {candidate.email}
                  </p>
                   <div className="bg-green-700 text-white text-center mt-4 w-16 font-extrabold">
                  {Math.round(candidate.score)}%
                </div>
                </div>
                 <p className="text-gray-600">
     {candidate.role}
  </p>


               

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
                className="mt-2 w-full bg-red-100 text-black py-2 border border-red-800 rounded-lg font-bold hover:bg-red-700 hover:text-white transition"
                onClick={() =>
                  window.open(
                    `http://127.0.0.1:8000/uploads/${candidate.email}`,
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
      <div className="bg-red-100 p-5 ml-5 rounded-xl shadow lg:col-span-3 w-80">

        <h2 className="text-xl font-bold mb-4">
          Recent Resumes
        </h2>

        {recentResumes.length === 0 ? (
          <p>No resumes found.</p>
        ) : (
          recentResumes.map((resume, index) => (

            <div
              key={resume.candidate_email || index}
              className="border-b py-3"
            >
              <p className="font-medium">
                {resume.candidate_name}
              </p>

              <p className="text-sm text-gray-500">
                {resume.candidate_email}
              </p>

              <p className="text-xs text-gray-400">
                {new Date(
                  resume.uploaded_at
                ).toLocaleString()}
              </p>
            </div>

          ))
        )}

      </div>
 {/* Total Resume */}
       <div><div className="bg-red-100 p-6 w-60 h-40 rounded-xl shadow">
        <h2 className="text-xl font-bold text-center">
          Total Resumes
        </h2>

        <p className="text-5xl font-bold text-red-950 text-center mt-4">
          {stats.total_resumes}
        </p>
      </div></div>
      
    </div>

  );
}