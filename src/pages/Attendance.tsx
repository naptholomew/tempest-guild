import React, { useDeferredValue, useEffect, useMemo, useRef, useState, useCallback } from "react";

type Row = { name: string; attended: number; possible: number; pct?: number; lastSeen?: string };
type Payload = { nights: string[]; rows: Row[]; perPlayerDates?: Record<string, string[]> };

type SortKey = "pct" | "name" | "attended" | "lastSeen";

const API: string =
  (import.meta as any).env?.VITE_ATTEND_BACKEND ||
  "https://tempest-attendance.onrender.com/api/attendance/refresh";

const CACHE_KEY = "att_cache_v2";

// ---------- utilities ----------
const computePct = (attended: number, possible: number) =>
  possible > 0 ? Math.round((attended / possible) * 100) : 0;

const clamp01 = (v: number) => Math.max(0, Math.min(100, v));

const colorForPct = (pct: number) =>
  pct >= 75 ? "bg-green-500" : pct >= 50 ? "bg-yellow-500" : "bg-red-500";

// ---------- tooltip ----------
function PlayerTooltip({ name, presentDates, allNights }: { name: string; presentDates: string[]; allNights: string[] }) {
  const present = new Set(presentDates);
  const missing = allNights.filter((d) => !present.has(d));
  return (
    <div className="text-xs">
      <div className="font-semibold mb-1">{name}</div>
      <div className="mb-1">
        <span className="font-semibold text-green-400">Present:</span>{" "}
        {presentDates.length ? presentDates.slice().sort().join(", ") : "—"}
      </div>
      <div>
        <span className="font-semibold text-red-400">Missed:</span>{" "}
        {missing.length ? missing.join(", ") : "—"}
      </div>
    </div>
  );
}

// ---------- controls ----------
function Controls({
  query, setQuery, sortKey, setSortKey, loading, updatedAt, msg, onRefresh, onClear,
}: {
  query: string;
  setQuery: (v: string) => void;
  sortKey: SortKey;
  setSortKey: (v: SortKey) => void;
  loading: boolean;
  updatedAt: string | null;
  msg: string | null;
  onRefresh: () => void;
  onClear: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const onSet = (v: string) => {
    setQuery(v);
    inputRef.current?.focus();
  };
  return (
    <div className="sticky top-0 z-10 bg-skin-elev border-b border-skin-base shadow-sm">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: search */}
          <div className="flex items-center gap-3">
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search player…"
              className="w-full sm:w-[22rem] md:w-[19.5rem] px-4 py-2 rounded-lg border border-skin-base bg-skin-elev text-skin-base/90 outline-none focus:ring-2 ring-brand-accent"
              aria-label="Search player"
            />
            <label className="inline-flex items-center gap-2 text-xs sm:text-sm text-skin-muted select-none">
              <span>Sort</span>
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
                className="px-2 py-1 rounded-md border border-skin-base bg-skin-elev text-skin-base/90"
                aria-label="Sort players"
              >
                <option value="pct">Top %</option>
                <option value="name">Name A→Z</option>
                <option value="attended">Attended (desc)</option>
                <option value="lastSeen">Last Seen (newest)</option>
              </select>
            </label>
          </div>

          {/* Right: status + buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <div className="text-skin-base/80 text-[11px] sm:text-xs leading-tight" aria-live="polite">
              {msg && (
                <>
                  <div>{msg}</div>
                  {updatedAt && (
                    <div className="text-skin-muted">
                      Updated{" "}
                      {new Date(updatedAt).toLocaleString("en-US", {
                        month: "numeric",
                        day: "numeric",
                        year: "2-digit",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={onRefresh}
                disabled={loading}
                className={`px-4 py-2 text-sm rounded-lg bg-brand-accent text-white relative overflow-hidden
                  ${loading ? "animate-pulse font-bold text-lg" : ""}`}
              >
                {loading ? "Working…" : "Refresh Attendance"}
              </button>
              <button
                onClick={onClear}
                className="px-3 py-2 text-sm rounded-lg border border-skin-base text-skin-base/80"
                title="Remove cached data"
              >
                Clear Cache
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- row ----------
const RowItem: React.FC<{
  row: Row;
  nights: string[];
  perPlayerDates: Record<string, string[]>;
}> = ({ row, nights, perPlayerDates }) => {
  const pct = clamp01(row.pct ?? computePct(row.attended, row.possible));
  const barColor = colorForPct(pct);
  const [show, setShow] = useState(false);
  const [xy, setXY] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Track when the BAR itself is hovered (for pointer directly over the bar)
  const [barHover, setBarHover] = useState(false);

  // Active when either: bar hovered OR the popup is visible (hover anywhere in row)
  const active = barHover || show;

  return (
    <li
      className="group relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => { setShow(false); setBarHover(false); }}
      onMouseMove={(e) => setXY({ x: e.clientX + 12, y: e.clientY + 12 })}
    >
      <div className="flex items-baseline justify-between mb-1">
        <div
          className={[
            "font-medium transition-all",
            active
              ? "text-sky-300 drop-shadow-[0_0_10px_rgba(56,189,248,0.9)]"
              : "text-skin-base/95",
          ].join(" ")}
        >
          {row.name}
        </div>

        <div
          className={[
            "text-xs font-semibold transition-all",
            pct >= 75
              ? "text-green-400"
              : pct >= 50
              ? "text-yellow-400"
              : "text-red-400",
            active ? "drop-shadow-[0_0_6px_rgba(56,189,248,0.65)]" : "",
          ].join(" ")}
        >
          {pct}%
        </div>
      </div>

      {/* Progress bar track — expands/glows when bar OR row is hovered */}
      <div
        onMouseEnter={() => setBarHover(true)}
        onMouseLeave={() => setBarHover(false)}
        className={[
          "w-full h-3 rounded-full bg-white/10 border border-skin-base overflow-hidden transition-all",
          active
            ? "scale-[1.03] ring-6 ring-sky-400/80 ring-offset-2 ring-offset-skin-elev shadow-2xl shadow-sky-400/60"
            : "",
        ].join(" ")}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        title={`${row.name} ${pct}%`}
      >
        <div
          className={`h-full ${barColor} transition-[width] duration-700 ease-out`}
          style={{ width: `${pct}%` }}
          aria-label={`${row.name} ${pct}%`}
        />
      </div>

      <div className="mt-1 text-[12px] text-skin-muted flex items-center justify-between">
        <span>
          {row.attended} / {row.possible} nights
        </span>
        {row.lastSeen && <span>last seen {row.lastSeen}</span>}
      </div>

      {show && (
        <div
          className="fixed z-50 max-w-[32rem] rounded-xl border border-skin-base bg-skin-elev/95 shadow-lg p-3 pointer-events-none"
          style={{ left: xy.x, top: xy.y }}
          role="tooltip"
        >
          <PlayerTooltip
            name={row.name}
            presentDates={perPlayerDates[row.name] || []}
            allNights={nights}
          />
        </div>
      )}
    </li>
  );
};

export default function Attendance() {
  const [nights, setNights] = useState<string[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [perPlayerDates, setPerPlayerDates] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  // Controls
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [sortKey, setSortKey] = useState<SortKey>(() => (localStorage.getItem("att_sortKey") as SortKey) || "pct");

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
      void refresh(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Manual (or first-load) refresh with abort support
  const refresh = useCallback(async (isAuto = false) => {
    const ctrl = new AbortController();
    setLoading(true);
    setMsg(isAuto ? "Loading…" : null);
    try {
      const res = await fetch(API, { cache: "no-store", signal: ctrl.signal });
      const text = await res.text();
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
      const json = JSON.parse(text) as Payload;

      const normalized = (json.rows || []).map((r) => ({
        ...r,
        pct: r.pct ?? computePct(r.attended, r.possible),
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
      if (e?.name === "AbortError") return;
      console.error(e);
      setMsg(`Error loading attendance data. ${e?.message || ""}`.trim());
    } finally {
      setLoading(false);
    }
    return () => ctrl.abort();
  }, []);

  const clearCache = useCallback(() => {
    localStorage.removeItem(CACHE_KEY);
    setMsg("Cache cleared.");
    setUpdatedAt(null);
    setRows([]);
    setNights([]);
    setPerPlayerDates({});
  }, []);

  const dateRange = useMemo(() => {
    if (!nights.length) return "";
    const s = [...nights].sort();
    return `${s[0]} → ${s[s.length - 1]}`;
  }, [nights]);

  // Filters + sorting
  const filteredSorted = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();

    const filtered = rows.filter((r) => {
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
  }, [rows, deferredQuery, sortKey]);

  return (
    <section className="space-y-8">
      {/* Header */}
      <header className="pb-2 border-b border-skin-base">
        <h1 className="text-3xl font-extrabold tracking-tight text-brand-accent">⚡ Tempest Attendance</h1>
        <p className="text-skin-muted mt-2 text-sm">
          Last 6 weeks {dateRange ? `(${dateRange})` : ""}, pulled from Warcraft Logs.
        </p>
      </header>

      <Controls
        query={query}
        setQuery={setQuery}
        sortKey={sortKey}
        setSortKey={setSortKey}
        loading={loading}
        updatedAt={updatedAt}
        msg={msg}
        onRefresh={() => void refresh(false)}
        onClear={clearCache}
      />

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
          {filteredSorted.map((r) => (
            <RowItem key={r.name} row={r} nights={nights} perPlayerDates={perPlayerDates} />
          ))}

          {!filteredSorted.length && (
            <li className="text-sm text-skin-muted">
              {rows.length ? "No matching players." : "No cached data yet — hit Refresh Attendance."}
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
