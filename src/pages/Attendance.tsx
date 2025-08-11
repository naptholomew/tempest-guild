import React, { useEffect, useMemo, useState } from "react";

type Row = { name: string; attended: number; possible: number; pct?: number; lastSeen?: string };
type Payload = { nights: string[]; rows: Row[]; perPlayerDates?: Record<string, string[]> };

type SortKey = "pct" | "name" | "attended" | "lastSeen";

const API =
  (import.meta as any).env?.VITE_ATTEND_BACKEND ||
  "https://tempest-attendance.onrender.com/api/attendance/refresh";

const CACHE_KEY = "att_cache_v1";

export default function Attendance() {
  const [nights, setNights] = useState<string[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [perPlayerDates, setPerPlayerDates] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  // Controls
  const [query, setQuery] = useState("");
  const [only50, setOnly50] = useState<boolean>(() => localStorage.getItem("att_only50") === "1");
  const [sortKey, setSortKey] = useState<SortKey>(
    () => (localStorage.getItem("att_sortKey") as SortKey) || "pct"
  );

  useEffect(() => localStorage.setItem("att_only50", only50 ? "1" : "0"), [only50]);
  useEffect(() => localStorage.setItem("att_sortKey", sortKey), [sortKey]);

  // Load from cache on mount (no network); if no cache, do one automatic refresh
  useEffect(() => {
    let hadCache = false;
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const cache = JSON.parse(raw) as {
          nights: string[];
          rows: Row[];
          perPlayerDates: Record<string, string[]>;
          updatedAt: string;
        };
        if (cache && Array.isArray(cache.nights) && Array.isArray(cache.rows)) {
          setNights(cache.nights);
          setRows(cache.rows);
          setPerPlayerDates(cache.perPlayerDates || {});
          setUpdatedAt(cache.updatedAt || null);
          setMsg("Loaded from cache");
          hadCache = true;
        }
      }
    } catch {
      // ignore cache errors
    }
    if (!hadCache) {
      refresh(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Manual (or first-load) refresh
  async function refresh(isAuto = false) {
    setLoading(true);
    setMsg(isAuto ? "Loading…" : null);
    try {
      const res = await fetch(API, { cache: "no-store" });
      const text = await res.text();
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
      const json = JSON.parse(text) as Payload;

      const normalized = (json.rows || []).map((r) => ({
        ...r,
        pct: r.pct ?? (r.possible ? Math.round((r.attended / r.possible) * 100) : 0),
      }));

      const now = new Date().toISOString();

      setNights(json.nights || []);
      setRows(normalized);
      setPerPlayerDates(json.perPlayerDates || {});
      setUpdatedAt(now);
      setMsg("Attendance refreshed successfully!");

      // write cache
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          nights: json.nights || [],
          rows: normalized,
          perPlayerDates: json.perPlayerDates || {},
          updatedAt: now,
        })
      );
    } catch (e: any) {
      console.error(e);
      setMsg(`Error loading attendance data. ${e?.message || ""}`.trim());
    } finally {
      setLoading(false);
    }
  }

  function clearCache() {
    localStorage.removeItem(CACHE_KEY);
    setMsg("Cache cleared.");
    setUpdatedAt(null);
    setRows([]);
    setNights([]);
    setPerPlayerDates({});
  }

  const dateRange = useMemo(() => {
    if (!nights.length) return "";
    const s = [...nights].sort();
    return `${s[0]} → ${s[s.length - 1]}`;
  }, [nights]);

  // Filters + sorting
  const filteredSorted = useMemo(() => {
    const q = query.trim().toLowerCase();

    const filtered = rows.filter((r) => {
      if (only50 && (r.pct ?? 0) < 50) return false;
      if (q && !r.name.toLowerCase().includes(q)) return false;
      return true;
    });

    const cmp = (a: Row, b: Row) => {
      switch (sortKey) {
        case "pct":
          return (b.pct ?? 0) - (a.pct ?? 0) || b.attended - a.attended || a.name.localeCompare(b.name);
        case "name":
          return a.name.localeCompare(b.name);
        case "attended":
          return b.attended - a.attended || (b.pct ?? 0) - (a.pct ?? 0) || a.name.localeCompare(b.name);
        case "lastSeen":
          if (!a.lastSeen && !b.lastSeen) return 0;
          if (!a.lastSeen) return 1;
          if (!b.lastSeen) return -1;
          return b.lastSeen.localeCompare(a.lastSeen) || (b.pct ?? 0) - (a.pct ?? 0);
        default:
          return 0;
      }
    };

    return filtered.sort(cmp);
  }, [rows, query, only50, sortKey]);

  const colorForPct = (pct: number) =>
    pct >= 75 ? "bg-green-500" : pct >= 50 ? "bg-yellow-500" : "bg-red-500";

  // Tooltip state
  const [tip, setTip] = useState<{ show: boolean; x: number; y: number; html: string }>({
    show: false,
    x: 0,
    y: 0,
    html: "",
  });

  // Build tooltip content for a player
  const makeTipHTML = (name: string) => {
    const present = new Set(perPlayerDates[name] || []);
    const missing = nights.filter((d) => !present.has(d));
    const presentList = [...present].sort().join(", ") || "—";
    const missingList = missing.join(", ") || "—";
    return `
      <div class="text-xs">
        <div class="font-semibold mb-1">${name}</div>
        <div class="mb-1"><span class="font-semibold text-green-400">Present:</span> ${presentList}</div>
        <div><span class="font-semibold text-red-400">Missed:</span> ${missingList}</div>
      </div>`;
  };

  return (
    <section className="space-y-8">
      {/* Header */}
      <header className="pb-2 border-b border-skin-base">
        <h1 className="text-3xl font-extrabold tracking-tight text-brand-accent">⚡Tempest Attendance</h1>
        <p className="text-skin-muted mt-2 text-sm">
          Last 6 weeks {dateRange ? `(${dateRange})` : ""}, pulled from Warcraft Logs.
        </p>
      </header>

      {/* Controls (sticky) */}
<div className="sticky top-0 z-10 bg-skin-elev border-b border-skin-base shadow-sm py-3">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2 items-center">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search player…"
              className="px-3 py-2 rounded-lg border border-skin-base bg-skin-elev text-skin-base/90 w-64"
            />
            <label className="inline-flex items-center gap-2 text-sm text-skin-muted select-none">
              <input
                type="checkbox"
                checked={only50}
                onChange={(e) => setOnly50(e.target.checked)}
                className="h-4 w-4"
              />
              Show only 50%+
            </label>

            <label className="inline-flex items-center gap-2 text-sm text-skin-muted select-none">
              <span>Sort</span>
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
                className="px-2 py-1 rounded-md border border-skin-base bg-skin-elev text-skin-base/90"
              >
                <option value="pct">Top %</option>
                <option value="name">Name A→Z</option>
                <option value="attended">Attended (desc)</option>
                <option value="lastSeen">Last Seen (newest)</option>
              </select>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            {/* Message + Updated line */}
            <div className="text-skin-base/80 text-xs sm:text-sm">
              {msg && (
                <>
                  <div>{msg}</div>
                  {updatedAt && (
                    <div className="text-skin-muted">
                      Updated {new Date(updatedAt).toLocaleString()}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => refresh(false)}
                disabled={loading}
                className={`px-4 py-2 rounded-lg bg-brand-accent text-white relative overflow-hidden
                  ${loading ? "animate-pulse font-bold text-lg" : ""}`}
              >
                {loading ? "Working…" : "Refresh Attendance"}
              </button>
              <button
                onClick={clearCache}
                className="px-3 py-2 rounded-lg border border-skin-base text-skin-base/80"
                title="Remove cached data"
              >
                Clear Cache
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Card with bars */}
      <div className="rounded-3xl border border-skin-base bg-skin-elev p-6 sm:p-8">
        {/* Legend */}
        <div className="flex items-center gap-4 text-xs text-skin-muted mb-5">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-5 rounded-full bg-green-500" /> 75%+
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-5 rounded-full bg-yellow-500" /> 50–74%
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-5 rounded-full bg-red-500" /> &lt; 50%
          </span>
        </div>

        {/* Bars */}
        <ul className="space-y-3">
          {filteredSorted.map((r) => {
            const pct = Math.max(0, Math.min(100, r.pct ?? 0));
            const barColor = colorForPct(pct);

            // Handlers on the entire row
            const onEnter = (e: React.MouseEvent) =>
              setTip({ show: true, x: e.clientX + 12, y: e.clientY + 12, html: makeTipHTML(r.name) });
            const onMove = (e: React.MouseEvent) =>
              setTip((t) => ({ ...t, x: e.clientX + 12, y: e.clientY + 12 }));
            const onLeave = () => setTip({ show: false, x: 0, y: 0, html: "" });

            return (
              <li
                key={r.name}
                className="group relative"
                onMouseEnter={onEnter}
                onMouseMove={onMove}
                onMouseLeave={onLeave}
              >
                <div className="flex items-baseline justify-between mb-1">
                  <div className="text-skin-base/95 font-medium">{r.name}</div>
                  <div
                    className={`text-xs font-semibold ${
                      pct >= 75 ? "text-green-400" : pct >= 50 ? "text-yellow-400" : "text-red-400"
                    }`}
                  >
                    {pct}%
                  </div>
                </div>

                <div className="w-full h-3 rounded-full bg-white/10 border border-skin-base overflow-hidden transition transform group-hover:scale-[1.01] group-hover:ring-2 group-hover:ring-white/20">
                  <div
                    className={`h-full ${barColor} transition-[width] duration-700 ease-out`}
                    style={{ width: `${pct}%` }}
                    aria-label={`${r.name} ${pct}%`}
                  />
                </div>

                <div className="mt-1 text-[12px] text-skin-muted flex items-center justify-between">
                  <span>
                    {r.attended} / {r.possible} nights
                  </span>
                  {r.lastSeen && <span>last seen {r.lastSeen}</span>}
                </div>
              </li>
            );
          })}

          {!filteredSorted.length && (
            <li className="text-sm text-skin-muted">
              {rows.length ? "No matching players." : "No cached data yet — hit Refresh Attendance."}
            </li>
          )}
        </ul>
      </div>

      {/* Tooltip */}
      {tip.show && (
        <div
          className="fixed z-50 max-w-[32rem] rounded-xl border border-skin-base bg-skin-elev/95 shadow-lg p-3 pointer-events-none"
          style={{ left: tip.x, top: tip.y }}
          dangerouslySetInnerHTML={{ __html: tip.html }}
        />
      )}
    </section>
  );
}
