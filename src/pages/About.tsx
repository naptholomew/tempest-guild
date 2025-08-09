export default function About() {
  return (
    <section className="space-y-8">
      <header className="pb-2 border-b border-skin-base">
        <h1 className="text-3xl font-extrabold tracking-tight text-brand-accent">⚡Welcome to Tempest</h1>
        <p className="text-skin-muted mt-2 text-sm">A World of Warcraft Classic Guild on Dreamscythe.</p>
      </header>

      {/* History + Contact */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* History - wider */}
        <div className="lg:col-span-2 rounded-3xl border border-skin-base bg-skin-elev p-6 sm:p-8 flex flex-col">
          <h2 className="text-2xl font-bold text-skin-base">History</h2>
          <div className="h-0.5 w-16 bg-brand-accent/40 rounded-full mt-2 mb-5" />
          <div className="space-y-4 leading-relaxed text-[16px] text-skin-base/90 flex-1">
            <p>
			Tempest began as a guild on the Horde PvE Era Realm Mankrik during the height of World of Warcraft Classic’s resurgence.
			Originally flying under the banner of Enigmatic, we built a tight-knit core of players who weren’t just raid teammates — 
			we became friends, bonded by countless boss kills, repair bills, and Alterac Valley hell.
			<br />
			<br />			
			Our mission is to provide an organized, safe, and reliable home for players who want to enjoy all parts of the game.
			From high-end progression raiding to casual dungeon runs we value preparation, communication, and good vibes.
			This site is your gateway to our team, our Discord, and all the ways you can get involved. 
			Whether you’re here to push progression or just want a guild where people remember your name, Tempest welcomes you.


            </p>
          </div>
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-10 text-[15px]">
            <li className="flex items-start gap-2">
              <span className="text-skin-muted">Founded</span>
              <span className="text-skin-base/90">March 2024</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-skin-muted">Focus</span>
              <span className="text-skin-base/90">Progression raiding · Helpful, social core</span>
            </li>
          </ul>
        </div>

        {/* Contact - thinner */}
        <div className="lg:col-span-1 rounded-3xl border border-skin-base bg-skin-elev p-6 sm:p-8 flex flex-col">
          <h2 className="text-2xl font-bold text-skin-base">Contact</h2>
          <div className="h-0.5 w-16 bg-brand-accent/40 rounded-full mt-2 mb-5" />
          <div className="grid grid-cols-1 gap-y-3 text-[15px] flex-1">
            <div>
              <div className="text-skin-muted">Discord Link</div>
              <div className="text-skin-base/90">
                <a href="#" className="hover:underline">discord.gg/tempest-guild</a>
              </div>
            </div>

            <div>
              <div className="text-skin-muted">Leadership Contact</div>
              <div className="text-skin-base/90">Draxxar · Beeper · Sneakywurm</div>
            </div>

            <div>
              <div className="text-skin-muted">Raid Lead Contact</div>
              <div className="text-skin-base/90">Draxxar · Hexus · Tokèn · Beeper</div>
            </div>

            <div>
              <div className="text-skin-muted">Recruitment Contact</div>
              <div className="text-skin-base/90">Draxxar · Brokensword</div>
            </div>

            <div>
              <div className="text-skin-muted">Raid Times</div>
              <div className="text-skin-base/90">Tue/Thu · 7:30–10:30 PM (Server)</div>
            </div>

            <div>
              <div className="text-skin-muted">Recruitment</div>
              <div className="text-skin-base/90">Open for social members only.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="rounded-3xl border border-skin-base bg-skin-elev overflow-x-auto p-2">
        <table className="min-w-full text-[15px]">
          <thead className="text-skin-muted">
            <tr className="text-left">
              <th className="py-3 pr-4 pl-5">Date</th>
              <th className="py-3 pr-4">Guild Milestone</th>

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
