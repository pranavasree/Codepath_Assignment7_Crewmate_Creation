import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../db/supabaseClient";
import crewmateImage from "../assets/crewmates.png";

const EditCrewmate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crewmate, setCrewmate] = useState(null);

  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data, error } = await supabase
        .from("crewmates")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching crewmate:", error);
      } else {
        setCrewmate(data);
      }
    };

    fetchCrewmate();
  }, [id]);

  console.log(crewmate);

  const handleUpdate = async () => {
    const { data, error } = await supabase
      .from("crewmates")
      .update({
        name: crewmate.name,
        speed: crewmate.speed,
        color: crewmate.color,
      })
      .eq("id", Number(id))
      .select();

    if (error) {
      console.error("Update error:", error.message);
    }
    if (data) {
      navigate("/gallery");
    }
  };

  const handleDelete = async () => {
    const { error } = await supabase.from("crewmates").delete().eq("id", id);
    if (error) {
      console.error("Delete error:", error);
    } else {
      navigate("/gallery");
    }
  };

  const handleCrewmateChange = (e) => {
    setCrewmate((prevCrewmate) => {
      if (e.target.name === "speed") {
        return {
          ...prevCrewmate,
          [e.target.name]: Number(e.target.value),
        };
      }
      return {
        ...prevCrewmate,
        [e.target.name]: e.target.value,
      };
    });
  };

  if (!crewmate)
    return <p className="text-white text-center mt-10">Loading crewmate...</p>;

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10">
      <div className="bg-gray-900 rounded-xl shadow-xl p-8 w-full max-w-3xl">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-3xl font-bold mb-4">Update Your Crewmate :)</h2>
          <img src={crewmateImage} alt="crewmates" className="w-24 mb-4" />
          <p className="text-gray-300 text-center">
            <span className="font-semibold">Current:</span> {crewmate.name},{" "}
            {crewmate.speed} mph, {crewmate.color}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block mb-1 font-medium">Name:</label>
            <input
              name="name"
              value={crewmate.name}
              onChange={handleCrewmateChange}
              className="w-full p-2 rounded bg-white text-black"
              placeholder="Enter name"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Speed (mph):</label>
            <input
              type="number"
              name="speed"
              value={crewmate.speed}
              onChange={handleCrewmateChange}
              className="w-full p-2 rounded bg-white text-black"
              placeholder="Enter speed"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Color:</label>
            <select
              name="color"
              value={crewmate.color}
              onChange={handleCrewmateChange}
              className="w-full p-2 rounded bg-white text-black"
            >
              <option>Red</option>
              <option>Green</option>
              <option>Blue</option>
              <option>Purple</option>
              <option>Yellow</option>
              <option>Orange</option>
              <option>Pink</option>
              <option>Rainbow</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center gap-6">
          <button
            onClick={handleUpdate}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded transition"
          >
            Update Crewmate
          </button>
          <button
            onClick={handleDelete}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded transition"
          >
            Delete Crewmate
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCrewmate;
