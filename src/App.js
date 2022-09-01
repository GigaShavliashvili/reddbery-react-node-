import React from "react";
import { ROUTER } from "./configs/router";
import Home from "./page/Home";
import Employee from "./page/Employee";
import LeptopInfo from "./components/LeptopInfo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div className="bg-light p-1">
      <BrowserRouter>
        <Routes>
          <Route path={ROUTER.HOME} element={<Home />} />
          <Route path={ROUTER.INFO} element={<Employee />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
