export default function RaidPolicy() {
  return (
    <section className="space-y-8">
      <header className="pb-2 border-b border-skin-base">
        <h1 className="text-3xl font-extrabold tracking-tight text-brand-accent">Raid Policy</h1>
        <p className="text-skin-muted mt-2 text-sm">Expectations, loot rules, and attendance guidance.</p>
      </header>

      <div className="rounded-3xl border border-skin-base bg-skin-elev p-3 sm:p-4 space-y-4">
        <div className="site-card !p-4 rounded-2xl">
          <h2 className="font-semibold mb-2">Core Expectations</h2>
          <ul className="list-disc list-inside text-sm text-skin-muted space-y-1">
            <li>Bring required consumables.</li>
            <li>Be on time and ready to zone in.</li>
            <li>Be excellent to each other.</li>
          </ul>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-skin-base">
          <table className="min-w-full text-[15px]">
            <thead className="text-skin-muted">
              <tr className="text-left">
                <th className="py-3 pr-4 pl-5">Category</th>
                <th className="py-3 pr-5">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-skin-base odd:bg-white/5 hover:bg-white/10 transition-colors">
                <td className="py-3 pr-4 pl-5 align-middle text-sm">Tier</td>
                <td className="py-3 pr-5 align-middle text-xs text-skin-muted">Main-spec priority, off-spec when opened.</td>
              </tr>
              <tr className="border-t border-skin-base odd:bg-white/5 hover:bg-white/10 transition-colors">
                <td className="py-3 pr-4 pl-5 align-middle text-sm">Weapons</td>
                <td className="py-3 pr-5 align-middle text-xs text-skin-muted">Performance + attendance considered.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
