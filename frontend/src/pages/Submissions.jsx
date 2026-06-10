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

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg">
        Loading submissions...
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
              View all your academic pathway recommendations.
            </p>
          </div>

          <input
            type="text"
            placeholder="Search by name, email or goal..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full md:w-96 px-5 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Table Card */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

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
                          {
                            item.recommendation
                          }
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
        </div>

      </div>
    </div>
  );
};

export default Submissions;