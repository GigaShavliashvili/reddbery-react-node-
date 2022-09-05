import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ROUTER } from "./configs/router";

import {Home,Information,LeptopList,LeptopDetails,NotFound} from "./page/index"


const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path={ROUTER.HOME} element={<Home />} />
          <Route path={ROUTER.INFO} element={<Information />} />
          <Route path={ROUTER.LAPTOPS} element={<LeptopList />} />
          <Route path={ROUTER.LAPTOPDETAILS} element={<LeptopDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
