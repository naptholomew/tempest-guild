import React, { useEffect, useMemo, useState } from "react";

type Row = { name: string; attended: number; possible: number; pct?: number; lastSeen?: string };
type Payload = { nights: string[]; rows: Row[] };

type SortKey = "pct" | "name" | "attended" | "lastSeen";

const API =
  (import.meta as any).env?.VITE_ATTEND_BACKEND ||
  "https://tempest-attendance.onrender.com/api/attendance/refresh";

export default function Attendance() {
  const [nights, setNights] = useState<string[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // Controls
  const [query, setQuery] = useState("");
  const [only50, setOnly50] = useState<boolean>(() => {
    const saved = localStorage.getItem("att_only50");
    return saved === "1";
  });
  const [sortKey, setSortKey] = useState<SortKey>(() => {
    const saved = localStorage.getItem("att_sortKey") as SortKey | null;
    return saved || "pct";
  });

  useEffect(() => {
    localStorage.setItem("att_only50", only50 ? "1" : "0");
  }, [only50]);

  useEffect(() => {
    localStorage.setItem("att_sortKey", sortKey);
  }, [sortKey]);

  async function load() {
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch(API, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as Payload;

      const normalized = (json.rows || []).map((r) => ({
        ...r,
        pct: r.pct ?? (r.possible ? Math.round((r.attended / r.possible) * 100) : 0),
      }));

      setNights(json.nights || []);
      setRows(normalized);
      setMsg("Attendance refreshed successfully!");
    } catch (e) {
      console.error(e);
      setMsg("Error loading attendance data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const dateRange = useMemo(() => {
    if (!nights.length) return "";
    const s = [...nights].sort();
    return `${s[0]} → ${s[s.length - 1]}`;
  }, [nights]);

  // Filters + Sorting
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
          // Later date first; undefined at the end
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

  return (
    <section className="space-y-8">
      {/* Header (like About) */}
      <header className="pb-2 border-b border-skin-base">
        <h1 className="text-3xl font-extrabold tracking-tight text-brand-accent">⚡Tempest Attendance</h1>
        <p className="text-skin-muted mt-2 text-sm">
          Last 6 weeks {dateRange ? `(${dateRange})` : ""}. 50% = Meets Attendance.
        </p>
      </header>

      {/* Controls */}
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

        <div className="flex items-center gap-3">
          <div className="text-skin-base/80 text-sm">{msg}</div>
          <button
            onClick={load}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-brand-accent text-white disabled:opacity-50"
          >
            {loading ? "Working…" : "Refresh Attendance"}
          </button>
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
            return (
              <li key={r.name} className="group">
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

                <div className="w-full h-3 rounded-full bg-white/10 border border-skin-base overflow-hidden">
                  <div
                    className={`h-full ${colorForPct(pct)} transition-[width] duration-700 ease-out`}
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

          {!filteredSorted.length && !loading && (
            <li className="text-sm text-skin-muted">No matching players.</li>
          )}
        </ul>
      </div>
    </section>
  );
}
