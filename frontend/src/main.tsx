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
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom"

// ! DONT FORGET TO COMMENT <React.StrictMode> 
//! OR ELSE IT GONNA RENDER TWICE

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
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
        path: "login/PetProfileOwned/:id",
        element: <PetProfileOwned/>
      },
      {
        path: "PetProfileOthers",
        element: <PetProfileOthers/>
      },
      {
        path: "PetProfileShelter",
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
