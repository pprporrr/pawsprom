import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import ErrorPage from './Pages/Error/ErrorPage.tsx'
import { PetProfileOwned } from './Pages/PetProfileOwned/petProfileOwned.tsx';
import { PetProfileOthers } from "./Pages/PetProfileOthers/petProfileOthers.tsx";
import { PetProfileShelter } from "./Pages/PetProfileShelter/petProfileShelter.tsx";
import { CreatePetProfile } from './Pages/CreatePetProfile/createPetProfile.tsx';
import { LoginPage } from "./Pages/Login/LoginPage.tsx";
import { SignUpPage } from './Pages/SignUpPage/SignUpPage.tsx';
import { Home } from './Pages/Home/home.tsx';
import { SearchPage } from './Pages/SearchPage/searchPage.tsx';
// import { loader as navLoader } from './Components/NavBar/NavBar.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import axios from 'axios'

// ! DONT FORGET TO COMMENT <React.StrictMode> 
//! OR ELSE IT GONNA RENDER TWICE

//* URL for API
export const baseAPI = axios.create({
  baseURL: "http://10.26.7.142"
  });

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
    // loader: navLoader,
    children: [
      { index: true, element: <Home/>},
      {
        path: "login",
        element: <LoginPage/>,
      },
      {
        path: "signup",
        element: <SignUpPage/>
      },
      {
        path: "search",
        element: <SearchPage/>
      },
      {
        path: "petprofileowned/:username",
        element: <PetProfileOwned/>
      },
      {
        path: "petprofileothers",
        element: <PetProfileOthers/>
      },
      {
        path: "petprofileshelter",
        element: <PetProfileShelter/>
      },
      {
        path: "create",
        element: <CreatePetProfile/>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
