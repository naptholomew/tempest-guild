export default function About() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-brand-accent">About Tempest</h1>
        <p className="text-skin-muted mt-1">World of Warcraft Classic guild • storm-forged since 2004*</p>
      </header>

      <div className="rounded-2xl border border-skin-base p-4 bg-skin-elev">
        <h2 className="font-semibold mb-3">Milestones</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-skin-muted">
              <tr className="text-left">
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Event</th>
                <th className="py-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-skin-base">
                <td className="py-2 pr-4">2025-01-02</td>
                <td className="py-2 pr-4">Temple of Ahn'Qiraj De-Bugged</td>
                <td className="py-2">Week one! 5 Pulls on C'thun.</td>
			  </tr>	
              <tr className="border-t border-skin-base">
                <td className="py-2 pr-4">2025-05-01</td>
                <td className="py-2 pr-4">Zul'Gurub Liberated</td>
                <td className="py-2">Edge of Madness was busted, wtf.</td>
			  </tr>	
              <tr className="border-t border-skin-base">
                <td className="py-2 pr-4">2025-03-24</td>
                <td className="py-2 pr-4">Blackwing Lair Cleaned Out</td>
                <td className="py-2">Chromaggus was way harder than Nef.</td>
			  </tr>	
              <tr className="border-t border-skin-base">
                <td className="py-2 pr-4">2025-01-02</td>
                <td className="py-2 pr-4">Molten Core Extinguished</td>
                <td className="py-2">Got Rag on night one!</td>
			  </tr>				
              <tr className="border-t border-skin-base">
                <td className="py-2 pr-4">2025-01-02</td>
                <td className="py-2 pr-4">The First MC Rep Run</td>
                <td className="py-2">The first venture into the core.</td>
              </tr>
              <tr className="border-t border-skin-base">
                <td className="py-2 pr-4">2025-01-02</td>
                <td className="py-2 pr-4">Guild's First UBRS Night</td>
                <td className="py-2">God, we ran so many UBRS.</td>
              </tr>
              <tr className="border-t border-skin-base">
                <td className="py-2 pr-4">2024-11-21</td>
                <td className="py-2 pr-4">Guild founded (again)</td>
                <td className="py-2">A spark in the storm cloud.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
