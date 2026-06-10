import { useState } from "react";
import api from "../services/api";

const RecommendationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    qualification: "",
    experience: "",
    profession: "",
    careerGoal: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "experience" &&
      Number(value) < 0
    ) {
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setResult(null);

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      setError(
        "Please enter a valid email address."
      );
      return;
    }

    if (
      Number(formData.experience) < 0
    ) {
      setError(
        "Experience cannot be negative."
      );
      return;
    }

    setLoading(true);

    try {
      const res = await api.post(
        "/recommend",
        formData
      );

      setResult(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}

      <div className="text-center mb-8 md:mb-10 px-2">

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm sm:text-base">
          🎓 Smart Academic Guidance
        </div>

        <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
          Academic Pathway{" "}
          <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Recommendation Engine
          </span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-2">
          Get personalized academic recommendations
          based on your qualifications,
          experience, and career goals.
        </p>

      </div>

      {/* Form */}

      <div className="max-w-5xl mx-auto px-2 sm:px-0">

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 p-4 sm:p-6 lg:p-8"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="text"
              name="qualification"
              placeholder="Highest Qualification"
              required
              value={formData.qualification}
              onChange={handleChange}
              className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="number"
              name="experience"
              placeholder="Years of Experience"
              required
              min="0"
              max="60"
              step="1"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="text"
              name="profession"
              placeholder="Current Profession"
              required
              value={formData.profession}
              onChange={handleChange}
              className="md:col-span-2 w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <textarea
              name="careerGoal"
              rows="4"
              placeholder="Career Goal"
              required
              value={formData.careerGoal}
              onChange={handleChange}
              className="md:col-span-2 w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />

          </div>

          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-5">

            <p className="text-sm text-center md:text-left text-gray-500">
              🔒 Your information is secure and
              used only for recommendation
              purposes.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-10 py-4 rounded-xl text-white font-semibold bg-linear-to-r from-blue-600 to-purple-600 hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50"
            >
              {loading
                ? "Generating..."
                : "✨ Get Recommendation"}
            </button>

          </div>

        </form>

      </div>

      {/* Error */}

      {error && (
        <div className="max-w-5xl mx-auto mt-6 px-2 sm:px-0">
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-2xl">
            {error}
          </div>
        </div>
      )}

      {/* Result */}

      {result && (
        <div className="max-w-5xl mx-auto mt-8 px-2 sm:px-0">

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-4 sm:p-6 lg:p-8">

            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">

              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl">
                🎓
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Recommended Path
                </h3>

                <span className="inline-block mt-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
                  {result.recommendation}
                </span>
              </div>

            </div>

            <div className="mt-6">

              <h4 className="text-lg font-semibold text-slate-800">
                Why this recommendation?
              </h4>

              <p className="mt-3 text-gray-600 leading-relaxed">
                {result.reason}
              </p>

            </div>

          </div>

        </div>
      )}
    </>
  );
};

export default RecommendationForm;