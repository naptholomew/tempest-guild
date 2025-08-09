import data from '../data/attendance.mock.json'
import { useMemo, useState } from 'react'

type PlayerId = string

interface AttendanceEntry {
  date: string
  raidName: string
  present: boolean
  role?: 'Tank' | 'Healer' | 'Melee' | 'Ranged'
}

interface Player {
  id: PlayerId
  name: string
  className: string
  entries: AttendanceEntry[]
}

export default function Attendance() {
  const [query, setQuery] = useState('')
  const players = data as Player[]

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return players
    return players.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.className.toLowerCase().includes(q)
    )
  }, [players, query])

  const attendancePct = (p: Player) => {
    const total = p.entries.length || 1
    const present = p.entries.filter(e => e.present).length
    return Math.round((present / total) * 100)
  }

  return (
    <section className="space-y-8">
      <header className="pb-2 border-b border-skin-base">
        <h1 className="text-3xl font-extrabold tracking-tight text-brand-accent">Attendance</h1>
        <p className="text-skin-muted mt-2 text-sm">Historical raid attendance by player (sample data).</p>
      </header>

      <div className="rounded-3xl border border-skin-base bg-skin-elev p-3 sm:p-4 space-y-3">
        <div className="flex items-center gap-3">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by name or class..."
            className="w-full max-w-sm rounded-2xl bg-black/30 border border-skin-base px-4 py-2.5 outline-none focus:ring-2 ring-brand-accent"
          />
        </div>

        <div className="overflow-x-auto rounded-2xl border border-skin-base">
          <table className="min-w-full text-[15px]">
            <thead className="text-skin-muted sticky top-0 bg-skin-elev/95 backdrop-blur">
              <tr className="text-left">
                <th className="py-3 pl-5 pr-4">Player</th>
                <th className="py-3 pr-4">Class</th>
                <th className="py-3 pr-4">Raids</th>
                <th className="py-3 pr-4">% Present</th>
                <th className="py-3 pr-5">Recent (3)</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const recent = [...p.entries].slice(-3)
                return (
                  <tr key={p.id} className="border-t border-skin-base odd:bg-white/5 hover:bg-white/10 transition-colors">
                    <td className="py-3 pl-5 pr-4 font-medium text-sm">{p.name}</td>
                    <td className="py-3 pr-4 text-sm">{p.className}</td>
                    <td className="py-3 pr-4 text-sm">{p.entries.length}</td>
                    <td className="py-3 pr-4 text-sm">{attendancePct(p)}%</td>
                    <td className="py-3 pr-5">
                      <div className="flex gap-1">
                        {recent.map((e, i) => (
                          <span key={i} className={e.present ? 'text-green-400' : 'text-red-400'}>
                            {e.present ? '✓' : '✗'}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
