import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HrProfile() {
  const [form, setForm] = useState({
    hrName: "",
    companyName: "",
    jobTitle: "",
    companyEmail: "",
    phone: "",
    companyWebsite: "",
    industry: "",
    companySize: "",
    location: "",
    linkedin: "",
    about: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("HR Profile:", form);
    navigate("/dashboard"); // go to dashboard after profile setup
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white border border-gray-200 rounded-2xl p-10 w-full max-w-2xl">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 font-medium text-lg flex items-center justify-center mx-auto mb-3">
            HR
          </div>
          <h2 className="text-xl font-medium text-gray-900">Complete your profile</h2>
          <p className="text-sm text-gray-500 mt-1">Fill in your details to get started</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* HR Name */}
          <div>
            <label className="block text-sm text-gray-500 mb-1.5">HR Name *</label>
            <input
              type="text"
              name="hrName"
              placeholder="John Doe"
              value={form.hrName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
            />
          </div>

          {/* Job Title */}
          <div>
            <label className="block text-sm text-gray-500 mb-1.5">Job Title *</label>
            <input
              type="text"
              name="jobTitle"
              placeholder="HR Manager"
              value={form.jobTitle}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-sm text-gray-500 mb-1.5">Company Name *</label>
            <input
              type="text"
              name="companyName"
              placeholder="Acme Corp"
              value={form.companyName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
            />
          </div>

          {/* Company Email */}
          <div>
            <label className="block text-sm text-gray-500 mb-1.5">Company Email *</label>
            <input
              type="email"
              name="companyEmail"
              placeholder="hr@acme.com"
              value={form.companyEmail}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm text-gray-500 mb-1.5">Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
            />
          </div>

          {/* Company Website */}
          <div>
            <label className="block text-sm text-gray-500 mb-1.5">Company Website</label>
            <input
              type="url"
              name="companyWebsite"
              placeholder="https://acme.com"
              value={form.companyWebsite}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
            />
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm text-gray-500 mb-1.5">Industry *</label>
            <select
              name="industry"
              value={form.industry}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 bg-white"
            >
              <option value="">Select industry</option>
              <option>Information Technology</option>
              <option>Finance & Banking</option>
              <option>Healthcare</option>
              <option>Education</option>
              <option>E-Commerce</option>
              <option>Manufacturing</option>
              <option>Marketing & Advertising</option>
              <option>Consulting</option>
              <option>Other</option>
            </select>
          </div>

          {/* Company Size */}
          <div>
            <label className="block text-sm text-gray-500 mb-1.5">Company Size</label>
            <select
              name="companySize"
              value={form.companySize}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 bg-white"
            >
              <option value="">Select size</option>
              <option>1 - 10 employees</option>
              <option>11 - 50 employees</option>
              <option>51 - 200 employees</option>
              <option>201 - 500 employees</option>
              <option>500+ employees</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm text-gray-500 mb-1.5">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Mumbai, India"
              value={form.location}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label className="block text-sm text-gray-500 mb-1.5">LinkedIn Profile</label>
            <input
              type="url"
              name="linkedin"
              placeholder="https://linkedin.com/in/johndoe"
              value={form.linkedin}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
            />
          </div>

          {/* About - full width */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-500 mb-1.5">About Company</label>
            <textarea
              name="about"
              placeholder="Tell us about your company..."
              value={form.about}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 resize-none"
            />
          </div>

        </div>

        {/* Submit */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full mt-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-blue-600 hover:scale-105 transition-all duration-200 cursor-pointer"
        >
          Save & Continue
        </button>

        <p className="text-center text-xs text-gray-400 mt-4">
          You can update these details later from your profile settings.
        </p>

      </div>
    </div>
  );
}