import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Menu,
  ScrollText,
  Gavel,
  Users,
  Hammer,
  CalendarDays,
  ListChecks,
  ListTodo,
} from 'lucide-react'
import clsx from 'clsx'

const LINKS = [
  { to: '/', label: 'About Us', icon: ScrollText },
  { to: '/raid-policy', label: 'Raid Policy', icon: Gavel },
  { to: '/attendance', label: 'Attendance', icon: Users },
  { to: '/crafting', label: 'Crafting Recipes', icon: Hammer },
]

// External links below decorative divider (nested section)
const EXTRA_LINKS = [
  { to: 'https://fresh.warcraftlogs.com/guild/calendar/775047', label: 'WCL Calendar', icon: CalendarDays },
  { to: 'https://thatsmybis.com/22393/tempest/loot/temple-of-ahnqiraj', label: 'AQ40 Gear List', icon: ListChecks },
  { to: 'https://thatsmybis.com/22393/tempest/loot/naxxramas', label: 'NAXX Gear List', icon: ListTodo },
]

// Helper: detect "mobile" using same breakpoint as Tailwind's md (<768px)
function isMobileViewport() {
  if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') return false
  return window.matchMedia('(max-width: 767px)').matches
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    const raw = window.localStorage.getItem('tempest.sidebar.collapsed')
    if (raw === '1') return true
    if (raw === '0') return false
    return isMobileViewport()
  })

  useEffect(() => {
    try {
      window.localStorage.setItem('tempest.sidebar.collapsed', collapsed ? '1' : '0')
    } catch {}
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
            {/* (intentionally blank — title removed) */}
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
                {!collapsed && <span className="text-base">{label}</span>}
              </NavLink>
            </li>
          ))}

          {/* Decorative, inset divider below Crafting Recipes (inset only when expanded) */}
          <li aria-hidden="true">
            <hr
              className={clsx(
                'my-3 border-t-2 border-dashed border-skin-base/50',
                !collapsed && 'mx-3'
              )}
            />
          </li>

          {/* Nested extra links (indent only when expanded; smaller font) */}
          {EXTRA_LINKS.map(({ to, label, icon: Icon }, idx) => (
            <li key={to} className={clsx(!collapsed && 'ml-2', idx === 0 && 'mt-1')}>
              <a
                href={to}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl px-3 py-2 transition outline-none hover:bg-black/20 focus-visible:ring-2 ring-brand-accent text-skin-base"
                aria-label={label}
                title={collapsed ? label : undefined}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span className="text-sm">{label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
