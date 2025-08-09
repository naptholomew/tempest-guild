export default function RaidPolicy() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-brand-accent">Raid Policy</h1>
        <p className="text-skin-muted mt-1">Expectations, loot rules, and attendance guidance.</p>
      </header>

      <div className="rounded-2xl border border-skin-base p-4 bg-skin-elev space-y-4">
        <h2 className="font-semibold">Core Expectations</h2>
        <ul className="list-disc list-inside text-sm text-skin-muted space-y-1">
          <li>Bring required consumables.</li>
          <li>Be on time and ready to zone in.</li>
          <li>Be excellent to each other.</li>
        </ul>

        <h2 className="font-semibold pt-2">Loot Rules (summary)</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-skin-muted">
              <tr className="text-left">
                <th className="py-2 pr-4">Category</th>
                <th className="py-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-skin-base">
                <td className="py-2 pr-4">Tier</td>
                <td className="py-2">Main-spec priority, off-spec when opened.</td>
              </tr>
              <tr className="border-t border-skin-base">
                <td className="py-2 pr-4">Weapons</td>
                <td className="py-2">Performance + attendance considered.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
