// src/pages/Crafting.tsx
import React, { useEffect, useMemo, useRef, useState, useId } from "react";
import useWowheadTooltips from "../hooks/useWowheadTooltips";
import { getWowheadUrl } from "../lib/wowhead";
import craftingRaw from "../data/crafting.mock.json"; // adjust path if needed

type WowheadType = "item" | "spell";

type Rarity =
  | "poor"      // gray
  | "common"    // white
  | "uncommon"  // green
  | "rare"      // blue
  | "epic"      // purple
  | "legendary" // orange
  | "artifact"  // tan
  | "heirloom"; // light blue

interface Recipe {
  id: number;
  name: string;
  profession: string;
  crafters: string[];
  whType?: WowheadType;
  flavortext?: string;
  tags?: string[];
  rarity?: Rarity; // optional rarity from data
}

export default function Crafting() {
  useWowheadTooltips();

  const recipes: Recipe[] = useMemo(
    () =>
      (craftingRaw as any[]).map((r) => ({
        ...r,
        id: Number(r.id),
        crafters: Array.isArray(r.crafters) ? r.crafters.map(String) : [],
        tags: Array.isArray(r.tags) ? r.tags.map(String) : [],
        rarity: (r as any).rarity as Rarity | undefined,
      })),
    []
  );

  const [query, setQuery] = useState("");
  const [prof, setProf] = useState<string>("All");
  const [crafter, setCrafter] = useState<string>("All");
  const searchRef = useRef<HTMLInputElement>(null);
  const searchId = useId();

  // --- NEW: runtime rarity detected from Wowhead tooltip classes ---
  const [autoRarity, setAutoRarity] = useState<Record<string, Rarity>>({});

  const classToRarity = (cls: string): Rarity | undefined => {
    if (/\bq0\b/.test(cls)) return "poor";
    if (/\bq1\b/.test(cls)) return "common";
    if (/\bq2\b/.test(cls)) return "uncommon";
    if (/\bq3\b/.test(cls)) return "rare";
    if (/\bq4\b/.test(cls)) return "epic";
    if (/\bq5\b/.test(cls)) return "legendary";
    return undefined;
  };

  const hexToRarity = (hexLower: string): Rarity | undefined => {
    const c = hexLower.toLowerCase();
    if (c.includes("#9d9d9d")) return "poor";
    if (c.includes("#ffffff")) return "common";
    if (c.includes("#1eff00")) return "uncommon";
    if (c.includes("#0070dd")) return "rare";
    if (c.includes("#a335ee")) return "epic";
    if (c.includes("#ff8000")) return "legendary";
    if (c.includes("#e6cc80")) return "artifact";
    if (c.includes("#00ccff")) return "heirloom";
    return undefined;
  };

  const rgbToHexish = (rgb: string) => {
    const m = rgb.match(/\d+/g);
    if (!m) return null;
    const [r, g, b] = m.slice(0, 3).map((n) => Number(n));
    const h = (x: number) => x.toString(16).padStart(2, "0");
    return `#${h(r)}${h(g)}${h(b)}`;
  };

  // After filtered list changes (and we refresh Wowhead links),
  // scan anchors to pick up tooltip-applied rarity classes; also observe for changes.
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Small delay gives Wowhead time to mutate links
    const scanTimeout = window.setTimeout(() => {
      const links = document.querySelectorAll<HTMLAnchorElement>(
        'a[data-wh-rename-link="true"][data-item-id]'
      );
      const updates: Record<string, Rarity> = {};
      links.forEach((link) => {
        const id = link.getAttribute("data-item-id");
        const type = (link.getAttribute("data-wh-type") || "item") as WowheadType;
        if (!id) return;
        const key = `${type}:${id}`;

        // Prefer class-based detection (q0..q5)
        let rar = classToRarity(link.className || "");

        // Fallback: inline style color or computed color
        if (!rar) {
          const styleAttr = link.getAttribute("style") || "";
          const styleHexMatch = styleAttr.match(/#([0-9a-fA-F]{3,6})/);
          if (styleHexMatch) rar = hexToRarity(`#${styleHexMatch[1]}`);
        }
        if (!rar) {
          const comp = window.getComputedStyle(link).color; // rgb(...)
          const hex = rgbToHexish(comp);
          if (hex) rar = hexToRarity(hex);
        }

        if (rar && autoRarity[key] !== rar) updates[key] = rar;
      });
      if (Object.keys(updates).length) {
        setAutoRarity((prev) => ({ ...prev, ...updates }));
      }
    }, 120);

    // Watch for class/style changes on those anchors (Wowhead may update asynchronously)
    const observers: MutationObserver[] = [];
    const setupObservers = () => {
      const links = document.querySelectorAll<HTMLAnchorElement>(
        'a[data-wh-rename-link="true"][data-item-id]'
      );
      links.forEach((link) => {
        const id = link.getAttribute("data-item-id");
        const type = (link.getAttribute("data-wh-type") || "item") as WowheadType;
        if (!id) return;
        const key = `${type}:${id}`;

        const obs = new MutationObserver((muts) => {
          for (const m of muts) {
            if (m.type === "attributes" && (m.attributeName === "class" || m.attributeName === "style")) {
              const el = m.target as HTMLElement;
              let rar = classToRarity(el.className || "");
              if (!rar) {
                const styleAttr = el.getAttribute("style") || "";
                const styleHexMatch = styleAttr.match(/#([0-9a-fA-F]{3,6})/);
                if (styleHexMatch) rar = hexToRarity(`#${styleHexMatch[1]}`);
              }
              if (!rar) {
                const comp = window.getComputedStyle(el).color;
                const hex = rgbToHexish(comp);
                if (hex) rar = hexToRarity(hex);
              }
              if (rar) {
                setAutoRarity((prev) => (prev[key] === rar ? prev : { ...prev, [key]: rar }));
              }
            }
          }
        });
        obs.observe(link, { attributes: true, attributeFilter: ["class", "style"] });
        observers.push(obs);
      });
    };
    setupObservers();

    return () => {
      window.clearTimeout(scanTimeout);
      observers.forEach((o) => o.disconnect());
    };
  }, [filtered, autoRarity]); // re-check when list changes; state change is guarded

  // ---------------------------------------------------------------

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

  // Tailwind classes for WoW rarity colors
  const rarityToTextClass = (rarity?: Rarity) => {
    switch (rarity) {
      case "poor": return "text-[#9d9d9d]";
      case "common": return "text-[#ffffff]";
      case "uncommon": return "text-[#1eff00]";
      case "rare": return "text-[#0070dd]";
      case "epic": return "text-[#a335ee]";
      case "legendary": return "text-[#ff8000]";
      case "artifact": return "text-[#e6cc80]";
      case "heirloom": return "text-[#00ccff]";
      default: return "text-brand-accent";
    }
  };
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
                const key = `${whType}:${r.id}`;
                const detected = autoRarity[key];
                const displayRarity = r.rarity ?? detected;

                return (
                  <tr key={key} className="border-t border-skin-base/60">
                    {/* Recipe */}
                    <td className="w-1/3 px-4 py-4 align-top">
                      <div className="flex flex-col gap-1">
                        <a
                          href={getWowheadUrl(Number(r.id), whType)}
                          target="_blank"
                          rel="noopener noreferrer"
                          referrerPolicy="no-referrer"
                          className={`text-lg font-semibold hover:underline ${rarityToTextClass(displayRarity)}`}
                          data-wh-rename-link="true"
                          data-item-id={r.id}
                          data-wh-type={whType}
                        >
                          {r.name}
                        </a>
                        {r.flavortext && (
                          <div className="text-skin-muted text-sm leading-snug">{r.flavortext}</div>
                        )}
                      </div>
                    </td>

                    {/* Crafters — classic rounded pills */}
                    <td className="w-1/3 pl-6 pr-4 py-4 align-top">
                      <div className="flex flex-wrap gap-2">
                        {r.crafters.map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => handleChipClick(c)}
                            className="inline-flex items-center rounded-full border px-2.5 py-1 text-sm leading-tight transition
                                       border-skin-base bg-skin-elev text-skin-base/90
                                       hover:bg-skin-elev/80 hover:border-skin-base/80
                                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-skin-base"
                            title={`Search for ${c}`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </td>

                    {/* Tags — simple, comma-separated clickable text */}
                    <td className="w-1/3 pl-6 pr-4 py-4 align-top">
                      <div className="flex flex-wrap gap-x-1 gap-y-1">
                        {tags.length ? (
                          tags.map((t, i) => (
                            <span key={`${t}-${i}`} className="inline">
                              <button
                                type="button"
                                onClick={() => handleChipClick(t)}
                                className="px-0 py-0 bg-transparent border-0 text-skin-base/90 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-skin-base/60"
                                title={`Search for ${t}`}
                              >
                                {t}
                              </button>
                              {i < tags.length - 1 && <span>, </span>}
                            </span>
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
