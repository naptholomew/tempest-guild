import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-skin-base text-skin-base bg-storm">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 px-6 py-6 w-full max-w-content mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
