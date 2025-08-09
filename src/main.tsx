import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles/globals.css'

import AppLayout from './components/Layout/AppLayout'
import About from './pages/About'
import RaidPolicy from './pages/RaidPolicy'
import Attendance from './pages/Attendance'
import Crafting from './pages/Crafting'



const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <About /> },
      { path: '/raid-policy', element: <RaidPolicy /> },
      { path: '/attendance', element: <Attendance /> },
      { path: '/crafting', element: <Crafting /> },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
