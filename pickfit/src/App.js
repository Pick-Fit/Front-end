// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext"; // AuthProvider 임포트
import Home from "./Home";
import LoginPage from "./LoginPage";
import MyPage from "./MyPage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
