import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import axios from 'axios'

// ! DONT FORGET TO COMMENT <React.StrictMode> 
//! OR ELSE IT GONNA RENDER TWICE

//* URL for API
export const baseAPI = axios.create({
  baseURL: "http://10.26.7.142"
  });

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // {/* </React.StrictMode> */}
)
