import { useState } from 'react'
import styles from './App.module.css'
import { Routes, Route } from "react-router-dom";
import { PetProfileOwned } from './Pages/PetProfileOwned/petProfileOwned.tsx';
import { CreatePetProfile } from './Pages/CreatePetProfile/createPetProfile.tsx';
import { Home } from './Pages/Home/home.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/p" element={<PetProfileOwned />} />
      <Route path="/create" element={<CreatePetProfile />} />
      </Routes>

  )
}

export default App
