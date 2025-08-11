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

export default function Crafting() {
  useWowheadTooltips()
  const [q, setQ] = useState('')
  const [prof, setProf] = useState('All')
  const [crafter, setCrafter] = useState('All')
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Swap this import for your real data file when ready
    import('../data/crafting.mock.json').then(mod => setRecipes(mod.default as Recipe[]))
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
    () => ['All', ...Array.from(new Set(recipes.flatMap(r => r.crafters)))],
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

  // Click handler for crafter/tag chips: set search term AND clear narrowing dropdowns
  const handleChipClick = (term: string) => {
    setProf('All')
    setCrafter('All')
    setQ(term)

    // focus search and put cursor at end
    requestAnimationFrame(() => {
      const el = searchRef.current
      if (el) {
        el.focus()
        el.setSelectionRange(el.value.length, el.value.length)
      }
    })
  }

  return (
    <section className="space-y-8">
      <header className="pb-2 border-b border-skin-base">
        <h1 className="text-3xl font-extrabold tracking-tight text-brand-accent">⚡Tempest Crafting Recipes</h1>
        <p className="text-skin-muted mt-2 text-sm">
          Hover recipe names for Wowhead tooltips. Use search and filters to narrow results.
        </p>
      </header>

      {/* Sticky controls bar — matches Attendance and is evenly spaced with interior padding */}
      <div className="sticky top-0 z-10 bg-skin-elev border-b border-skin-base py-3">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          {/* 3 even columns on sm+; stacked on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3">
            <div className="flex justify-center sm:justify-start">
              <input
                ref={searchRef}
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Search recipes, crafters, or tags..."
                className="w-full sm:w-[28rem] md:w-[32rem] rounded-lg bg-skin-elev border border-skin-base px-4 py-2 outline-none focus:ring-2 ring-brand-accent"
              />
            </div>

            <div className="flex justify-center">
              <select
                value={prof}
                onChange={e => setProf(e.target.value)}
                className="w-full sm:w-56 rounded-lg bg-skin-elev border border-skin-base px-4 py-2 outline-none focus:ring-2 ring-brand-accent"
              >
                {professions.map(p => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-center sm:justify-end">
              <select
                value={crafter}
                onChange={e => setCrafter(e.target.value)}
                className="w-full sm:w-56 rounded-lg bg-skin-elev border border-skin-base px-4 py-2 outline-none focus:ring-2 ring-brand-accent"
              >
                {crafters.map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
