export default function About() {
  return (
    <section className="space-y-8">
      <header className="pb-2 border-b border-skin-base">
        <h1 className="text-3xl font-extrabold tracking-tight text-brand-accent">⚡Welcome to Tempest</h1>
        <p className="text-skin-muted mt-2 text-sm">A World of Warcraft Classic Guild on Dreamscythe.</p>
      </header>

      {/* History */}
      <div className="rounded-3xl border border-skin-base bg-skin-elev p-6 sm:p-8">
        <h2 className="text-xl font-semibold mb-3">Tempest History</h2>
        <p className="text-skin-base/90">
          Tempest began as a guild on the Horde PvE Era Realm Mankrik. <br />Through our progression as Enigmatic we cultivated a core of players that have become friends and comrades. 
          We bring a large portion of that core to the Dreamscythe realm, and invite you to join us. 
          Our mission is to provide an organized, safe, and reliable environment for players interested in all forms of the game. This site will contain everything you need to know about our team, our discord, and joining us.
        </p>
        <ul className="mt-4 list-disc list-inside text-skin-muted space-y-1">
          <li>Founded: <span className="text-skin-base/90">March 2024</span></li>
          <li>Focus: <span className="text-skin-base/90">Progression raiding with a helpful, social core</span></li>
        </ul>
      </div>

      {/* Contact */}
      <div className="rounded-3xl border border-skin-base bg-skin-elev p-6 sm:p-8">
        <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
          <div className="text-skin-muted">Discord Link</div>
          <div className="text-skin-base/90">
            {/* Replace with your real invite */}
            <a href="#" className="hover:underline">discord.gg/tempest-guild</a>
          </div>

          <div className="text-skin-muted">Leadership Contact</div>
          <div className="text-skin-base/90">Draxxar · Beeper · Sneakywurm</div>
      
          <div className="text-skin-muted">Raid Lead Contact</div>
          <div className="text-skin-base/90">Draxxar · Hexus · Tokèn · Beeper</div>
      
          <div className="text-skin-muted">Recruitment Contact</div>
          <div className="text-skin-base/90">Draxxar · Brokensword</div>

          <div className="text-skin-muted">Raid Times</div>
          <div className="text-skin-base/90">Tue/Thu · 7:30–10:30 PM (Server)</div>

          <div className="text-skin-muted">Recruitment</div>
          <div className="text-skin-base/90">Open for social members only.</div>
        </div>
      </div>

      {/* Milestones */}
      <div className="rounded-3xl border border-skin-base bg-skin-elev p-3 sm:p-4">
        <h2 className="text-xl font-semibold mb-3">Milestones</h2>
        <div className="overflow-x-auto rounded-2xl border border-skin-base">
          <table className="min-w-full text-[15px]">
            <thead className="text-skin-muted">
              <tr className="text-left">
                <th className="py-3 pr-4 pl-5">Date</th>
                <th className="py-3 pr-4">What happened?!</th>
                <th className="py-3 pr-5">Extra</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-skin-base odd:bg-white/5 hover:bg-white/10 transition-colors">
                <td className="py-3 pr-4 pl-5 align-middle text-sm">2025-01-02</td>
                <td className="py-3 pr-4 align-middle">Temple of Ahn'Qiraj De-Bugged</td>
                <td className="py-3 pr-5 align-middle text-xs text-skin-muted">Week one! 5 Pulls on C'thun.</td>
              </tr>
              <tr className="border-t border-skin-base odd:bg-white/5 hover:bg-white/10 transition-colors">
                <td className="py-3 pr-4 pl-5 align-middle text-sm">2025-05-01</td>
                <td className="py-3 pr-4 align-middle">Zul'Gurub Liberated</td>
                <td className="py-3 pr-5 align-middle text-xs text-skin-muted">Edge of Madness was busted, wtf.</td>
              </tr>
              <tr className="border-t border-skin-base odd:bg-white/5 hover:bg-white/10 transition-colors">
                <td className="py-3 pr-4 pl-5 align-middle text-sm">2025-03-24</td>
                <td className="py-3 pr-4 align-middle">Blackwing Lair Cleaned Out</td>
                <td className="py-3 pr-5 align-middle text-xs text-skin-muted">Chromaggus was way harder than Nef.</td>
              </tr>
              <tr className="border-t border-skin-base odd:bg-white/5 hover:bg-white/10 transition-colors">
                <td className="py-3 pr-4 pl-5 align-middle text-sm">2025-01-02</td>
                <td className="py-3 pr-4 align-middle">Molten Core Extinguished</td>
                <td className="py-3 pr-5 align-middle text-xs text-skin-muted">Got Rag on night one!</td>
              </tr>
              <tr className="border-t border-skin-base odd:bg-white/5 hover:bg-white/10 transition-colors">
                <td className="py-3 pr-4 pl-5 align-middle text-sm">2025-01-02</td>
                <td className="py-3 pr-4 align-middle">The First MC Rep Run</td>
                <td className="py-3 pr-5 align-middle text-xs text-skin-muted">The first venture into the core.</td>
              </tr>
              <tr className="border-t border-skin-base odd:bg-white/5 hover:bg-white/10 transition-colors">
                <td className="py-3 pr-4 pl-5 align-middle text-sm">2025-01-02</td>
                <td className="py-3 pr-4 align-middle">Guild's First UBRS Night</td>
                <td className="py-3 pr-5 align-middle text-xs text-skin-muted">God, we ran so many UBRS.</td>
              </tr>
              <tr className="border-t border-skin-base odd:bg-white/5 hover:bg-white/10 transition-colors">
                <td className="py-3 pr-4 pl-5 align-middle text-sm">2024-11-21</td>
                <td className="py-3 pr-4 align-middle">Guild founded (again)</td>
                <td className="py-3 pr-5 align-middle text-xs text-skin-muted">A spark in the storm cloud.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
