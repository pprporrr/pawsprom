import { useState } from 'react'
import styles from './App.module.css'
import { Routes, Route } from "react-router-dom";
import { PetProfileOwned } from './Pages/PetProfileOwned/petProfileOwned.tsx';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<PetProfileOwned />} />
      </Routes>
    </div>
    
  )
}

export default App
