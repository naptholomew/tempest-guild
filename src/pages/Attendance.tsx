import React, { useEffect, useState } from "react";

interface AttendanceRow {
  name: string;
  percentage: number;
}

export default function Attendance() {
  const [rows, setRows] = useState<AttendanceRow[]>([]);
  const [nights, setNights] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Fetch current attendance
  const fetchAttendance = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("https://tempest-attendance.onrender.com/api/attendance");
      const data = await res.json();
      setRows(data.rows || []);
      setNights(data.nights || []);
    } catch (err) {
      console.error(err);
      setMessage("Error loading attendance data.");
    } finally {
      setLoading(false);
    }
  };

  // Refresh attendance from WCL and reload table
  const refreshAttendance = async () => {
    setLoading(true);
    setMessage("Refreshing attendance...");
    try {
      const res = await fetch("https://tempest-attendance.onrender.com/api/attendance/refresh");
      if (!res.ok) throw new Error("Refresh failed");
      await fetchAttendance();
      setMessage("Attendance refreshed successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Error refreshing attendance.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div className="p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-skin-base">Attendance</h1>
        <button
          onClick={refreshAttendance}
          disabled={loading}
          className="px-4 py-2 bg-brand-accent text-white rounded-lg hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Refresh Attendance"}
        </button>
      </div>

      {message && <p className="text-skin-base">{message}</p>}

      {nights.length > 0 && (
        <p className="text-skin-muted">
          Tracking attendance over {nights.length} raid nights:{" "}
          {nights.join(", ")}
        </p>
      )}

      <div className="overflow-x-auto rounded-2xl border border-skin-base">
        <table className="min-w-full text-[15px]">
          <thead className="text-skin-muted">
            <tr className="text-left">
              <th className="py-3 pr-4 pl-5">Player</th>
              <th className="py-3 pr-5">Attendance %</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.name}
                className="border-t border-skin-base odd:bg-white/5 hover:bg-white/10 transition-colors"
              >
                <td className="py-3 pr-4 pl-5 align-middle text-sm">
                  {row.name}
                </td>
                <td
                  className={`py-3 pr-5 align-middle text-sm font-semibold ${
                    row.percentage >= 75
                      ? "text-green-400"
                      : row.percentage >= 50
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {row.percentage}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
