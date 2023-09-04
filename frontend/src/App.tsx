import { useState } from 'react'
import styles from './App.module.css'
import { Routes, Route } from "react-router-dom";
import { PetProfileOwned } from './Pages/PetProfileOwned/petProfileOwned.tsx';
import { Home } from './Pages/Home/home.tsx';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/p" element={<PetProfileOwned />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
    
  )
}

export default App
