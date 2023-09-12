import { Routes, Route } from "react-router-dom";
import { PetProfileOwned } from './Pages/PetProfileOwned/petProfileOwned.tsx';
import { PetProfileOthers } from "./Pages/PetProfileOthers/petProfileOthers.tsx";
import { PetProfileShelter } from "./Pages/PetProfileShelter/petProfileShelter.tsx";
import { CreatePetProfile } from './Pages/CreatePetProfile/createPetProfile.tsx';
import { Home } from './Pages/Home/home.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/PetProfileOwned" element={<PetProfileOwned />} />
      <Route path="/PetProfileOthers" element={<PetProfileOthers />} />
      <Route path="/PetProfileShelter" element={<PetProfileShelter />} />
      <Route path="/create" element={<CreatePetProfile />} />
      </Routes>

  )
}

export default App
