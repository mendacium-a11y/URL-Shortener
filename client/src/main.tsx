import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// @ts-ignore
import { AuthProvider } from "./Context/AuthContext/index.jsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
    <App />
    </AuthProvider> 
  </React.StrictMode>,
)
