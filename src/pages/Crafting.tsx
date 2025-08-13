// src/pages/Crafting.tsx
import React, { useEffect, useMemo, useRef, useState, useId } from "react";
import useWowheadTooltips from "../hooks/useWowheadTooltips";
import { getWowheadUrl } from "../lib/wowhead";
import craftingRaw from "../data/crafting.mock.json"; // adjust path if needed

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

  const recipes: Recipe[] = useMemo(
    () => (craftingRaw as any[]).map((r) => ({
      ...r,
      id: Number(r.id),
      crafters: Array.isArray(r.crafters) ? r.crafters.map(String) : [],
      tags: Array.isArray(r.tags) ? r.tags.map(String) : [],
    })),
    []
  );

  const [query, setQuery] = useState("");
  const [prof, setProf] = useState<string>("All");
  const [crafter, setCrafter] = useState<string>("All");
  const searchRef = useRef<HTMLInputElement>(null);
  const searchId = useId();

  const professions = useMemo(
    () => ["All", ...Array.from(new Set(recipes.map((r) => r.profession)))],
    [recipes]
  );
  const crafters = useMemo(
    () => ["All", ...Array.from(new Set(recipes.flatMap((r) => r.crafters)))],
    [recipes]
  );

  const filtered = useMemo(() => {
    const needle = query.toLowerCase().trim();
    return recipes.filter((r) => {
      const inName = !needle || r.name.toLowerCase().includes(needle);
      const inTags = !needle || (r.tags ?? []).some((t) => t.toLowerCase().includes(needle));
      const inCrafters = !needle || r.crafters.some((c) => c.toLowerCase().includes(needle));
      const matchesProf = prof === "All" || r.profession === prof;
      const matchesCrafter = crafter === "All" || r.crafters.includes(crafter);
      return (inName || inTags || inCrafters) && matchesProf && matchesCrafter;
    });
  }, [recipes, query, prof, crafter]);

  useEffect(() => {
    // @ts-ignore
    if (window.$WowheadPower) window.$WowheadPower.refreshLinks?.();
  }, [filtered]);

  const handleChipClick = (term: string) => {
    setQuery(term);
    setTimeout(() => searchRef.current?.focus(), 0);
  };

  const total = recipes.length;
  const count = filtered.length;

  return (
    <section className="space-y-8">
      <header className="pb-2 border-b border-skin-base">
        <h1 className="text-3xl font-extrabold tracking-tight text-brand-accent">⚡Tempest Crafting</h1>
        <p className="text-skin-muted mt-2 text-sm">Browse recipes by profession, crafter, or tag. Click any chip to filter.</p>
      </header>

      {/* Sticky controls bar */}
      <div className="sticky top-0 z-10 bg-skin-elev border-b border-skin-base shadow-sm">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 w-full">
              {/* Search */}
              <div className="relative w-full sm:w-[22rem] md:w-[19.5rem]">
                <label htmlFor={searchId} className="sr-only">Search crafting</label>
                <input
                  id={searchId}
                  ref={searchRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search recipes, tags, or crafters…"
                  className="w-full px-4 py-2 pr-10 rounded-lg border border-skin-base bg-skin-elev text-skin-base/90 outline-none focus:ring-2 ring-brand-accent"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      searchRef.current?.focus();
                    }}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-skin-muted hover:text-brand-accent"
                    title="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Profession */}
              <label className="inline-flex items-center gap-2 text-xs sm:text-sm text-skin-muted select-none">
                <span>Profession</span>
                <select
                  value={prof}
                  onChange={(e) => setProf(e.target.value)}
                  className="px-2 py-1 rounded-md border border-skin-base bg-skin-elev text-skin-base/90"
                >
                  {professions.map((p) => (
                    <option key={p} value={p}>{p}</option>
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
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </label>

              {/* Status moved left and prevented wrapping */}
              <div className="whitespace-nowrap text-[11px] sm:text-xs text-skin-base/80 leading-tight sm:ml-auto shrink-0">
                Showing <strong>{count}</strong> of <strong>{total}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card + table in the same max width as Attendance */}
      <div className="mx-auto max-w-[1200px] rounded-3xl border border-skin-base bg-skin-elev p-6 sm:p-8">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed text-base">
            <thead>
              <tr className="text-left">
                <th className="w-1/3 px-4 py-3">Recipe</th>
                <th className="w-1/3 px-4 py-3">Crafter(s)</th>
                <th className="w-1/3 px-4 py-3">Tags</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => {
                const whType: WowheadType = r.whType ?? "item";
                const tags = r.tags ?? [];
                return (
                  <tr key={`${whType}:${r.id}`} className="border-t border-skin-base/60">
                    {/* Recipe */}
                    <td className="w-1/3 px-4 py-4 align-top">
                      <div className="flex flex-col gap-1">
                        <a
                          href={getWowheadUrl(Number(r.id), whType)}
                          target="_blank"
                          rel="noopener noreferrer"
                          referrerPolicy="no-referrer"
                          className="text-brand-accent text-lg font-semibold hover:underline"
                          data-wh-rename-link="true"
                        >
                          {r.name}
                        </a>
                        {r.flavortext && (
                          <div className="text-skin-muted text-sm leading-snug">{r.flavortext}</div>
                        )}
                      </div>
                    </td>

                    {/* Crafters — nudged right */}
                    <td className="w-1/3 pl-6 pr-4 py-4 align-top">
                      <div className="flex flex-wrap gap-2">
                        {r.crafters.map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => handleChipClick(c)}
                            className="rounded-full border px-3 py-1.5 text-sm leading-tight transition
                                       border-brand-accent/70 text-brand-accent bg-brand-accent/10
                                       hover:bg-brand-accent/20 hover:border-brand-accent
                                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                            title={`Search for ${c}`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </td>

                    {/* Tags — nudged right and visually distinct */}
                    <td className="w-1/3 pl-6 pr-4 py-4 align-top">
                      <div className="flex flex-wrap gap-2">
                        {tags.length ? (
                          tags.map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => handleChipClick(t)}
                              className="rounded-full border px-3 py-1.5 text-sm leading-tight transition
                                         border-skin-base/70 bg-skin-base/60 text-skin-base/90
                                         hover:bg-skin-base/70 hover:border-skin-base
                                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-skin-base"
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
                );
              })}
              {!filtered.length && (
                <tr>
                  <td className="px-4 py-6 text-skin-muted" colSpan={3}>
                    <span aria-live="polite">No results.</span>
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
