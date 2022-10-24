import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import Main from "./pages/Main";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      {/* <Route path="/:detail" element={<Detail />} /> */}
    </Routes>
  );
}

export default App;
