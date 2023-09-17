import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"

// ! DONT FORGET TO COMMENT <React.StrictMode> 
//! OR ELSE IT GONNA RENDER TWICE

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // {/* </React.StrictMode> */}
)
