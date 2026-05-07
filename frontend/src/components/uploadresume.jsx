import { useState } from "react";

export default function UploadResume() {
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (incoming) => {
    const valid = Array.from(incoming).filter(
      (f) => f.type === "application/pdf" || f.name.endsWith(".doc") || f.name.endsWith(".docx")
    );
    if (valid.length === 0) return alert("Only PDF or DOC/DOCX files are allowed.");
    setFiles((prev) => [...prev, ...valid]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (files.length === 0) return alert("Please select at least one resume.");
    alert(`${files.length} resume(s) uploaded successfully!`);
    // Add your upload API call here
  };

  return (
    <div className="max-w-2xl mx-auto">

      <div className="mb-6">
        <h1 className="text-xl font-medium text-gray-900">Upload Resumes</h1>
        <p className="text-sm text-gray-400 mt-1">Upload PDF or DOC files to analyze.</p>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors mb-5 ${
          dragging ? "border-blue-400 bg-blue-50" : "border-gray-200 bg-white"
        }`}
      >
        <svg className="mx-auto mb-3" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
        <p className="text-sm font-medium text-gray-700 mb-1">Drag & drop resumes here</p>
        <p className="text-xs text-gray-400 mb-4">Supports PDF, DOC, DOCX</p>
        <label className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
          Browse Files
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-xl p-4 mb-5">
          <p className="text-sm font-medium text-gray-700 mb-3">{files.length} file(s) selected</p>
          <div className="flex flex-col gap-2">
            {files.map((file, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-lg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                <span className="flex-1 text-sm text-gray-700 truncate">{file.name}</span>
                <span className="text-xs text-gray-400">{(file.size / 1024).toFixed(0)} KB</span>
                <button onClick={() => removeFile(i)} className="text-gray-300 hover:text-red-400 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={files.length === 0}
        className={`w-full py-3 rounded-xl text-sm font-medium transition-colors ${
          files.length === 0
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-900 text-white hover:bg-gray-700"
        }`}
      >
        Upload {files.length > 0 ? `${files.length} Resume(s)` : "Resumes"}
      </button>
    </div>
  );
}