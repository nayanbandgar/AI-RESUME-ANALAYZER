// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function ResumeHistory() {

//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   const fetchHistory = async () => {

//     const response = await axios.get(
//       "http://127.0.0.1:8000/history"
//     );

//     setHistory(
//       response.data.history
//     );
//   };

//   return (
//     <div className="max-w-6xl mx-auto">

//       <h1 className="text-2xl font-bold mb-6">
//         Resume Analysis History
//       </h1>

//       <div className="grid gap-4">

//         {history.map((item, index) => (

//           <div
//             key={index}
//             className="border rounded-xl p-5 shadow"
//           >

//             <h2 className="text-xl font-semibold">
//               {item.candidate_name}
//             </h2>

//             <p>
//               <strong>Email:</strong>
//               {" "}
//               {item.email}
//             </p>

//             <p>
//               <strong>Score:</strong>
//               {" "}
//               {item.score}%
//             </p>

//             <p>
//               <strong>Experience:</strong>
//               {" "}
//               {item.experience}
//             </p>

//             <p>
//               <strong>AI Summary:</strong>
//               {" "}
//               {item.ai_summary}
//             </p>

//             <div className="mt-2">
//               <strong>Skills:</strong>

//               <div className="flex flex-wrap gap-2 mt-2">
//                 {item.skills?.map((skill, i) => (
//                   <span
//                     key={i}
//                     className="px-2 py-1 bg-blue-100 rounded"
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <p className="mt-3 text-sm text-gray-500">
//               {new Date(
//                 item.analyzed_at
//               ).toLocaleString()}
//             </p>

//           </div>
//         ))}

//       </div>

//     </div>
//   );
// }