import styles from './App.module.css'
import { Outlet} from "react-router-dom";
import { NavBar } from './Components/NavBar/NavBar.tsx';


function App() {
  return (
    <div className={styles.main_container}>
      <NavBar/>
      <Outlet/>
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PetProfileOwned" element={<PetProfileOwned />} />
        <Route path="/PetProfileOthers" element={<PetProfileOthers />} />
        <Route path="/PetProfileShelter" element={<PetProfileShelter />} />
        <Route path="/create" element={<CreatePetProfile />} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
      </Routes> */}
      <div className={styles.footer }>
        Copyright © [Year of Creation] Cloud Go Go Pet Adoption. All rights reserved.
      </div>
    </div>
  )
}

export default App
