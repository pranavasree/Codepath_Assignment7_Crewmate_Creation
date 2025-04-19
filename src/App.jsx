// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/Homepage";
import AddCrewmate from "./components/AddCrewmate";
import GalleryPage from "./components/GalleryPage";
import CrewmateDetails from "./pages/CrewmateDetails";
import EditCrewmate from "./components/EditCrewmate";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddCrewmate />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/crewmate/:id" element={<CrewmateDetails />} />{" "}
          <Route path="/edit/:id" element={<EditCrewmate />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
