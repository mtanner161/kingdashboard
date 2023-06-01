import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./componants/Home";
import Navbar from "./componants/Navbar";
import Finance from "./componants/pages/Finance";
import Operations from "./componants/pages/Operations";
import ClientRelations from "./componants/pages/ClientRelations";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Finance" element={<Finance />} />
        <Route path="Operations" element={<Operations />} />
        <Route path="Client%20Relations" element={<ClientRelations />} />
      </Routes>
    </div>
  );
}

export default App;
