import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../db/supabaseClient";

const colorBorders = {
  Red: "border-red-500 shadow-red-500/50",
  Blue: "border-blue-500 shadow-blue-500/50",
  Green: "border-green-500 shadow-green-500/50",
  Yellow: "border-yellow-500 shadow-yellow-500/50",
  Pink: "border-pink-500 shadow-pink-500/50",
  Orange: "border-orange-500 shadow-orange-500/50",
};

const GalleryPage = () => {
  const [crewmates, setCrewmates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrewmates = async () => {
      const { data, error } = await supabase
        .from("crewmates")
        .select("*")
        .order("created_at", { ascending: false }); // Sort newest first

      if (error) console.error("Error fetching crewmates:", error);
      else setCrewmates(data);
      setLoading(false);
    };

    fetchCrewmates();
  }, []);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <main className="flex-1 p-10 overflow-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">
          Your Crewmate Gallery!
        </h2>

        {loading ? (
          <p className="text-center text-gray-400">Loading crewmates...</p>
        ) : crewmates.length === 0 ? (
          <div className="text-center mt-20">
            <p className="text-lg mb-4 text-gray-300">
              You haven’t made a crewmate yet!
            </p>
            <Link
              to="/add"
              className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded transition"
            >
              Create one here!
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {crewmates.map((c) => (
              <div
                key={c.id}
                className={`bg-gray-800 border-4 rounded-xl p-6 flex flex-col items-center text-center shadow-md transition hover:scale-105 ${
                  colorBorders[c.color] || "border-gray-700"
                }`}
              >
                <div className="text-6xl mb-4">👤</div>

                <p className="mb-2">
                  <strong>Name of Crewmate:</strong> {c.name}
                </p>
                <p className="mb-2">
                  <strong>Speed of Crewmate:</strong> {c.speed} mph
                </p>
                <p className="mb-4">
                  <strong>Color of Crewmate:</strong> {c.color}
                </p>

                {/* Buttons */}
                <div className="flex flex-col gap-2 w-full">
                  <Link
                    to={`/crewmate/${c.id}`}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded"
                  >
                    View Details
                  </Link>
                  <Link
                    to={`/edit/${c.id}`}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded"
                  >
                    Edit Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default GalleryPage;
