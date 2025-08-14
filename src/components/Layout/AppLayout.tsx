import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-skin-base text-skin-base bg-storm">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
            <div className="space-y-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
