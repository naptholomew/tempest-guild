// src/pages/Crafting.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import useWowheadTooltips from "../hooks/useWowheadTooltips";
import { getWowheadUrl } from "../lib/wowhead";
import craftingData from "../data/crafting.mock.json"; // adjust path if needed

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
  useWowheadTooltips();

  // Data from JSON (normalize to be safe)
  const [recipes] = useState<Recipe[]>(
    () => (craftingData as any[]).map((r) => ({
      ...r,
      id: Number(r.id),
      crafters: Array.isArray(r.crafters) ? r.crafters.map(String) : [],
      tags: Array.isArray(r.tags) ? r.tags.map(String) : [],
    })) as Recipe[]
  );

  // Controls
  const [query, setQuery] = useState("");
  const [prof, setProf] = useState<string>("All");
  const [crafter, setCrafter] = useState<string>("All");
  const searchRef = useRef<HTMLInputElement>(null);

  // Derived filter options
  const professions = useMemo(
    () => ["All", ...Array.from(new Set(recipes.map((r) => r.profession)))],
    [recipes]
  );
  const crafters = useMemo(
    () => ["All", ...Array.from(new Set(recipes.flatMap((r) => r.crafters)))],
    [recipes]
  );

  // Filtering logic: search includes name, tags, and crafters
  const filtered = useMemo(() => {
    const needle = query.toLowerCase().trim();
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
  }, [recipes, query, prof, crafter]);

  // Refresh Wowhead tooltips after render updates
  useEffect(() => {
    // @ts-ignore
    if (window.$WowheadPower) window.$WowheadPower.refreshLinks?.();
  }, [filtered]);

  // Clicking a bubble fills the search bar with that term and focuses it
  const handleChipClick = (term: string) => {
    setQuery(term);
    setTimeout(() => searchRef.current?.focus(), 0);
  };

  return (
    <section className="space-y-8">
      {/* Header (mirror Attendance.tsx) */}
      <header className="pb-2 border-b border-skin-base">
        <h1 className="text-3xl font-extrabold tracking-tight text-brand-accent">⚡Tempest Crafting</h1>
        <p className="text-skin-muted mt-2 text-sm">
          Browse recipes by profession, crafter, or tag. Click any chip to filter.
        </p>
      </header>

      {/* Sticky controls bar — matches Attendance height and styling */}
      <div className="sticky top-0 z-10 bg-skin-elev border-b border-skin-base shadow-sm">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Left: search */}
            <div className="flex items-center gap-3 w-full">
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search recipes, tags, or crafters…"
                className="w-full sm:w-[22rem] md:w-[19.5rem] px-4 py-2 rounded-lg border border-skin-base bg-skin-elev text-skin-base/90 outline-none focus:ring-2 ring-brand-accent"
              />

              {/* Profession */}
              <label className="inline-flex items-center gap-2 text-xs sm:text-sm text-skin-muted select-none">
                <span>Profession</span>
                <select
                  value={prof}
                  onChange={(e) => setProf(e.target.value)}
                  className="px-2 py-1 rounded-md border border-skin-base bg-skin-elev text-skin-base/90"
                >
                  {professions.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </label>

              {/* Crafter */}
              <label className="inline-flex items-center gap-2 text-xs sm:text-sm text-skin-muted select-none">
                <span>Crafter</span>
                <select
                  value={crafter}
                  onChange={(e) => setCrafter(e.target.value)}
                  className="px-2 py-1 rounded-md border border-skin-base bg-skin-elev text-skin-base/90"
                >
                  {crafters.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* Right: (reserved for parity) */}
            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-skin-base/80 leading-tight">
              {/* Intentionally left minimal to match bar height and spacing */}
            </div>
          </div>
        </div>
      </div>

      {/* Card with table (parallels Attendance card) */}
      <div className="rounded-3xl border border-skin-base bg-skin-elev p-6 sm:p-8">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="px-4 py-3">Recipe</th>
                <th className="px-4 py-3">Crafter(s)</th>
                <th className="px-4 py-3">Tags</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={`${r.whType ?? "item"}:${r.id}`} className="border-t border-skin-base/60">
                  {/* Recipe cell with Wowhead link */}
                  <td className="px-4 py-3 align-top">
                    <div className="flex flex-col gap-1">
                      <a
                        href={getWowheadUrl(Number(r.id), (r.whType ?? "item") as WowheadType)}
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

                  {/* Crafters as pill chips */}
                  <td className="px-4 py-3 align-top">
                    <div className="flex flex-wrap gap-2">
                      {r.crafters.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => handleChipClick(c)}
                          className="rounded-full border border-skin-base bg-skin-elev px-2.5 py-1 text-xs leading-tight hover:bg-skin-elev/80"
                          title={`Search for ${c}`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </td>

                  {/* Tags as pill chips */}
                  <td className="px-4 py-3 align-top">
                    <div className="flex flex-wrap gap-2">
                      {(r.tags ?? []).length ? (
                        (r.tags ?? []).map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => handleChipClick(t)}
                            className="rounded-full border border-skin-base bg-skin-elev px-2.5 py-1 text-xs leading-tight hover:bg-skin-elev/80"
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
      </div>
    </section>
  );
}
