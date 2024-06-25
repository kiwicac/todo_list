import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cdetails from "./pages/Cdetails";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/details/:id" element={<Cdetails/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
