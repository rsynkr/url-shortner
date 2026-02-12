import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loginpage from './loginpage/loginpage.jsx'
import Urlshortner from './loginpage/urlshortner.jsx'
const App = () => {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/dashboard" element={<Urlshortner />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
