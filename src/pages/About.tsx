import React from "react";

export default function About() {
  return (
    <section className="space-y-8">
      <header className="pb-2 border-b border-skin-base">
        <h1 className="text-3xl font-extrabold tracking-tight text-brand-accent">⚡ Welcome to Tempest</h1>
        <p className="text-skin-muted mt-2 text-sm">A Classic guild on the Dreamscythe PvE Server.</p>
      </header>

      {/* History + Contact */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* History - wider */}
        <div className="lg:col-span-2 rounded-3xl border border-skin-base bg-skin-elev p-6 sm:p-8 flex flex-col">
          <h2 className="text-2xl font-bold text-skin-base">History</h2>
          <div className="h-0.5 w-16 bg-brand-accent/40 rounded-full mt-2 mb-5" />
          <div className="space-y-4 leading-relaxed text-[16px] text-skin-base/90 flex-1">
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
        </div>

        {/* Contact - thinner */}
        <div className="lg:col-span-1 rounded-3xl border border-skin-base bg-skin-elev p-6 sm:p-8 flex flex-col">
          <h2 className="text-2xl font-bold text-skin-base">Contact</h2>
          <div className="h-0.5 w-16 bg-brand-accent/40 rounded-full mt-2 mb-5" />
 
         <dl className="grid grid-cols-1 gap-y-3 text-[15px] flex-1">
{/*            <div>
              <dt className="text-skin-muted">Discord</dt>
              <dd className="text-skin-base/90">
                <a href="#" className="hover:underline">discord.gg/tempest-guild</a>
              </dd>
            </div>*/}
            <div>
              <dt className="text-skin-muted">Leadership Contacts</dt>
              <dd className="text-skin-base/90">Drakares · Napsberto</dd>
            </div>
            <div>
              <dt className="text-skin-muted">Raid Lead Contacts</dt>
              <dd className="text-skin-base/90">Drakares · Tokèn · Napsberto</dd>
            </div>
            <div>
              <dt className="text-skin-muted">Recruitment Contacts</dt>
              <dd className="text-skin-base/90">Napsberto · Holypeach · Drakares</dd>
            </div>
            <div>
              <dt className="text-skin-muted">Raid Times</dt>
              <dd className="text-skin-base/90">⚡Tue/Thu · 7:00–10:00 PM Server</dd>
            </div>
            <div>
              <dt className="text-skin-muted">Recruitment Needs</dt>
              <dd className="text-skin-base/90">👉 Open Recruitment for TBC <br />Highest Priority on Warlocks</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Milestones */}
      <div className="rounded-3xl border border-skin-base bg-skin-elev overflow-x-auto p-2">
        <table className="min-w-full text-[15px]">
          <thead className="text-skin-muted">
            <tr className="text-left">
              <th className="py-3 pr-4 pl-5">Date</th>
              <th className="py-3 pr-4">Guild Milestone</th>
              <th className="py-3 pr-5">Notes</th>
            </tr>
          </thead>
          <tbody>		
            <tr className="border-t border-skin-base">
              <td className="py-3 pr-4 pl-5 align-middle text-sm">2026-02-05</td>
              <td className="py-3 pr-4 align-middle">TBC Launch!</td>
              <td className="py-3 pr-5 align-middle text-xs text-skin-muted"></td>
            </tr>				

          </tbody>
        </table>
      </div>
    </section>
  );
}
