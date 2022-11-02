import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import Main from "./pages/Main";
import Finance from "./pages/Finance";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/finance" element={<Finance />} />
    </Routes>
  );
}

export default App;
