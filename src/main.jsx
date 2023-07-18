import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Leva } from 'leva'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div
     style={{
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '50',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50px',
        height: '50px',
      }}
    >
    <img src="./cursor.png" width={100} />
    </div>
    <Leva collapsed />
    <App />
  </React.StrictMode>,
)
