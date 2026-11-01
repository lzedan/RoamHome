import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { platform } from './platform'
import { Stage } from './tv/Stage'
import './index.css'

document.documentElement.dataset.effects = platform.effects

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Stage>
      <App />
    </Stage>
  </React.StrictMode>,
)
