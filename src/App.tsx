import React from "react";
import "./App.css";
import Login from "./Pages/Login";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import View from "./Pages/View";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute component={View} />} />
      </Routes>
    </div>
  );
}

export default App;
