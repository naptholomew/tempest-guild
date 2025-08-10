export default function RaidPolicy() {
  return (
    <section className="space-y-8">
      <header className="pb-2 border border-transparent border-b border-skin-base">
        <h1 className="text-3xl font-extrabold tracking-tight text-brand-accent">⚡ Tempest Raid Policy</h1>
        <p className="text-skin-muted mt-2 text-sm">
          Clear guidelines for joining, preparing, and thriving in Tempest raids.
        </p>
      </header>

      {/* 4 Bubbles Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Raid Invites */}
        <div className="rounded-3xl border border-skin-base bg-skin-elev p-6 sm:p-8 flex flex-col">
          <h2 className="text-2xl font-bold text-skin-base">Raid Invites</h2>
          <div className="h-0.5 w-16 bg-brand-accent/40 rounded-full mt-2 mb-5" />
          <div className="space-y-3 leading-relaxed text-[15px] text-skin-base/90 flex-1">
            <p>
              The Raid-Helper Discord bot is required for organizing raids. Keep your signup accurate or ping Raid Chat if your
              plans change. If you’re not online and ready 15 minutes before raid start—and haven’t communicated—we may fill your spot.
            </p>
          </div>
        </div>

        {/* Raid Composition */}
        <div className="rounded-3xl border border-skin-base bg-skin-elev p-6 sm:p-8 flex flex-col">
          <h2 className="text-2xl font-bold text-skin-base">Raid Composition</h2>
          <div className="h-0.5 w-16 bg-brand-accent/40 rounded-full mt-2 mb-5" />
          <div className="space-y-3 leading-relaxed text-[15px] text-skin-base/90 flex-1">
            <p>
              Group comp matters. Some encounters need specific classes/roles; those get priority until comp is met. After that,
              preference goes to raiders who are consistent, prepared, and reliable.
            </p>
            <p>Flexibility is key — be ready to swap specs or roles when needed.</p>
          </div>
        </div>

        {/* Raid Requirements */}
        <div className="rounded-3xl border border-skin-base bg-skin-elev p-6 sm:p-8 flex flex-col">
          <h2 className="text-2xl font-bold text-skin-base">Raid Requirements</h2>
          <div className="h-0.5 w-16 bg-brand-accent/40 rounded-full mt-2 mb-5" />
          <div className="space-y-4 leading-relaxed text-[15px] text-skin-base/90 flex-1">
            <p>
              Questions about loot or requirements? Ask an officer. <i>It's your responsiblity to ask!</i> If you're unsure who to talk to, start here:
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
          </div>
        </div>

        {/* Loot Rules */}
        <div className="rounded-3xl border border-skin-base bg-skin-elev p-6 sm:p-8 flex flex-col">
          <h2 className="text-2xl font-bold text-skin-base">Loot Rules</h2>
          <div className="h-0.5 w-16 bg-brand-accent/40 rounded-full mt-2 mb-5" />
          <div className="space-y-4 leading-relaxed text-[15px] text-skin-base/90 flex-1">
            <p>
For AQ40 and Naxx we have moved to a Loot Council system to better support our raid goals. 
We aim to ensure that gear goes to players who consistently show up, contribute meaningfully, and will use their upgrades to push progression forward.
<br /><br /><b>For this system we consider the following:</b> 
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Upgrade Size & Long-Term Usage</li>
              <li>Attendance & Consistency</li>
              <li>Raid Performance & Preparedness</li>
              <li>Guild Contribution</li>
            </ul>

            <p>
              <b>Non LC Drops:</b> Open roll with a +1. Main Spec over Off Spec. If you win a contested roll, you
              receive +1 for this lockout and have disadvantage on further contested rolls in the same lockout.
            </p>
            <p>
              This system may evolve. Changes are announced in raid, but you are responsible for checking the sheet on thatsmybis.
              We reserve the right to award unplanned items to address critical gearing gaps.
            </p>
          </div>
        </div>
      </div>

      {/* Extra Notes or Tables */}
      <div className="rounded-3xl border border-skin-base bg-skin-elev p-3 sm:p-4 space-y-4">
        <h2 className="text-xl font-bold text-skin-base">Raid Specific Loot Chart</h2>
        <div className="overflow-x-auto rounded-2xl border border-skin-base">
          <table className="min-w-full text-[15px]">
            <thead className="text-skin-muted">
              <tr className="text-left">
                <th className="py-3 pr-4 pl-5">Raid Type</th>
                <th className="py-3 pr-5">Loot System Used</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-skin-base odd:bg-white/5 hover:bg-white/10 transition-colors">
                <td className="py-3 pr-4 pl-5 align-middle text-sm">Any PUG Runs</td>
                <td className="py-3 pr-5 align-middle text-xs text-skin-muted">
                  See the raid invite. Each Tempest PUG may have different loot rules.
                </td>
              </tr>	
              <tr className="border-t border-skin-base odd:bg-white/5 hover:bg-white/10 transition-colors">
                <td className="py-3 pr-4 pl-5 align-middle text-sm">Naxxramas</td>
                <td className="py-3 pr-5 align-middle text-xs text-skin-muted">
                  Loot council system. See the sheet on thatsmybis.com
                </td>
              </tr>
              <tr className="border-t border-skin-base odd:bg-white/5 hover:bg-white/10 transition-colors">
                <td className="py-3 pr-4 pl-5 align-middle text-sm">Temple of Ahn'Qiraj</td>
                <td className="py-3 pr-5 align-middle text-xs text-skin-muted">
                  Loot council system. See the sheet on thatsmybis.com
                </td>
              </tr>
              <tr className="border-t border-skin-base odd:bg-white/5 hover:bg-white/10 transition-colors">
                <td className="py-3 pr-4 pl-5 align-middle text-sm">Blackwing Lair</td>
                <td className="py-3 pr-5 align-middle text-xs text-skin-muted">
                  2x SR MS&gt;OS +1 - Some items may still be Hard Reserved.
                </td>
              </tr>
              <tr className="border-t border-skin-base odd:bg-white/5 hover:bg-white/10 transition-colors">
                <td className="py-3 pr-4 pl-5 align-middle text-sm">Molten Core</td>
                <td className="py-3 pr-5 align-middle text-xs text-skin-muted">
                  2x SR MS&gt;OS +1 - Some items may still be Hard Reserved.
                </td>
              </tr>
              <tr className="border-t border-skin-base odd:bg-white/5 hover:bg-white/10 transition-colors">
                <td className="py-3 pr-4 pl-5 align-middle text-sm">20 Man Content AQ20+ZG</td>
                <td className="py-3 pr-5 align-middle text-xs text-skin-muted">
                  2x SR MS&gt;OS +1 - Some items may still be Hard Reserved.
                </td>
              </tr>
		  
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
