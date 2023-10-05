import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import ErrorPage from './Pages/Error/ErrorPage.tsx'
import { PetProfileOwned } from './Pages/PetProfileOwned/petProfileOwned.tsx';
import { PetProfileOthers } from "./Pages/PetProfileOthers/petProfileOthers.tsx";
import { PetProfileShelter } from "./Pages/PetProfileShelter/petProfileShelter.tsx";
import { CreatePetProfile } from './Pages/CreatePetProfile/createPetProfile.tsx';
import { LoginPage, action as loginAction } from "./Pages/Login/LoginPage.tsx";
import { SignUpPage, action as signUpAction } from './Pages/SignUpPage/SignUpPage.tsx';
import { Home } from './Pages/Home/home.tsx';
import { SearchPage } from './Pages/SearchPage/searchPage.tsx';
import { UserProfile, loader as userLoader } from './Pages/UserProfile/userProfile.tsx';
import { ShelterProfile, loader as shelterLoader } from './Pages/ShelterProfile/shelterProfile.tsx';
import { loader as navLoader } from './Components/NavBar/NavBar.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import axios from 'axios'

//* URL for API
export const baseAPI = axios.create({
  // baseURL: "http://44.203.125.116:8000/"
  baseURL: "http://10.26.10.55"
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: navLoader,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "login",
        element: <LoginPage />,
        action: loginAction
      },
      {
        path: "signup",
        element: <SignUpPage />,
        action: signUpAction
      },
      {
        path: "search",
        element: <SearchPage />
      },
      {
        path: "userprofile/",
        element: <UserProfile />,
        loader: userLoader
      },
      {
        path: "shelterprofile",
        element: <ShelterProfile />,
        loader: shelterLoader
      },
      {
        path: "petprofileowned/",
        element: <PetProfileOwned />
      },
      {
        path: "petprofileothers",
        element: <PetProfileOthers />
      },
      {
        path: "petprofileshelter",
        element: <PetProfileShelter />
      },
      {
        path: "create",
        element: <CreatePetProfile />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
)
