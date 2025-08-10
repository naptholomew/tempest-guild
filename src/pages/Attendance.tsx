import React, { useEffect, useMemo, useState } from "react";

type Row = {
  name: string;
  attended: number;
  possible: number;
  pct: number;
  lastSeen?: string;
};

type Payload = {
  nights: string[];
  rows: Row[];
};

const API =
  import.meta.env.VITE_ATTEND_BACKEND ||
  "https://tempest-attendance.onrender.com/api/attendance/refresh";

export default function Attendance() {
  const [data, setData] = useState<Payload>({ nights: [], rows: [] });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch(API, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as Payload;
      setData(json);
    } catch (e) {
      console.error(e);
      setMsg("Error loading attendance data.");
    } finally {
      setLoading(false);
    }
  };

  const refreshNow = async () => {
    setLoading(true);
    setMsg("Refreshing attendance…");
    try {
      const res = await fetch(API, { method: "GET", cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as Payload;
      setData(json);
      setMsg("Attendance refreshed!");
    } catch (e) {
      console.error(e);
      setMsg("Error refreshing attendance.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const dateRange = useMemo(() => {
    if (!data.nights.length) return null;
    const sorted = [...data.nights].sort();
    return `${sorted[0]} → ${sorted[sorted.length - 1]}`;
    // window is the last 6 weeks on the backend
  }, [data.nights]);

  return (
    <section className="space-y-6 p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight text-brand-accent">
          Attendance
        </h1>
        <button
          onClick={refreshNow}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-brand-accent text-white disabled:opacity-50"
        >
          {loading ? "Working…" : "Refresh Attendance"}
        </button>
      </div>

      <p className="text-skin-muted text-sm">
        Tracking last 6 weeks {dateRange ? `(${dateRange})` : ""}. Thresholds:{" "}
        <span className="text-green-400 font-semibold">75% = Ideal</span> ·{" "}
        <span className="text-yellow-400 font-semibold">50% = Meets</span>.
      </p>

      {msg && <div className="text-skin-base">{msg}</div>}

      <div className="overflow-x-auto rounded-2xl border border-skin-base">
        <table className="min-w-full text-[15px]">
          <thead className="text-skin-muted">
            <tr className="text-left">
              <th className="py-3 pr-4 pl-5">Raider</th>
              <th className="py-3 pr-4">Attended</th>
              <th className="py-3 pr-4">Possible</th>
              <th className="py-3 pr-5">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((r) => {
              const color =
                r.pct >= 75
                  ? "text-green-400"
                  : r.pct >= 50
                  ? "text-yellow-400"
                  : "text-red-400";
              return (
                <tr
                  key={r.name}
                  className="border-t border-skin-base odd:bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <td className="py-3 pr-4 pl-5 text-sm">{r.name}</td>
                  <td className="py-3 pr-4 text-sm">{r.attended}</td>
                  <td className="py-3 pr-4 text-sm">{r.possible}</td>
                  <td className={`py-3 pr-5 text-sm font-semibold ${color}`}>
                    {r.pct}%
                  </td>
                </tr>
              );
            })}
            {!loading && data.rows.length === 0 && (
              <tr className="border-t border-skin-base">
                <td className="py-4 pr-4 pl-5 text-sm" colSpan={4}>
                  No attendance to show yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
