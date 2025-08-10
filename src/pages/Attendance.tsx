import React, { useEffect, useState } from "react";

type Row = { name: string; attended: number; possible: number; pct?: number; lastSeen?: string };
type Payload = { nights: string[]; rows: Row[] };

const API =
  import.meta.env.VITE_ATTEND_BACKEND ||
  "https://tempest-attendance.onrender.com/api/attendance/refresh";

export default function Attendance() {
  const [nights, setNights] = useState<string[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch(API, { cache: "no-store" });
      const json = (await res.json()) as Payload;
      const normalized = (json.rows || []).map(r => ({
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

  useEffect(() => { load(); }, []);

  return (
    <section className="space-y-6 p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight text-brand-accent">Attendance</h1>
        <button
          onClick={load}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-brand-accent text-white disabled:opacity-50"
        >
          {loading ? "Working…" : "Refresh Attendance"}
        </button>
      </div>

      {msg && <div className="text-skin-base">{msg}</div>}
      {!!nights.length && (
        <p className="text-skin-muted text-sm">
          Tracking last 6 weeks ({[...nights].sort()[0]} → {[...nights].sort().slice(-1)[0]})
        </p>
      )}

      <div className="overflow-x-auto rounded-2xl border border-skin-base">
        <table className="min-w-full text-[15px]">
          <thead className="text-skin-muted">
            <tr className="text-left">
              <th className="py-3 pr-4 pl-5">Player</th>
              <th className="py-3 pr-4">Attended</th>
              <th className="py-3 pr-4">Possible</th>
              <th className="py-3 pr-5">Attendance %</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => {
              const color =
                (r.pct ?? 0) >= 75 ? "text-green-400"
                : (r.pct ?? 0) >= 50 ? "text-yellow-400"
                : "text-red-400";
              return (
                <tr key={r.name} className="border-t border-skin-base odd:bg-white/5 hover:bg-white/10 transition-colors">
                  <td className="py-3 pr-4 pl-5 text-sm">{r.name}</td>
                  <td className="py-3 pr-4 text-sm">{r.attended}</td>
                  <td className="py-3 pr-4 text-sm">{r.possible}</td>
                  <td className={`py-3 pr-5 text-sm font-semibold ${color}`}>{r.pct}%</td>
                </tr>
              );
            })}
            {!loading && rows.length === 0 && (
              <tr className="border-t border-skin-base">
                <td className="py-4 pr-4 pl-5 text-sm" colSpan={4}>
                  No attendance found. Try “Refresh Attendance” above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
