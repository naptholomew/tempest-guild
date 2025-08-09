import { useEffect, useMemo, useState } from 'react'
import data from '../data/crafting.mock.json'
import { getWowheadItemUrl } from '../lib/wowhead'
import useWowheadTooltips from '../hooks/useWowheadTooltips'

interface Recipe {
  id: number
  name: string
  profession: string
  minSkill: number
  crafters: string[]
  mats: string
}

export default function Crafting() {
  useWowheadTooltips() // lazy-load Wowhead script on this page
  const [q, setQ] = useState('')
  const [prof, setProf] = useState('All')
  const [crafter, setCrafter] = useState('All')

  const recipes = data as Recipe[]
  const professions = useMemo(() => ['All', ...Array.from(new Set(recipes.map(r => r.profession)))], [recipes])
  const crafters = useMemo(() => ['All', ...Array.from(new Set(recipes.flatMap(r => r.crafters)))], [recipes])

  const filtered = useMemo(() => {
    return recipes.filter(r => {
      const matchesQ = q.trim() === '' || r.name.toLowerCase().includes(q.toLowerCase())
      const matchesProf = prof === 'All' || r.profession === prof
      const matchesCrafter = crafter === 'All' || r.crafters.includes(crafter)
      return matchesQ && matchesProf && matchesCrafter
    })
  }, [recipes, q, prof, crafter])

  useEffect(() => {
    // If the Wowhead script exposes a refresh method, nudge it after filtering.
    // @ts-ignore
    if (window.$WowheadPower) {
      // @ts-ignore
      window.$WowheadPower.refreshLinks?.()
    }
  }, [filtered])

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-brand-accent">Crafting Recipes</h1>
        <p className="text-skin-muted mt-1">Who can craft what (sample data) — with Wowhead tooltips.</p>
      </header>

      <div className="flex flex-wrap gap-3 items-center">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search recipes..."
          className="rounded-xl bg-black/30 border border-skin-base px-3 py-2 outline-none focus:ring-2 ring-brand-accent"
        />
        <select
          value={prof}
          onChange={e => setProf(e.target.value)}
          className="rounded-xl bg-black/30 border border-skin-base px-3 py-2 outline-none focus:ring-2 ring-brand-accent"
        >
          {professions.map(p => <option key={p}>{p}</option>)}
        </select>
        <select
          value={crafter}
          onChange={e => setCrafter(e.target.value)}
          className="rounded-xl bg-black/30 border border-skin-base px-3 py-2 outline-none focus:ring-2 ring-brand-accent"
        >
          {crafters.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="rounded-2xl border border-skin-base bg-skin-elev overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-skin-muted">
            <tr className="text-left">
              <th className="py-2 pl-4 pr-4">Recipe</th>
              <th className="py-2 pr-4">Profession</th>
              <th className="py-2 pr-4">Min Skill</th>
              <th className="py-2 pr-4">Crafter(s)</th>
              <th className="py-2 pr-4">Mats</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} className="border-t border-skin-base">
                <td className="py-2 pl-4 pr-4">
                  <a
                    href={getWowheadItemUrl(r.id)}
                    data-wh-icon="true"
                    data-wh-rename-link="false"
                    data-wh-rename-duplicate="false"
                    className="hover:underline"
                  >
                    {r.name}
                  </a>
                </td>
                <td className="py-2 pr-4">{r.profession}</td>
                <td className="py-2 pr-4">{r.minSkill}</td>
                <td className="py-2 pr-4">{r.crafters.join(', ')}</td>
                <td className="py-2 pr-4">{r.mats}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
