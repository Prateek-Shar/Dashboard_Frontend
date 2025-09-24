import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./app"
import { UserProvider } from './context/login_context';
import { AlertProvider } from "./context/result";
import { StatsProvider } from "./context/functions"




createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <StatsProvider>
    <AlertProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </AlertProvider>
    </StatsProvider>

  </StrictMode>,
)
