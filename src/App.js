import React from "react";
import { ROUTER } from "./configs/router";
import Home from "./page/Home";
import Employee from "./page/Employee";
import LeptopList from "./page/LeptopList";
import LeptopDetails from "./page/LeptopDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";


const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path={ROUTER.HOME} element={<Home />} />
          <Route path={ROUTER.INFO} element={<Employee />} />
          <Route path="/leptops" element={<LeptopList />} />
          <Route path="/leptopDetails/:id" element={<LeptopDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
