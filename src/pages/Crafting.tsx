import { useEffect, useMemo, useState } from 'react'
import useWowheadTooltips from '../hooks/useWowheadTooltips'
import { getWowheadUrl } from '../lib/wowhead'

type WowheadType = 'item' | 'spell'

interface Recipe {
  id: number
  name: string
  profession: string
  crafters: string[]
  whType?: WowheadType
  flavortext?: string
  tags?: string[]
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
    const needle = q.toLowerCase().trim()
    return recipes.filter(r => {
      const inName = !needle || r.name.toLowerCase().includes(needle)
      const inTags = !needle || (r.tags ?? []).some(t => t.toLowerCase().includes(needle))
      const matchesProf = prof === 'All' || r.profession === prof
      const matchesCrafter = crafter === 'All' || r.crafters.includes(crafter)
      return (inName || inTags) && matchesProf && matchesCrafter
    })
  }, [recipes, q, prof, crafter])

  return (
    <section className="space-y-8">
      <header className="pb-2 border-b border-skin-base">
        <h1 className="text-3xl font-extrabold tracking-tight text-brand-accent">Crafting Recipes</h1>
        <p className="text-skin-muted mt-2 text-sm">
          Hover recipe names for Wowhead tooltips. Use search and filters to narrow results.
        </p>
      </header>

      {/* Wrap filters + table in one card for consistent bg */}
      <div className="rounded-3xl border border-skin-base bg-skin-elev p-3 sm:p-4 space-y-3">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search recipes or tags..."
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

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-skin-base">
          <table className="min-w-full text-[15px]">
            {/* Column widths: Recipe 45%, Prof 15%, Crafters 25%, Tags 15% */}
            <colgroup>
              <col className="w-[35%]" />
              <col className="w-[20%]" />
              <col className="w-[25%]" />
              <col className="w-[20%]" />
            </colgroup>

            <thead className="text-skin-muted">
              <tr className="text-left">
                <th className="py-3 pl-5 pr-4">Recipe</th>
                <th className="py-3 pr-4">Profession</th>
                <th className="py-3 pr-4">Crafter(s)</th>
                <th className="py-3 pr-5">Tags</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map(r => (
                <tr
                  key={`${r.whType ?? 'item'}-${r.id}`}
                  className="border-t border-skin-base odd:bg-white/5 hover:bg-white/10 transition-colors"
                >
                  {/* Recipe */}
                  <td className="py-3 pl-5 pr-4">
                    <div className="min-h-20 flex flex-col justify-center leading-snug">
                      <a
                        href={getWowheadUrl(r.id, r.whType ?? 'item')}
                        data-wh-icon="true"
                        data-wh-rename-link="false"
                        data-wh-rename-duplicate="false"
                        className="hover:underline text-lg font-semibold text-brand-accent/90 hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/60 rounded"
                      >
                        {r.name}
                      </a>
                      {r.flavortext && (
                        <div className="text-xs text-skin-muted mt-1">{r.flavortext}</div>
                      )}
                    </div>
                  </td>

                  {/* Profession */}
                  <td className="py-3 pr-4 align-middle text-sm text-skin-muted italic">
                    {r.profession}
                  </td>

                  {/* Crafters */}
                  <td className="py-3 pr-4 align-middle text-sm text-skin-base">
                    {r.crafters.join(', ')}
                  </td>

                  {/* Tags */}
                  <td className="py-3 pr-5 align-middle text-xs">
                    <div className="flex flex-wrap gap-1.5">
                      {(r.tags ?? []).length ? (
                        (r.tags ?? []).map((t, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-full bg-white/10 text-skin-base border border-white/10"
                            title={t}
                          >
                            {t}
                          </span>
                        ))
                      ) : (
                        <span className="text-skin-muted">—</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
