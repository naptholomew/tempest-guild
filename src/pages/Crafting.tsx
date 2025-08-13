// src/pages/Crafting.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import useWowheadTooltips from "../hooks/useWowheadTooltips";
import { getWowheadUrl } from "../lib/wowhead";
import craftingData from "../data/crafting.mock.json"; // <-- adjust path if needed

type WowheadType = "item" | "spell";

interface Recipe {
  id: number;
  name: string;
  profession: string;
  crafters: string[];
  whType?: WowheadType;
  flavortext?: string;
  tags?: string[];
}

export default function Crafting() {
  // Ensure Wowhead script is initialized (your hook likely injects it)
  useWowheadTooltips();

  // Source of truth: JSON file
  const [recipes, setRecipes] = useState<Recipe[]>(() => craftingData as Recipe[]);

  // UI state
  const [q, setQ] = useState("");
  const [prof, setProf] = useState<string>("All");
  const [crafter, setCrafter] = useState<string>("All");
  const searchRef = useRef<HTMLInputElement>(null);

  // If you ever fetch/replace data dynamically, keep setRecipes available
  useEffect(() => {
    // Example: if you later want to refetch or swap data, do it here
    setRecipes(craftingData as Recipe[]);
  }, []);

  // Refresh Wowhead tooltips after table updates
  useEffect(() => {
    // @ts-ignore - Wowhead global
    if (window.$WowheadPower) window.$WowheadPower.refreshLinks?.();
  }, [recipes, q, prof, crafter]);

  const professions = useMemo(
    () => ["All", ...Array.from(new Set(recipes.map((r) => r.profession)))],
    [recipes]
  );

  const crafters = useMemo(
    () => ["All", ...Array.from(new Set(recipes.map((r) => r.crafters).flat()))],
    [recipes]
  );

  // Filter: search includes name, tags, and crafters
  const filtered = useMemo(() => {
    const needle = q.toLowerCase().trim();
    return recipes.filter((r) => {
      const inName = !needle || r.name.toLowerCase().includes(needle);
      const inTags =
        !needle || (r.tags ?? []).some((t) => t.toLowerCase().includes(needle));
      const inCrafters =
        !needle || r.crafters.some((c) => c.toLowerCase().includes(needle));
      const matchesProf = prof === "All" || r.profession === prof;
      const matchesCrafter = crafter === "All" || r.crafters.includes(crafter);
      return (inName || inTags || inCrafters) && matchesProf && matchesCrafter;
    });
  }, [recipes, q, prof, crafter]);

  // Clicking a bubble fills the search bar with that term and focuses it
  const handleChipClick = (term: string) => {
    setQ(term);
    setTimeout(() => searchRef.current?.focus(), 0);
  };

  return (
    <section className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="flex-1">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 grid place-items-center pl-3 pr-2">
              <span className="i-lucide-search h-5 w-5 opacity-70" />
            </div>
            <input
              ref={searchRef}
              style={{ fontSize: 16 }}
              id="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search recipes, tags, or crafters…"
              className="w-full rounded-xl border border-skin-muted bg-skin-elevated pl-10 pr-3 text-[16px] sm:text-sm leading-tight h-10 sm:h-9 shadow-inner focus:outline-none focus:ring-2 focus:ring-brand-accent"
            />
          </div>
        </div>

        {/* Profession Filter */}
        <div>
          <label htmlFor="prof" className="sr-only">
            Profession
          </label>
          <div className="relative">
            <select
              style={{ fontSize: 16 }}
              value={prof}
              onChange={(e) => setProf(e.target.value)}
              id="prof"
              className="h-10 sm:h-9 rounded-xl border border-skin-muted bg-skin-elevated px-3 text-[16px] sm:text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-brand-accent"
            >
              {professions.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Crafter Filter */}
        <div>
          <label htmlFor="crafter" className="sr-only">
            Crafter
          </label>
          <div className="relative">
            <select
              style={{ fontSize: 16 }}
              value={crafter}
              onChange={(e) => setCrafter(e.target.value)}
              id="crafter"
              className="h-10 sm:h-9 rounded-xl border border-skin-muted bg-skin-elevated px-3 text-[16px] sm:text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-brand-accent"
            >
              {crafters.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
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
            {filtered.map((r) => (
              <tr
                key={`${r.whType ?? "item"}:${r.id}`} // composite key avoids collisions
                className="border-t border-skin-muted"
              >
                <td className="px-4 py-3 align-top">
                  <div className="flex flex-col gap-1">
                    <a
                      href={getWowheadUrl((r.whType ?? "item") as WowheadType, Number(r.id))}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="font-medium hover:underline"
                      data-wh-rename-link="true"
                    >
                      {r.name}
                    </a>
                    {r.flavortext && (
                      <div className="text-skin-muted text-xs leading-snug">
                        {r.flavortext}
                      </div>
                    )}
                  </div>
                </td>

                {/* Crafters */}
                <td className="px-4 py-3 align-top">
                  <div className="flex flex-wrap gap-2">
                    {r.crafters.map((c) => (
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
                      (r.tags ?? []).map((t) => (
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
            {!filtered.length && (
              <tr>
                <td className="px-4 py-6 text-skin-muted" colSpan={3}>
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
