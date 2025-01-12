import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const STATIC_CONTENT_URL = '/uploads';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
)
