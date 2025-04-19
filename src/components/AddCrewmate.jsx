import React, { useState } from "react";
import { supabase } from "../db/supabaseClient";
import toast, { Toaster } from "react-hot-toast";

const AddCrewmate = () => {
  const [name, setName] = useState("");
  const [hat, setHat] = useState("");
  const [color, setColor] = useState("");
  const [speed, setSpeed] = useState(""); // New field for speed

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("crewmates").insert([
      {
        name,
        color,
        hat,
        speed,
      },
    ]);

    if (error) {
      console.error("Error inserting:", error);
      toast.error("❌ Failed to add crewmate");
    } else {
      toast.success("Crewmate added successfully!");
      setName("");
      setHat("");
      setColor("");
      setSpeed("");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-20 bg-gray-800 p-8 rounded-xl shadow-lg text-white">
      <Toaster
        position="right-10 bottom-50"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />

      <h2 className="text-3xl font-bold mb-6 text-center text-gray-200">
        🚀 Add a New Crewmate
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-semibold mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            required
            placeholder="Enter crewmate name"
          />
        </div>

        {/* Hat Dropdown */}
        <div>
          <label className="block text-sm font-semibold mb-2">Hat</label>
          <select
            value={hat}
            onChange={(e) => setHat(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            required
          >
            <option value="">Select a hat</option>
            <option value="Beanie">🧢 Beanie</option>
            <option value="Cowboy">🤠 Cowboy</option>
            <option value="Top Hat">🎩 Top Hat</option>
          </select>
        </div>

        {/* Color Picker */}
        <div>
          <label className="block text-sm font-semibold mb-2">Color</label>
          <div className="flex gap-4 flex-wrap">
            {["Red", "Blue", "Green", "Yellow"].map((c) => (
              <button
                key={c}
                type="button"
                className={`px-4 py-2 rounded-lg font-medium border-2 transition ${
                  color === c
                    ? "bg-blue-700 text-black border-black hover:bg-blue-400"
                    : "bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
                }`}
                onClick={() => setColor(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Speed Input */}
        <div>
          <label className="block text-sm font-semibold mb-2">Speed</label>
          <input
            type="number"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            required
            placeholder="e.g. 5.5"
            min="0"
            step="0.1"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-bold transition duration-300"
        >
          ➕ Add Crewmate
        </button>
      </form>
    </div>
  );
};

export default AddCrewmate;
