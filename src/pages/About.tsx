export default function About() {
  return (
    <section className="space-y-8">
      <header className="pb-2 border-b border-skin-base">
        <h1 className="text-3xl font-extrabold tracking-tight text-brand-accent">⚡Welcome to Tempest</h1>
        <p className="text-skin-muted mt-2 text-sm">A World of Warcraft Classic Guild on Dreamscythe.</p>
      </header>

      <div className="rounded-3xl border border-skin-base bg-skin-elev overflow-x-auto p-2">
        <table className="min-w-full text-[15px]">
          <thead className="text-skin-muted">
            <tr className="text-left">
              <th className="py-3 pr-4 pl-5">Date</th>
              <th className="py-3 pr-4">What happened?!</th>
              <th className="py-3 pr-5">Extra</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-skin-base">
              <td className="py-3 pr-4 pl-5 align-middle text-sm">2025-01-02</td>
              <td className="py-3 pr-4 align-middle">Temple of Ahn'Qiraj De-Bugged</td>
              <td className="py-3 pr-5 align-middle text-xs text-skin-muted">Week one! 5 Pulls on C'thun.</td>
            </tr>
            <tr className="border-t border-skin-base">
              <td className="py-3 pr-4 pl-5 align-middle text-sm">2025-05-01</td>
              <td className="py-3 pr-4 align-middle">Zul'Gurub Liberated</td>
              <td className="py-3 pr-5 align-middle text-xs text-skin-muted">Edge of Madness was busted, wtf.</td>
            </tr>
            <tr className="border-t border-skin-base">
              <td className="py-3 pr-4 pl-5 align-middle text-sm">2025-03-24</td>
              <td className="py-3 pr-4 align-middle">Blackwing Lair Cleaned Out</td>
              <td className="py-3 pr-5 align-middle text-xs text-skin-muted">Chromaggus was way harder than Nef.</td>
            </tr>
            <tr className="border-t border-skin-base">
              <td className="py-3 pr-4 pl-5 align-middle text-sm">2025-01-02</td>
              <td className="py-3 pr-4 align-middle">Molten Core Extinguished</td>
              <td className="py-3 pr-5 align-middle text-xs text-skin-muted">Got Rag on night one!</td>
            </tr>
            <tr className="border-t border-skin-base">
              <td className="py-3 pr-4 pl-5 align-middle text-sm">2025-01-02</td>
              <td className="py-3 pr-4 align-middle">The First MC Rep Run</td>
              <td className="py-3 pr-5 align-middle text-xs text-skin-muted">The first venture into the core.</td>
            </tr>
            <tr className="border-t border-skin-base">
              <td className="py-3 pr-4 pl-5 align-middle text-sm">2025-01-02</td>
              <td className="py-3 pr-4 align-middle">Guild's First UBRS Night</td>
              <td className="py-3 pr-5 align-middle text-xs text-skin-muted">God, we ran so many UBRS.</td>
            </tr>
            <tr className="border-t border-skin-base">
              <td className="py-3 pr-4 pl-5 align-middle text-sm">2024-11-21</td>
              <td className="py-3 pr-4 align-middle">Guild founded (again)</td>
              <td className="py-3 pr-5 align-middle text-xs text-skin-muted">A spark in the storm cloud.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
