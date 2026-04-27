export default function Dashboard() {
  return (
    <div className="h-full  w-full bg-linear-to-br from-[#dae2f8] to-[#d6a4a4]">
      <h1 className="text-xl font-medium text-gray-700 mb-6 ">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 w-3xl p-20 mx-auto">
        {[
          { label: "Total resumes", value: 24 },
          { label: "Analyzed", value: 18 },
          { label: "Top candidates", value: 6 },
          { label: "Pending review", value: 3 },
        ].map((card) => (
          <div key={card.label} className="bg-gray-50 border border-gray-100 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-1">{card.label}</p>
            <p className="text-2xl font-medium text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}