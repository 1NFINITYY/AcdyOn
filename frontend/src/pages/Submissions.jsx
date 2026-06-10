import { useEffect, useState } from "react";
import api from "../services/api";

const Submissions = () => {
  const [submissions, setSubmissions] =
    useState([]);

  const [filteredSubmissions, setFilteredSubmissions] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    fetchSubmissions();
  }, []);

  useEffect(() => {
    const filtered =
      submissions.filter((item) =>
        `${item.full_name} ${item.email} ${item.career_goal}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );

    setFilteredSubmissions(filtered);
  }, [search, submissions]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get(
        "/submissions"
      );

      setSubmissions(
        res.data.submissions
      );

      setFilteredSubmissions(
        res.data.submissions
      );
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to load submissions"
      );
    } finally {
      setLoading(false);
    }
  };

  const getBadgeColor = (
    recommendation
  ) => {
    switch (recommendation) {
      case "PhD":
        return "bg-purple-100 text-purple-700";

      case "DBA":
        return "bg-blue-100 text-blue-700";

      case "Certification Program":
        return "bg-green-100 text-green-700";

      case "Honorary Doctorate":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        <p className="mt-4 text-gray-600 font-medium">
          Loading submissions...
        </p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-50">
        <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Previous Submissions
            </h1>

            <p className="text-gray-500 mt-2">
              View all academic pathway recommendations.
            </p>
          </div>

          <input
            type="text"
            placeholder="Search by name, email or goal..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full md:w-96 px-5 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Stats Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500 text-sm">
              Total Submissions
            </h3>

            <p className="text-3xl font-bold mt-2">
              {submissions.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500 text-sm">
              Search Results
            </h3>

            <p className="text-3xl font-bold mt-2">
              {filteredSubmissions.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500 text-sm">
              Latest Recommendation
            </h3>

            <p className="text-xl font-bold mt-2">
              {submissions[0]
                ?.recommendation || "-"}
            </p>
          </div>

        </div>

        {/* Table Section */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

          {filteredSubmissions.length === 0 ? (

            <div className="text-center py-20">

              <h3 className="text-2xl font-semibold text-gray-700">
                No submissions found
              </h3>

              <p className="text-gray-500 mt-3">
                Try changing your search query.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="bg-linear-to-r from-blue-600 to-indigo-600 text-white">

                    <th className="p-4 text-left">
                      Name
                    </th>

                    <th className="p-4 text-left">
                      Email
                    </th>

                    <th className="p-4 text-left">
                      Goal
                    </th>

                    <th className="p-4 text-left">
                      Recommendation
                    </th>

                    <th className="p-4 text-left">
                      Date
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredSubmissions.map(
                    (item) => (
                      <tr
                        key={item.id}
                        className="border-b hover:bg-slate-50 transition"
                      >

                        <td className="p-4 font-medium">
                          {item.full_name}
                        </td>

                        <td className="p-4 text-gray-600">
                          {item.email}
                        </td>

                        <td className="p-4 max-w-xs truncate">
                          {item.career_goal}
                        </td>

                        <td className="p-4">

                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${getBadgeColor(
                              item.recommendation
                            )}`}
                          >
                            {item.recommendation}
                          </span>

                        </td>

                        <td className="p-4 text-gray-600">
                          {new Date(
                            item.created_at
                          ).toLocaleDateString()}
                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>
    </div>
  );
};

export default Submissions;