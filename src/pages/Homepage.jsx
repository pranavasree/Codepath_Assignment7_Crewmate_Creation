// src/pages/HomePage.jsx
import React from "react";
import crewmatesImage from "../assets/crewmates.png";

const HomePage = () => {
  return (
    <div className="text-white text-center">
      <h2 className="text-4xl font-bold mb-4 mt-10 text-gray-200">
        Welcome to the Crewmate Creator!
      </h2>
      <p className="text-lg max-w-xl mx-auto mb-8 text-gray-300">
        Here is where you can create your very own set of crewmates before
        sending them off into space!
      </p>
      <img
        src={crewmatesImage}
        alt="Crewmates and UFO"
        className="w-3/4 max-w-md mx-auto"
      />
    </div>
  );
};

export default HomePage;
