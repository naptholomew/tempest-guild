import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, ScrollText, Gavel, Users, Hammer } from 'lucide-react'
import clsx from 'clsx'

const LINKS = [
  { to: '/', label: 'About Us', icon: ScrollText },
  { to: '/raid-policy', label: 'Raid Policy', icon: Gavel },
  { to: '/attendance', label: 'Attendance', icon: Users },
  { to: '/crafting', label: 'Crafting Recipes', icon: Hammer },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState<boolean>(false)

  // Load persisted state
  useEffect(() => {
    const raw = localStorage.getItem('tempest.sidebar.collapsed')
    if (raw) setCollapsed(raw === '1')
  }, [])

  // Persist on change
  useEffect(() => {
    localStorage.setItem('tempest.sidebar.collapsed', collapsed ? '1' : '0')
  }, [collapsed])

  return (
    <aside
      className={clsx(
        'h-screen sticky top-0 bg-skin-elev border-r border-skin-base transition-[width] duration-300 ease-out overflow-hidden',
        collapsed ? 'w-[72px]' : 'w-[280px]'
      )}
    >
      <div className="flex items-center gap-2 px-3 py-4 border-b border-skin-base">
        <button
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!collapsed}
          className="p-2 rounded-lg hover:bg-black/20 transition"
          onClick={() => setCollapsed(c => !c)}
        >
          <Menu className="h-5 w-5" />
        </button>
        {!collapsed && (
          <div className="flex-1 text-center font-extrabold tracking-wide text-lg">
            
          </div>
        )}
      </div>

{/* Banner (hidden when collapsed) */}
{!collapsed && (
  <div className="px-3 py-4">
    <img
      src="/banner.png"
      alt="Tempest Guild banner"
      className="rounded-2xl border border-skin-base w-full"
    />
  </div>
)}


      <nav className="px-2 pt-2">
        <ul className="space-y-1">
          {LINKS.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-3 rounded-xl px-3 py-2 transition outline-none',
                    'hover:bg-black/20 focus-visible:ring-2 ring-brand-accent',
                    isActive ? 'bg-black/30 text-brand-accent' : 'text-skin-base'
                  )
                }
                aria-label={label}
                title={collapsed ? label : undefined}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span className="text-sm">{label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
