import { useEffect, useState } from 'react';
import { Award, Handshake, Target } from 'lucide-react';

const API = 'https://web-mob-hut-backend.vercel.app/api';

const WHY = [
  { icon: Target,    title: 'Strategic Thinking',    desc: 'We align every event with your brand vision and business objectives.' },
  { icon: Award,     title: 'Proven Excellence',     desc: '500+ events executed across India with meticulous attention to detail.' },
  { icon: Handshake, title: 'Long-term Partnership', desc: 'We build relationships, not just events. Most clients return for every activation.' },
];

function Marquee({ clients, speed = 35, reverse = false }) {
  const items = [...clients, ...clients];
  return (
    <div className="overflow-hidden w-full">
      <style>{`
        @keyframes marquee-fwd { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marquee-rev { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .marquee-fwd { animation: marquee-fwd ${speed}s linear infinite; }
        .marquee-rev { animation: marquee-rev ${speed}s linear infinite; }
      `}</style>
      <div className={`flex gap-6 w-max ${reverse ? 'marquee-rev' : 'marquee-fwd'}`}>
        {items.map((client, i) => (
          <div
            key={`${client._id}-${i}`}
            className="flex items-center justify-center rounded-2xl px-8 py-5 transition-colors shrink-0 border
              bg-white border-gray-200 hover:border-[#2eaff0]/30
              dark:bg-[#0d0d0d] dark:border-neutral-800 dark:hover:border-[#2eaff0]/30"
            style={{ minWidth: 160, height: 90 }}
          >
            <img
              src={client.logo}
              alt={client.name}
              className="max-h-12 max-w-[130px] object-contain filter brightness-90 hover:brightness-110 transition-all duration-300
                dark:brightness-75 dark:hover:brightness-110"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/clients?isActive=true`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setClients(d.data); })
      .finally(() => setLoading(false));
  }, []);

  const useMarquee = clients.length >= 4;
  const mid  = Math.ceil(clients.length / 2);
  const row1 = clients.slice(0, mid);
  const row2 = clients.slice(mid);

  return (
    <div className="min-h-screen font-sans
      bg-white text-gray-900
      dark:bg-black dark:text-white">

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden">
        <div className="absolute top-20 right-1/4 w-[500px] h-[300px] bg-[#2eaff0]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto max-w-5xl relative">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#2eaff0] mb-4 block">Trusted Partners</span>
          <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-wide leading-tight mb-6">
            Brands That <br />
            <span className="text-[#2eaff0]">Trust Us</span>
          </h1>
          <p className="max-w-2xl text-sm md:text-base leading-relaxed
            text-gray-500 dark:text-gray-400">
            From Fortune 500 companies to growing startups, WebMobHut has been the creative force
            behind some of India's most memorable brand experiences, mall activations, and corporate events.
          </p>
        </div>
      </section>

      {/* ── LOGO SECTION ── */}
      <section className="pb-24 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#2eaff0] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : clients.length === 0 ? (
          <div className="container mx-auto max-w-5xl px-6">
            <div className="text-center py-20 border rounded-2xl
              bg-gray-50 border-gray-200
              dark:bg-neutral-950 dark:border-neutral-800">
              <Handshake size={36} className="mx-auto mb-3 text-gray-300 dark:text-neutral-700" />
              <p className="font-medium text-gray-500 dark:text-gray-400">Client logos coming soon.</p>
              <p className="text-sm mt-1 text-gray-400 dark:text-gray-600">Check back or contact us to partner with WebMobHut.</p>
            </div>
          </div>
        ) : useMarquee ? (
          <div className="space-y-6">
            <Marquee clients={row1} speed={30} />
            {row2.length > 0 && <Marquee clients={row2} speed={38} reverse />}
          </div>
        ) : (
          <div className="container mx-auto max-w-5xl px-6">
            <div className="flex flex-wrap justify-center gap-6">
              {clients.map((client) => (
                <div
                  key={client._id}
                  className="flex items-center justify-center rounded-2xl px-10 py-6 transition-colors border
                    bg-white border-gray-200 hover:border-[#2eaff0]/30
                    dark:bg-[#0d0d0d] dark:border-neutral-800 dark:hover:border-[#2eaff0]/30"
                  style={{ minWidth: 180, height: 100 }}
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-14 max-w-[150px] object-contain brightness-90 hover:brightness-110 transition-all duration-300
                      dark:brightness-75 dark:hover:brightness-110"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="border-t py-24 px-6
        bg-gray-50 border-gray-200
        dark:bg-neutral-950 dark:border-neutral-800">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#2eaff0] mb-2 block">Our Approach</span>
            <h2 className="text-3xl md:text-4xl font-bold">Why Brands Choose WebMobHut</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {WHY.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="border rounded-2xl p-7 transition-colors group hover:border-[#2eaff0]/30
                bg-white border-gray-200
                dark:bg-black dark:border-neutral-800">
                <div className="w-12 h-12 bg-[#2eaff0]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#2eaff0]/20 transition-colors">
                  <Icon size={22} className="text-[#2eaff0]" />
                </div>
                <h3 className="font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t py-20 px-6
        bg-white border-gray-200
        dark:bg-black dark:border-neutral-800">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to join our <span className="text-[#2eaff0]">partner network?</span>
          </h2>
          <p className="text-sm leading-relaxed mb-8 text-gray-500 dark:text-gray-400">
            Let's create something extraordinary together. Reach out to discuss your next brand activation or event.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2eaff0] text-black font-bold tracking-widest text-xs uppercase rounded-full hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300 shadow-[0_0_20px_rgba(46,175,240,0.2)]"
          >
            Work With Us
          </a>
        </div>
      </section>
    </div>
  );
}
