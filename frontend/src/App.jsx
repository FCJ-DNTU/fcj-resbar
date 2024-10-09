import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Main from "./_Main";
import LoginScreen from "./screens/auth/LoginScreen";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/*" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default App;
