import { useEffect, useMemo, useState } from 'react'
import useWowheadTooltips from '../hooks/useWowheadTooltips'
import { getWowheadUrl } from '../lib/wowhead'

type WowheadType = 'item' | 'spell'

interface Mat {
  id: number
  name: string
  qty: number
  whType?: WowheadType
}

interface Recipe {
  id: number
  name: string
  profession: string
  crafters: string[]
  mats: string
  whType?: WowheadType
  flavortext?: string
  matsDetailed?: Mat[]
}

export default function Crafting() {
  useWowheadTooltips()
  const [q, setQ] = useState('')
  const [prof, setProf] = useState('All')
  const [crafter, setCrafter] = useState('All')
  const [recipes, setRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    import('../data/crafting.mock.json').then(mod => setRecipes(mod.default as Recipe[]))
  }, [])

  useEffect(() => {
    // @ts-ignore
    if (window.$WowheadPower) window.$WowheadPower.refreshLinks?.()
  }, [recipes])

  const professions = useMemo(
    () => ['All', ...Array.from(new Set(recipes.map(r => r.profession)))],
    [recipes]
  )
  const crafters = useMemo(
    () => ['All', ...Array.from(new Set(recipes.flatMap(r => r.crafters)))],
    [recipes]
  )

  const filtered = useMemo(() => {
    return recipes.filter(r => {
      const matchesQ = q.trim() === '' || r.name.toLowerCase().includes(q.toLowerCase())
      const matchesProf = prof === 'All' || r.profession === prof
      const matchesCrafter = crafter === 'All' || r.crafters.includes(crafter)
      return matchesQ && matchesProf && matchesCrafter
    })
  }, [recipes, q, prof, crafter])

  return (
    <section className="space-y-8">
      <header className="pb-2 border-b border-skin-base">
        <h1 className="text-3xl font-extrabold tracking-tight text-brand-accent">Crafting Recipes</h1>
        <p className="text-skin-muted mt-2 text-sm">
          Hover recipe names and materials for Wowhead tooltips. Use search and filters to narrow results.
        </p>
      </header>

      <div className="flex flex-wrap gap-3 items-center">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search recipes..."
          className="rounded-2xl bg-black/30 border border-skin-base px-4 py-2.5 outline-none focus:ring-2 ring-brand-accent"
        />
        <select
          value={prof}
          onChange={e => setProf(e.target.value)}
          className="rounded-2xl bg-black/30 border border-skin-base px-4 py-2.5 outline-none focus:ring-2 ring-brand-accent"
        >
          {professions.map(p => <option key={p}>{p}</option>)}
        </select>
        <select
          value={crafter}
          onChange={e => setCrafter(e.target.value)}
          className="rounded-2xl bg-black/30 border border-skin-base px-4 py-2.5 outline-none focus:ring-2 ring-brand-accent"
        >
          {crafters.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="rounded-3xl border border-skin-base bg-skin-elev overflow-x-auto p-2">
        <table className="min-w-full text-[15px]">
          <thead className="text-skin-muted">
            <tr className="text-left">
              <th className="py-3 pl-5 pr-4">Recipe</th>
              <th className="py-3 pr-4">Profession</th>
              <th className="py-3 pr-4">Crafter(s)</th>
              <th className="py-3 pr-5">Mats</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={`${r.whType ?? 'item'}-${r.id}`} className="border-t border-skin-base">
                <td className="py-3 pl-5 pr-4">
                  <div className="min-h-20 flex flex-col justify-center leading-snug">
                    <a
                      href={getWowheadUrl(r.id, r.whType ?? 'item')}
                      data-wh-icon="true"
                      data-wh-rename-link="false"
                      data-wh-rename-duplicate="false"
                      className="hover:underline text-lg font-semibold"
                    >
                      {r.name}
                    </a>
                    {r.flavortext && (
                      <div className="text-xs text-skin-muted mt-1">{r.flavortext}</div>
                    )}
                  </div>
                </td>
                <td className="py-3 pr-4 align-middle text-sm">{r.profession}</td>
                <td className="py-3 pr-4 align-middle text-sm">{r.crafters.join(', ')}</td>
                <td className="py-3 pr-5 align-middle text-xs text-skin-muted">
                  {r.matsDetailed && r.matsDetailed.length > 0 ? (
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      {r.matsDetailed.map((m, i) => (
                        <span key={`${m.whType ?? 'item'}-${m.id}-${i}`}>
                          <a
                            href={getWowheadUrl(m.id, m.whType ?? 'item')}
                            data-wh-icon="true"
                            data-wh-rename-link="false"
                            data-wh-rename-duplicate="false"
                            className="hover:underline"
                          >
                            {m.name}
                          </a>
                          <span> ×{m.qty}</span>
                        </span>
                      ))}
                    </div>
                  ) : (
                    r.mats
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
