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
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-brand-accent">Attendance</h1>
        <p className="text-skin-muted mt-1">Historical raid attendance by player (sample data).</p>
      </header>

      <div className="flex items-center gap-3">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by name or class..."
          className="w-full max-w-sm rounded-xl bg-black/30 border border-skin-base px-3 py-2 outline-none focus:ring-2 ring-brand-accent"
        />
      </div>

      <div className="rounded-2xl border border-skin-base bg-skin-elev overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-skin-muted sticky top-0 bg-skin-elev/95 backdrop-blur">
            <tr className="text-left">
              <th className="py-2 pl-4 pr-4">Player</th>
              <th className="py-2 pr-4">Class</th>
              <th className="py-2 pr-4">Raids</th>
              <th className="py-2 pr-4">% Present</th>
              <th className="py-2 pr-4">Recent (3)</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => {
              const recent = [...p.entries].slice(-3)
              return (
                <tr key={p.id} className="border-t border-skin-base">
                  <td className="py-2 pl-4 pr-4 font-medium">{p.name}</td>
                  <td className="py-2 pr-4">{p.className}</td>
                  <td className="py-2 pr-4">{p.entries.length}</td>
                  <td className="py-2 pr-4">{attendancePct(p)}%</td>
                  <td className="py-2 pr-4">
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
    </section>
  )
}
