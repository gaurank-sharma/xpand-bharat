import { Award, Star, Trophy } from 'lucide-react';

const awards = [
  {
    year: '2024',
    title: 'Best Event Management Company',
    body: 'India Events & Experiential Marketing Awards',
    category: 'Excellence in Mall Activations',
  },
  {
    year: '2023',
    title: 'Top 10 Event Agencies in North India',
    body: 'Event Industry Leaders Report',
    category: 'Corporate Events',
  },
  {
    year: '2023',
    title: 'Outstanding Brand Activation Campaign',
    body: 'Retail & Mall Marketing Summit',
    category: 'Brand Promotions',
  },
  {
    year: '2022',
    title: 'Creative Excellence Award',
    body: 'Indian Event Professionals Association',
    category: 'Visual Merchandising',
  },
  {
    year: '2022',
    title: 'Emerging Agency of the Year',
    body: 'Delhi NCR Business Excellence Awards',
    category: 'Event Management',
  },
  {
    year: '2021',
    title: 'Best Turnkey Event Solution',
    body: 'Corporate Events India Summit',
    category: 'Turnkey Solutions',
  },
];

export default function Awards() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        <div className="absolute top-20 right-1/3 w-96 h-96 bg-[#2eaff0]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto max-w-5xl text-center relative">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#2eaff0] mb-4 block">Recognition</span>
          <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-wide leading-tight mb-6">
            Awards & <br /><span className="text-[#2eaff0]">Honours</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
            Over a decade of delivering extraordinary experiences has earned us recognition
            from India's leading industry bodies and associations.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-b border-neutral-900 py-10 px-6">
        <div className="container mx-auto max-w-4xl grid grid-cols-3 gap-6 text-center">
          {[
            { icon: Trophy, value: '15+', label: 'Awards Won' },
            { icon: Star, value: '10+', label: 'Years of Excellence' },
            { icon: Award, value: '500+', label: 'Events Delivered' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label}>
              <Icon size={22} className="text-[#2eaff0] mx-auto mb-2" />
              <p className="text-3xl font-bold text-white">{value}</p>
              <p className="text-gray-500 text-xs uppercase tracking-wider mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Awards list */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-4">
            {awards.map((a, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-neutral-800 rounded-2xl p-6 flex items-start gap-5 hover:border-[#2eaff0]/30 transition-all group">
                <div className="w-12 h-12 bg-[#2eaff0]/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#2eaff0]/20 transition-colors">
                  <Trophy size={20} className="text-[#2eaff0]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-white font-semibold text-sm">{a.title}</h3>
                    <span className="text-[10px] bg-[#2eaff0]/10 text-[#2eaff0] px-2 py-0.5 rounded-full border border-[#2eaff0]/20">{a.category}</span>
                  </div>
                  <p className="text-gray-500 text-xs">{a.body}</p>
                </div>
                <span className="text-[#2eaff0] font-bold text-lg shrink-0">{a.year}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-neutral-950 border-t border-neutral-800 py-20 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Let's create award-winning experiences together</h2>
          <p className="text-gray-400 text-sm mb-8">Partner with WebMobHut for your next event and join a legacy of excellence.</p>
          <a href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2eaff0] text-black font-bold tracking-widest text-xs uppercase rounded-full hover:bg-white transition-colors duration-300">
            Work With Us
          </a>
        </div>
      </section>
    </div>
  );
}
