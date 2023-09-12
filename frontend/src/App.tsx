import styles from './App.module.css'
import { Routes, Route } from "react-router-dom";
import { NavBar } from './Components/NavBar/NavBar.tsx';
import { PetProfileOwned } from './Pages/PetProfileOwned/petProfileOwned.tsx';
import { PetProfileOthers } from "./Pages/PetProfileOthers/petProfileOthers.tsx";
import { PetProfileShelter } from "./Pages/PetProfileShelter/petProfileShelter.tsx";
import { CreatePetProfile } from './Pages/CreatePetProfile/createPetProfile.tsx';
import { LoginPage } from "./Pages/Login/LoginPage.tsx";
import { Home } from './Pages/Home/home.tsx';

function App() {
  return (
    <div className={styles.main_container}>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PetProfileOwned" element={<PetProfileOwned />} />
        <Route path="/PetProfileOthers" element={<PetProfileOthers />} />
      <Route path="/PetProfileShelter" element={<PetProfileShelter />} />
      <Route path="/create" element={<CreatePetProfile />} />
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
      <div className={styles.footer }>
        Copyright © [Year of Creation] Cloud Go Go Pet Adoption. All rights reserved.
      </div>
    </div>
  )
}

export default App
