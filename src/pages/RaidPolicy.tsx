import React from "react";

// Reusable section header (kept simple in case you later add breadcrumbs, etc.)
function SectionHeader() {
  return (
    <header className="pb-2 border-b border-skin-base">
      <h1 className="text-3xl font-extrabold tracking-tight text-brand-accent">⚡ Tempest Raid Policy</h1>
      <p className="text-skin-muted mt-2 text-sm">
        Clear guidelines for joining, preparing, and thriving in Tempest raids.
      </p>
    </header>
  );
}

// Reusable policy card with synced hover/focus glow on the card & its title
function PolicyCard({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
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
        className="
          text-2xl font-bold text-skin-base transition-all
          group-hover:text-sky-300 group-focus-within:text-sky-300
          group-hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.9)]
          group-focus-within:drop-shadow-[0_0_10px_rgba(56,189,248,0.9)]
        "
      >
        {title}
      </h2>
      <div className="h-0.5 w-16 bg-brand-accent/40 rounded-full mt-2 mb-5" />
      <div className="space-y-4 leading-relaxed text-[15px] text-skin-base/90">
        {children}
      </div>
    </section>
  );
}

export default function RaidPolicy() {
  return (
    <section className="space-y-8">
      <SectionHeader />

      {/* 4 Bubbles Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Raid Invites */}
        <PolicyCard id="raid-invites" title="Raid Invites">
          <p>
            The Raid-Helper Discord bot is required for organizing raids. Keep your signup accurate or ping Raid Chat
            if your plans change. If you’re not online and ready 15 minutes before raid start—and haven’t communicated—we may fill your spot.
          </p>
        </PolicyCard>

        {/* Raid Composition */}
        <PolicyCard id="raid-composition" title="Raid Composition">
          <p>
            Group comp matters. Some encounters need specific classes/roles; those get priority until comp is met. After that,
            preference goes to raiders who are consistent, prepared, and reliable.
          </p>
          <p>Flexibility is key — be ready to swap specs or roles when needed.</p>
        </PolicyCard>

        {/* Raid Requirements */}
        <PolicyCard id="raid-requirements" title="Raid Requirements">
          <p>
            Questions about loot or requirements? Ask an officer. <i>It's your responsibility to ask!</i> If you're unsure who to talk to, start here:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li><b>Melee:</b> Drak, Brokensword, Hexus</li>
            <li><b>Casters:</b> Beeper, Token, Morri</li>
            <li><b>Healers:</b> Holypeach, Jimmyc, Xan</li>
          </ul>

          <p><b>Required Raid Addons:</b></p>
          <ul className="list-disc list-inside space-y-1">
            <li>AngryEra (raid assignments)</li>
            <li>Deadly Boss Mods or BigWigs</li>
            <li>ThreatClassic2 or Details: Tiny Threat</li>
          </ul>

          <p><b>Additional Requirements:</b></p>
          <ul className="list-disc list-inside space-y-1">
            <li>Gear: Invites go to players appropriately geared for the content.</li>
            <li>Alts: <i>Limited.</i> Alts aren’t eligible for loot if a main still needs the item.</li>
            <li>Consumables: <i>Required.</i> See the raid signup for the list.</li>
            <li>World Buffs: <i>Required.</i> See the raid signup for the list.</li>
          </ul>
        </PolicyCard>

        {/* Loot Rules */}
        <PolicyCard id="loot-rules" title="Loot Rules">
          <p>
            For AQ40 and Naxx we have moved to a Loot Council system to better support our raid goals.
            We aim to ensure that gear goes to players who consistently show up, contribute meaningfully, and will use their upgrades to push progression forward.
            <br /><br /><b>For this system we consider the following:</b>
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Upgrade Size &amp; Long-Term Usage</li>
            <li>Attendance &amp; Consistency</li>
            <li>Raid Performance &amp; Preparedness</li>
            <li>Guild Contribution</li>
          </ul>

          <p>
            <b>Non-LC Drops:</b> Open roll with a +1. Main Spec over Off Spec. If you win a contested roll, you
            receive +1 for this lockout and have disadvantage on further contested rolls in the same lockout.
          </p>
          <p>
            This system may evolve. Changes are announced in raid, but you are responsible for checking the sheet on thatsmybis.
            We reserve the right to award unplanned items to address critical gearing gaps.
          </p>
        </PolicyCard>
      </div>

      {/* Loot System Table */}
      <section
        aria-labelledby="raid-loot-chart-title"
        className="
          rounded-3xl border border-skin-base bg-skin-elev p-3 sm:p-4 space-y-4
          transition-all
          group
          hover:scale-[1.01] focus-within:scale-[1.01]
          hover:ring-[6px] hover:ring-sky-400/70 hover:ring-offset-2 hover:ring-offset-skin-elev
          hover:shadow-2xl hover:shadow-sky-400/50
          focus-within:ring-[6px] focus-within:ring-sky-400/70 focus-within:ring-offset-2 focus-within:ring-offset-skin-elev
          focus-within:shadow-2xl focus-within:shadow-sky-400/50
        "
      >
        <h2
          id="raid-loot-chart-title"
          className="
            text-xl font-bold text-skin-base transition-all
            group-hover:text-sky-300 group-focus-within:text-sky-300
            group-hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.9)]
            group-focus-within:drop-shadow-[0_0_10px_rgba(56,189,248,0.9)]
          "
        >
          Raid Specific Loot Chart
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-skin-base">
          <table className="min-w-full text-[15px]">
            <caption className="sr-only">Loot systems used per raid type</caption>
            <thead className="sticky top-0 bg-skin-elev/95 supports-[backdrop-filter]:bg-skin-elev/80 backdrop-blur text-skin-muted">
              <tr className="text-left">
                <th scope="col" className="py-3 pr-4 pl-5">Raid Type</th>
                <th scope="col" className="py-3 pr-5">Loot System Used</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  raid: "Any PUG Runs",
                  note: "See the raid signup. Each Tempest PUG may have different loot rules.",
                },
                {
                  raid: "Naxxramas",
                  note: "Loot council system. See the Naxx Gear List.",
                },
                {
                  raid: "Temple of Ahn'Qiraj",
                  note: "Loot council system. See the AQ40 Gear List.",
                },
                {
                  raid: "Blackwing Lair",
                  note: "2x SR MS>OS +1 — Select items may still be managed. See SR for Details.",
                },
                {
                  raid: "Molten Core",
                  note: "2x SR MS>OS +1 — Select items may still be managed. See SR for Details.",
                },
                {
                  raid: "20 Man Content AQ20 + ZG",
                  note: "2x SR MS>OS +1 — Select items may still be managed. See SR for Details.",
                },
              ].map(({ raid, note }, i) => (
                <tr
                  key={raid}
                  className="
                    border-t border-skin-base odd:bg-white/5 hover:bg-white/10 transition-colors
                  "
                >
                  <td className="py-3 pr-4 pl-5 align-middle text-sm">{raid}</td>
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
