// src/pages/CrewmateDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../db/supabaseClient";

const CrewmateDetails = () => {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);

  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data, error } = await supabase
        .from("crewmates")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error("Error fetching crewmate:", error);
      else setCrewmate(data);
    };

    fetchCrewmate();
  }, [id]);

  if (!crewmate) {
    return <p className="text-white text-center mt-10">Loading crewmate...</p>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-10 flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-6">Crewmate: {crewmate.name}</h2>
      <h3 className="text-2xl mb-4">Stats:</h3>
      <p className="mb-2">Color: {crewmate.color}</p>
      <p className="mb-2">Speed: {crewmate.speed} mph</p>

      {crewmate.speed < 5 && (
        <p className="text-yellow-400 mt-4">
          You may want to find a Crewmate with more speed, this one is kind of
          slow 😅
        </p>
      )}

      <Link
        to={`/edit/${crewmate.id}`}
        className="mt-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
      >
        Wanna edit this Crewmate?
      </Link>

      <div className="mt-6 text-5xl">🧑‍🚀💨👽</div>
    </div>
  );
};

export default CrewmateDetails;
