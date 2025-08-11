import { useEffect, useMemo, useRef, useState } from 'react'
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

...
  }, [])

  useEffect(() => {
    // Refresh Wowhead tooltips after table updates
    // @ts-ignore
    if (window.$WowheadPower) window.$WowheadPower.refreshLinks?.()
  }, [recipes])

  const professions = useMemo(
    () => ['All', ...Array.from(new Set(recipes.map(r => r.profession)))],
    [recipes]
  )

  const crafters = useMemo(
    () => ['All', ...Array.from(new Set(recipes.map(r => r.crafters).flat()))],
    [recipes]
  )

  // Filter: search now includes crafters (in addition to recipe name + tags)
  const filtered = useMemo(() => {
    const needle = q.toLowerCase().trim()
    return recipes.filter(r => {
      const inName = !needle || r.name.toLowerCase().includes(needle)
      const inTags = !needle || (r.tags ?? []).some(t => t.toLowerCase().includes(needle))
      const inCrafters = !needle || r.crafters.some(c => c.toLowerCase().includes(needle))
      const matchesProf = prof === 'All' || r.profession === prof
      const matchesCrafter = crafter === 'All' || r.crafters.includes(crafter)
      return (inName || inTags || inCrafters) && matchesProf && matchesCrafter
    })
  }, [recipes, q, prof, crafter])

  // Click handler for crafter/tag chip
  const handleChipClick = (term: string) => {
    setQ(term)
    setTimeout(() => searchRef.current?.focus(), 0)
  }

  return (
    <section className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="flex-1">
          <label htmlFor="search" className="sr-only">Search</label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 grid place-items-center pl-3 pr-2">
              <span className="i-lucide-search h-5 w-5 opacity-70" />
            </div>
            <input
              ref={searchRef}
                style={{ fontSize: 16 }}
              id="search"
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Search recipes, tags, or crafters…"
              className="w-full rounded-xl border border-skin-muted bg-skin-elevated pl-10 pr-3 text-[16px] sm:text-sm leading-tight h-10 sm:h-9 shadow-inner focus:outline-none focus:ring-2 focus:ring-brand-accent"
            />
          </div>
        </div>

        {/* Profession Filter */}
        <div>
          <label htmlFor="prof" className="sr-only">Profession</label>
          <div className="relative">
            <select
                style={{ fontSize: 16 }}
              value={prof}
              onChange={e => setProf(e.target.value)}
              id="prof"
              className="h-10 sm:h-9 rounded-xl border border-skin-muted bg-skin-elevated px-3 text-[16px] sm:text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-brand-accent"
            >
              {professions.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Crafter Filter */}
        <div>
          <label htmlFor="crafter" className="sr-only">Crafter</label>
          <div className="relative">
            <select
                style={{ fontSize: 16 }}
              value={crafter}
              onChange={e => setCrafter(e.target.value)}
              id="crafter"
              className="h-10 sm:h-9 rounded-xl border border-skin-muted bg-skin-elevated px-3 text-[16px] sm:text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-brand-accent"
            >
              {crafters.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table wrapper */}
      <div className="overflow-x-auto rounded-xl border border-skin-muted bg-skin-base shadow">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 z-10 bg-skin-elevated">
            <tr className="text-left">
              <th className="px-4 py-3">Recipe</th>
              <th className="px-4 py-3">Crafter(s)</th>
              <th className="px-4 py-3">Tags</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} className="border-t border-skin-muted">
                <td className="px-4 py-3 align-top">
                  <div className="flex flex-col gap-1">
                    <a
                      href={getWowheadUrl(r.whType ?? 'item', r.id)}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="font-medium hover:underline"
                      data-wh-rename-link="true"
                    >
                      {r.name}
                    </a>
                    {r.flavortext && (
                      <div className="text-skin-muted text-xs leading-snug">{r.flavortext}</div>
                    )}
                  </div>
                </td>

                {/* Crafters */}
                <td className="px-4 py-3 align-top">
                  <div className="flex flex-wrap gap-2">
                    {r.crafters.map(c => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => handleChipClick(c)}
                        className="rounded-full border border-skin-muted bg-skin-elevated px-2.5 py-1 text-xs leading-tight hover:bg-skin-elevated/80"
                        title={`Search for ${c}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </td>

                {/* Tags */}
                <td className="px-4 py-3 align-top">
                  <div className="flex flex-wrap gap-2">
                    {(r.tags ?? []).length ? (
                      (r.tags ?? []).map(t => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => handleChipClick(t)}
                          className="rounded-full border border-skin-muted bg-skin-elevated px-2.5 py-1 text-xs leading-tight hover:bg-skin-elevated/80"
                          title={`Search for ${t}`}
                        >
                          {t}
                        </button>
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
    </section>
  )
}
