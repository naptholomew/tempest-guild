import { useEffect, useState } from 'react';

type Row = { name: string; attended: number; possible: number; pct: number; lastSeen: string };

export default function Attendance() {
  const [rows, setRows] = useState<Row[]>([]);
  const [nights, setNights] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(import.meta.env.VITE_ATTEND_BACKEND || 'http://localhost:4000/api/attendance/refresh')
      .then(r => r.json())
      .then(d => {
        if (d.error) throw new Error(d.error);
        setRows(d.rows || []);
        setNights(d.nights || []);
        setErr(null);
      })
      .catch(e => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="space-y-8">
      <header className="pb-2 border-b border-skin-base">
        <h1 className="text-3xl font-extrabold tracking-tight text-brand-accent">⚡ Attendance</h1>
        <p className="text-skin-muted mt-2 text-sm">
          Rolling last 6 weeks • Tue/Thu raids • Credit for any boss kill
        </p>
      </header>

      <div className="flex gap-3 items-center">
        <Badge label="75%+ Ideal" tone="good" />
        <Badge label="50%+ Minimum" tone="warn" />
        <Badge label="Below 50%" tone="bad" />
        <span className="text-xs text-skin-muted">Nights counted: {nights.length || 0}</span>
      </div>

      {loading ? (
        <div className="text-skin-muted">Loading attendance…</div>
      ) : err ? (
        <div className="text-red-400">Error: {err}</div>
      ) : (
        <div className="rounded-3xl border border-skin-base bg-skin-elev overflow-x-auto p-2">
          <table className="min-w-full text-[15px]">
            <thead className="text-skin-muted">
              <tr className="text-left">
                <th className="py-3 pr-4 pl-5">Character</th>
                <th className="py-3 pr-4">Attended / Possible</th>
                <th className="py-3 pr-4">% (6 wks)</th>
                <th className="py-3 pr-5">Last Seen</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.name} className="border-t border-skin-base odd:bg-white/5 hover:bg-white/10 transition-colors">
                  <td className="py-3 pr-4 pl-5">{r.name}</td>
                  <td className="py-3 pr-4">{r.attended} / {r.possible}</td>
                  <td className="py-3 pr-4"><PctBadge pct={r.pct} /></td>
                  <td className="py-3 pr-5 text-skin-muted text-xs">{r.lastSeen || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function Badge({ label, tone }: { label: string; tone: 'good'|'warn'|'bad' }) {
  const toneClass =
    tone === 'good' ? 'bg-green-500/20 border-green-500/40' :
    tone === 'warn' ? 'bg-yellow-500/20 border-yellow-500/40' :
    'bg-red-500/20 border-red-500/40';
  return <span className={`text-xs px-2 py-1 rounded-full border ${toneClass}`}>{label}</span>;
}

function PctBadge({ pct }: { pct: number }) {
  let tone: 'good'|'warn'|'bad' = pct >= 75 ? 'good' : pct >= 50 ? 'warn' : 'bad';
  return <Badge label={`${pct}%`} tone={tone} />;
}
