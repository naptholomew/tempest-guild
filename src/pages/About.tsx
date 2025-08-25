import React from "react";

// Simple, consistent page header
function SectionHeader() {
  return (
    <header className="pb-2 border-b border-skin-base">
      <h1 className="text-3xl font-extrabold tracking-tight text-brand-accent">⚡ Welcome to Tempest</h1>
      <p className="text-skin-muted mt-2 text-sm">A Classic guild on the Dreamscythe PvE Server.</p>
    </header>
  );
}

// Reusable glowing card (hover + keyboard focus)
function InfoCard({
  id,
  title,
  children,
  titleSize = "text-2xl",
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  titleSize?: "text-xl" | "text-2xl" | "text-3xl";
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="
        group rounded-3xl border border-skin-base bg-skin-elev p-6 sm:p-8
        transition-all
        hover:scale-[1.01] focus-within:scale-[1.01]
        hover:ring-[6px] hover:ring-sky-400/70 hover:ring-offset-2 hover:ring-offset-skin-elev
        hover:shadow-2xl hover:shadow-sky-400/50
        focus-within:ring-[6px] focus-within:ring-sky-400/70 focus-within:ring-offset-2 focus-within:ring-offset-skin-elev
        focus-within:shadow-2xl focus-within:shadow-sky-400/50
      "
    >
      <h2
        id={`${id}-title`}
        className={`
          ${titleSize} font-bold text-skin-base transition-all
          group-hover:text-sky-300 group-focus-within:text-sky-300
          group-hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.9)]
          group-focus-within:drop-shadow-[0_0_10px_rgba(56,189,248,0.9)]
        `}
      >
        {title}
      </h2>
      <div className="h-0.5 w-16 bg-brand-accent/40 rounded-full mt-2 mb-5" />
      <div className="space-y-4 leading-relaxed text-[16px] text-skin-base/90">
        {children}
      </div>
    </section>
  );
}

export default function About() {
  return (
    <section className="space-y-8">
      <SectionHeader />

      {/* History + Contact */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* History (wider) */}
        <InfoCard id="history" title="History" titleSize="text-2xl">
          <div className="space-y-4">
            <p>
              Tempest began as a guild on the Horde PvE Era realm Mankrik, back on the Classic Era server.
              Originally flying under the banner of Enigmatic, we built a tight-knit core of players who weren’t just raid teammates, but friends.
              Bonded by boss kills, bad trash pulls, and countless hours in Alterac Valley.
            </p>
            <p>
              Our mission is to provide an organized, safe, and reliable home for players who want to enjoy all parts of the game.
              From high-end progression raiding to casual dungeon runs we value preparation, communication, and good vibes.
              This page is your gateway to our team, and all the ways you can get involved.
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
              <span className="text-skin-base/90">Progression raiding · Social Core</span>
            </li>
          </ul>
        </InfoCard>

        {/* Contact (thinner) */}
        <InfoCard id="contact" title="Contact" titleSize="text-2xl">
          <dl className="grid grid-cols-1 gap-y-3 text-[15px]">
            {/* If you want Discord later, uncomment & add a real link */}
            {/* <div>
              <dt className="text-skin-muted">Discord</dt>
              <dd className="text-skin-base/90">
                <a href="#" className="hover:underline">discord.gg/tempest-guild</a>
              </dd>
            </div> */}
            <div>
              <dt className="text-skin-muted">Leadership Contacts</dt>
              <dd className="text-skin-base/90">Draxxar · Beeper · Sneakywurm</dd>
            </div>
            <div>
              <dt className="text-skin-muted">Raid Lead Contacts</dt>
              <dd className="text-skin-base/90">Draxxar · Hexus · Tokèn · Beeper</dd>
            </div>
            <div>
              <dt className="text-skin-muted">Recruitment Contacts</dt>
              <dd className="text-skin-base/90">Draxxar · Brokensword</dd>
            </div>
            <div>
              <dt className="text-skin-muted">Raid Times</dt>
              <dd className="text-skin-base/90">Tue/Thu · 8:00–11:00 PM CST (Server)</dd>
            </div>
            <div>
              <dt className="text-skin-muted">Recruitment Status</dt>
              <dd className="text-skin-base/90">Open for social members only.</dd>
            </div>
          </dl>
        </InfoCard>
      </div>

      {/* Milestones */}
      <section
        aria-labelledby="milestones-title"
        className="
          rounded-3xl border border-skin-base bg-skin-elev p-3 sm:p-4 space-y-4
          transition-all group
          hover:scale-[1.01] focus-within:scale-[1.01]
          hover:ring-[6px] hover:ring-sky-400/70 hover:ring-offset-2 hover:ring-offset-skin-elev
          hover:shadow-2xl hover:shadow-sky-400/50
          focus-within:ring-[6px] focus-within:ring-sky-400/70 focus-within:ring-offset-2 focus-within:ring-offset-skin-elev
          focus-within:shadow-2xl focus-within:shadow-sky-400/50
        "
      >
        <h2
          id="milestones-title"
          className="
            text-xl font-bold text-skin-base transition-all
            group-hover:text-sky-300 group-focus-within:text-sky-300
            group-hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.9)]
            group-focus-within:drop-shadow-[0_0_10px_rgba(56,189,248,0.9)]
          "
        >
          Milestones
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-skin-base">
          <table className="min-w-full text-[15px]">
            <caption className="sr-only">Guild milestones by date with notes</caption>
            <thead className="sticky top-0 bg-skin-elev/95 supports-[backdrop-filter]:bg-skin-elev/80 backdrop-blur text-skin-muted">
              <tr className="text-left">
                <th className="py-3 pr-4 pl-5">Date</th>
                <th className="py-3 pr-4">Guild Milestone</th>
                <th className="py-3 pr-5">Notes</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["2025-08-04", "Temple of Ahn'Qiraj Fumigated", "Week one! 5 Pulls on C'thun."],
                ["2025-05-01", "Zul'Gurub Liberated", "Edge of Madness was busted, wtf."],
                ["2025-04-08", "Geddon Dropped his Binding", "Garr has the other in his DFT pocket."],
                ["2025-03-24", "Blackwing Lair Declawed", "Chromaggus was way harder than Nef."],
                ["2025-01-16", "Molten Core Extinguished", "Got Rag on night one!"],
                ["2025-01-16", "Alterac Valley Opened", "And so the torture begins."],
                ["2025-01-07", "The First MC Rep Run", "Wow, so much rep. Many douses."],
                ["2025-01-02", "First Official Raid Night", "UBRS Spam. Spammity spam."],
                ["2024-01-02", "Last Classic Era Raid Night", ""],
              ].map(([date, title, note], i) => (
                <tr
                  key={`${date}-${i}`}
                  className="border-t border-skin-base odd:bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <td className="py-3 pr-4 pl-5 align-middle text-sm">{date}</td>
                  <td className="py-3 pr-4 align-middle">{title}</td>
                  <td className="py-3 pr-5 align-middle text-xs text-skin-muted">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}
