// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import MyPage from "./pages/MyPage";
import WishlistPage from "./pages/Wishist"; // WishlistPage 임포트
import Header from "./components/Header";
import Basket from "./pages/Basket";
function App() {
  return (
    <AuthProvider>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/basket" element={<Basket />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
