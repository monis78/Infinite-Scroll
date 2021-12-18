import React, { useState } from "react";
import App from "./App";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
// import your route components too

export default function IndexRoute() {
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState(false);
  const onSubmit = (data) => {
    console.clear();
    console.log(data);
    if (data.username && data.password) {
      setIsLogin(true);
      setError(false);
    } else {
      setError(true);
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isLogin ? (
              <Navigate to="/home" />
            ) : (
              <Login onSubmit={onSubmit} error={error} />
            )
          }
        ></Route>
        <Route
          path="/home"
          element={
            isLogin ? (
              <App
                onLogout={() => {
                  setIsLogin(false);
                }}
              />
            ) : (
                <Navigate to="/" />
            )
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
